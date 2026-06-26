import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getCurrentCompany } from "@/lib/guards";
import { setCompanyMedia, addPortfolioPhoto, addCertification } from "@/features/installers/server/profile";

const f = createUploadthing();

// Alleen ingelogde installateurs mogen uploaden; bestandstype + grootte worden
// door UploadThing afgedwongen (image/pdf, maxFileSize).
async function requireCompany() {
  const company = await getCurrentCompany();
  if (!company) throw new UploadThingError("Alleen ingelogde installateurs kunnen uploaden.");
  return { companyId: company.id };
}

export const ourFileRouter = {
  companyLogo: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(requireCompany)
    .onUploadComplete(async ({ metadata, file }) => {
      await setCompanyMedia(metadata.companyId, "logo", file.ufsUrl);
      return { url: file.ufsUrl };
    }),

  companyCover: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(requireCompany)
    .onUploadComplete(async ({ metadata, file }) => {
      await setCompanyMedia(metadata.companyId, "cover", file.ufsUrl);
      return { url: file.ufsUrl };
    }),

  portfolio: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(requireCompany)
    .onUploadComplete(async ({ metadata, file }) => {
      await addPortfolioPhoto(metadata.companyId, file.ufsUrl);
      return { url: file.ufsUrl };
    }),

  certificate: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }, pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(requireCompany)
    .onUploadComplete(async ({ metadata, file }) => {
      await addCertification(metadata.companyId, { type: "Certificaat", fileUrl: file.ufsUrl });
      return { url: file.ufsUrl };
    }),

  // Klusfoto's bij de aanvraag — publiek (gast/klant), vóór er een lead bestaat.
  // Type + grootte + aantal worden door UploadThing afgedwongen; de URL's worden
  // client-side verzameld en met de aanvraag meegestuurd.
  leadPhoto: f({ image: { maxFileSize: "8MB", maxFileCount: 8 } })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

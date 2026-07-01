import { redirect } from "next/navigation";

// De offertelijst is verplaatst naar /dashboard/offertes.
export default function DashboardQuotesRedirect() {
  redirect("/dashboard/offertes");
}

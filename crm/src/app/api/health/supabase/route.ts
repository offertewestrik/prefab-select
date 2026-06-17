import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { FILES_BUCKET } from "@/lib/data/files-repo";
import { APP_VERSIE } from "@/lib/versie";

// ----------------------------------------------------------------------------
// Verbindings- + configtest. Toont (zonder geheime waarden te lekken) welke
// omgevingsvariabelen de live-app ziet, of de database bereikbaar is, en of
// de bestanden-opslag (tabel files + storage-bucket) in orde is.
// Bezoek /api/health/supabase
// ----------------------------------------------------------------------------
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const config = {
    serverVersie: APP_VERSIE,
    NEXT_PUBLIC_SUPABASE_URL_gezet: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY_gezet: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    RESEND_API_KEY_gezet: Boolean(process.env.RESEND_API_KEY),
    USE_REAL_INTEGRATIONS: process.env.USE_REAL_INTEGRATIONS ?? null,
  };

  if (!isSupabaseAdminConfigured()) {
    return Response.json({
      ok: false,
      reden: "Supabase-omgevingsvariabelen ontbreken.",
      config,
    });
  }

  const db = getSupabaseAdmin();

  // Leads-tabel (basis-check database)
  let aantalLeads: number | string = "FOUT";
  try {
    const { count, error } = await db.from("leads").select("*", { count: "exact", head: true });
    if (error) throw error;
    aantalLeads = count ?? 0;
  } catch (err) {
    aantalLeads = `FOUT: ${(err as Error).message}`;
  }

  // Bestanden-tabel (migratie 0012)
  let bestandenTabel: string;
  let aantalBestanden: number | null = null;
  try {
    const { count, error } = await db.from("files").select("*", { count: "exact", head: true });
    if (error) throw error;
    aantalBestanden = count ?? 0;
    bestandenTabel = "OK";
  } catch (err) {
    bestandenTabel = `ONTBREEKT of FOUT: ${(err as Error).message}`;
  }

  // Storage-bucket voor de bestanden zelf
  let storageBucket: string;
  try {
    const { data, error } = await db.storage.getBucket(FILES_BUCKET);
    if (error || !data) throw error ?? new Error("bucket niet gevonden");
    storageBucket = "OK";
  } catch (err) {
    storageBucket = `ONTBREEKT of FOUT: ${(err as Error).message}`;
  }

  // Producten-tabel (migratie 0011) — leescheck
  let productenTabel: string;
  let productenLeesOk = false;
  try {
    const { count, error } = await db.from("products").select("*", { count: "exact", head: true });
    if (error) throw error;
    productenTabel = `OK (${count ?? 0} producten)`;
    productenLeesOk = true;
  } catch (err) {
    productenTabel = `ONTBREEKT of FOUT: ${(err as Error).message}`;
  }

  // Producten — echte schrijf-/verwijdertest. Een leescheck mist namelijk
  // rechten-/RLS-problemen die ervoor zorgen dat toevoegen niet bewaart of dat
  // verwijderde producten weer terugkomen. We schrijven een tijdelijk
  // testproduct en verwijderen het meteen weer.
  let productenSchrijftest: string;
  let productenSchrijfOk = false;
  if (!productenLeesOk) {
    productenSchrijftest = "Overgeslagen — tabel niet leesbaar.";
  } else {
    const testId = crypto.randomUUID();
    try {
      const { error: insErr } = await db.from("products").insert({
        id: testId, naam: "__systeemtest__ (mag weg)", beschrijving: null,
        categorie: "Systeemtest", eenheid: "stuks", prijs_per_stuk: 0,
        btw_percentage: 21, actief: false,
      });
      if (insErr) throw new Error(`toevoegen mislukt: ${insErr.message}`);

      const { error: delErr } = await db.from("products").delete().eq("id", testId);
      if (delErr) throw new Error(`verwijderen mislukt: ${delErr.message}`);

      // Controleer dat het testproduct écht weg is (anders "komt het terug").
      const { count, error: chkErr } = await db
        .from("products").select("*", { count: "exact", head: true }).eq("id", testId);
      if (chkErr) throw chkErr;
      if ((count ?? 0) !== 0) {
        productenSchrijftest = "FOUT: testproduct bleef bestaan na verwijderen (verwijderen werkt niet).";
      } else {
        productenSchrijftest = "OK — toevoegen én verwijderen werkt.";
        productenSchrijfOk = true;
      }
    } catch (err) {
      // Best effort opruimen, mocht insert geslaagd maar iets anders gefaald zijn.
      await db.from("products").delete().eq("id", testId).then(() => {}, () => {});
      productenSchrijftest = `FOUT: ${(err as Error).message}`;
    }
  }

  const alles =
    typeof aantalLeads === "number" &&
    bestandenTabel === "OK" &&
    storageBucket === "OK" &&
    productenLeesOk &&
    productenSchrijfOk;

  // Mailkanaal — kan het CRM offertes/facturen echt versturen? We valideren de
  // Gmail-koppeling echt (token-refresh), zodat een verlopen koppeling rood is.
  let mailKanaal: string;
  try {
    const { gmailStatus } = await import("@/lib/integrations/google");
    const gmail = await gmailStatus().catch((e) => ({
      ok: false,
      email: undefined as string | undefined,
      reden: (e as Error).message,
    }));
    const resendKlaar =
      process.env.USE_REAL_INTEGRATIONS === "true" && Boolean(process.env.RESEND_API_KEY);
    if (gmail.ok) {
      mailKanaal = `OK — Gmail gekoppeld${gmail.email ? ` (${gmail.email})` : ""}.`;
    } else if (resendKlaar) {
      mailKanaal = `OK — Resend (afzender ${process.env.RESEND_FROM_EMAIL ?? "offerte@prefabselect.nl"}).`;
    } else {
      mailKanaal = `GEEN — ${gmail.reden ?? "koppel Gmail of stel de RESEND_API_KEY in"} (anders worden mails niet echt verstuurd).`;
    }
  } catch (err) {
    mailKanaal = `FOUT: ${(err as Error).message}`;
  }

  return Response.json({
    ok: alles,
    aantalLeads,
    bestanden: {
      tabel: bestandenTabel,
      bucket: storageBucket,
      aantalBestandenInDatabase: aantalBestanden,
    },
    producten: {
      tabel: productenTabel,
      schrijftest: productenSchrijftest,
    },
    mail: mailKanaal,
    config,
  });
}

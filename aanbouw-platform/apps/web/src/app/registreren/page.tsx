import { redirect } from "next/navigation";

// De vakman-aanmelding loopt nu via /aanmelden-vakman.
export default function RegisterRedirect() {
  redirect("/aanmelden-vakman");
}

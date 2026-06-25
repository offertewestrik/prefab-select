import { RegisterInstallerForm } from "@/features/installers/components/register-form";

export default function OnboardingCompany() {
  return (
    <div>
      <p className="text-sm font-medium text-primary-600">Stap 1 van 4</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">Bedrijfsgegevens & account</h1>
      <p className="mt-2 text-neutral-500">Vul je bedrijfsgegevens in en maak een account aan.</p>
      <div className="mt-6">
        <RegisterInstallerForm />
      </div>
    </div>
  );
}

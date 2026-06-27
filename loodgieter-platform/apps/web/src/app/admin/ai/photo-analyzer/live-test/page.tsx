import Link from "next/link";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { getVisionProvider } from "@repo/photo-ai";
import { LiveTestForm } from "@/features/photo-ai/components/live-test-form";

export const dynamic = "force-dynamic";

export default function PhotoAnalyzerLiveTest() {
  const provider = getVisionProvider().name;
  const model = provider === "openai" ? process.env.OPENAI_VISION_MODEL ?? "gpt-4o-mini" : "mock";
  const hasKey = !!process.env.OPENAI_API_KEY;

  return (
    <div>
      <Link href="/admin/ai/photo-analyzer" className="text-sm text-neutral-500 hover:text-neutral-900">← Photo Analyzer</Link>
      <PageHeading title="Live-test" subtitle={`Geconfigureerde provider: ${provider} · model: ${model} · OpenAI-key: ${hasKey ? "aanwezig" : "afwezig (valt terug op mock)"}`} />

      <p className="mb-4 rounded-[var(--radius-md)] bg-neutral-50 p-3 text-sm text-neutral-500">
        Plak een publieke image-URL, kies een detector en provider, en draai de analyse. Er wordt géén
        PhotoAnalysis-record opgeslagen (alleen een AiInvocation-log). Forceer &quot;OpenAI&quot; om de echte
        provider te testen; zonder key valt deze veilig terug op mock.
      </p>

      <LiveTestForm />
    </div>
  );
}

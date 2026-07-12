import Link from "next/link";
import { listRows, getContent } from "@/lib/cms/db";
import { PageHeader, Card } from "@/components/admin/ui";
import { AIManager } from "@/components/admin/AIManager";
import { Icon } from "@/components/admin/Icon";

export const dynamic = "force-dynamic";

export default async function AiPage() {
  const [promptRows, model] = await Promise.all([
    listRows<{ key: string; content: string }>("ai_prompts", { order: "key", ascending: true, limit: 50 }),
    getContent<{ model?: string; temperature?: string }>("settings.ai"),
  ]);
  const prompts: Record<string, string> = {};
  for (const r of promptRows) prompts[r.key] = r.content;

  return (
    <div>
      <PageHeader
        title="AI Agent"
        subtitle="Configure the model, tune every prompt, and manage the knowledge the assistant uses — no code required."
        action={
          <Link href="/admin/collections/knowledge" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-[#94A3B8] hover:text-white">
            <Icon name="BrainCircuit" size={15} /> Manage Knowledge Base
          </Link>
        }
      />
      <Card className="mb-6 p-4 text-xs text-[#94A3B8]">
        The chatbot on the live site answers using these prompts + your published knowledge entries. Update knowledge in the Knowledge Base and it takes effect immediately.
      </Card>
      <AIManager prompts={prompts} model={model ?? {}} />
    </div>
  );
}

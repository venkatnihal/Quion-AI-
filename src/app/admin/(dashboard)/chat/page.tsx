import { listRows } from "@/lib/cms/db";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageHeader, Card } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

interface Conv { id: string; visitor_id?: string; summary?: string; created_at?: string }
interface Msg { id: string; conversation_id: string; role: string; content: string; created_at?: string }

export default async function ChatPage() {
  const convs = await listRows<Conv>("chat_conversations", { order: "created_at", limit: 100 });
  const admin = createAdminClient();
  let messages: Msg[] = [];
  if (admin && convs.length) {
    const { data } = await admin
      .from("chat_messages")
      .select("*")
      .in("conversation_id", convs.map((c) => c.id))
      .order("created_at", { ascending: true });
    messages = (data as Msg[]) ?? [];
  }

  return (
    <div>
      <PageHeader title="Chat History" subtitle="Conversations visitors had with the AI assistant." />
      {convs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-[#94A3B8]">No conversations yet. They appear here once visitors chat with the assistant.</div>
      ) : (
        <div className="space-y-4">
          {convs.map((c) => {
            const msgs = messages.filter((m) => m.conversation_id === c.id);
            return (
              <Card key={c.id} className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs text-[#64748B]">{c.created_at ? new Date(c.created_at).toLocaleString() : ""} · {msgs.length} messages</p>
                  {c.summary && <p className="text-xs text-[#94A3B8]">{c.summary}</p>}
                </div>
                <div className="space-y-1.5">
                  {msgs.slice(0, 12).map((m) => (
                    <div key={m.id} className={`max-w-[85%] rounded-lg px-3 py-1.5 text-sm ${m.role === "user" ? "ml-auto bg-[#00D4FF]/10 text-white" : "bg-white/5 text-[#94A3B8]"}`}>
                      {m.content}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

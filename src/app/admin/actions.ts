"use server";

import { revalidatePath } from "next/cache";
import { getProfile } from "@/lib/auth";
import { can, type Capability, type Role } from "@/lib/rbac";
import {
  insertRow,
  updateRow,
  deleteRow,
  saveContent,
  logAudit,
  getRow,
  type DbResult,
} from "@/lib/cms/db";
import { COLLECTIONS, coerceField } from "@/lib/cms/collections";
import { createAdminClient } from "@/lib/supabase/admin";

async function guard(cap: Capability): Promise<{ ok: boolean; role?: Role; email?: string; id?: string; error?: string }> {
  const profile = await getProfile();
  if (!profile) return { ok: false, error: "Not authenticated." };
  if (!can(profile.role, cap)) return { ok: false, error: "You don't have permission to do that." };
  return { ok: true, role: profile.role, email: profile.email, id: profile.id };
}

// ── Editable content (pages / sections / settings / seo / nav / theme) ──
export async function saveContentAction(
  key: string,
  data: Record<string, unknown>,
  status: "draft" | "published" = "published"
): Promise<DbResult> {
  const g = await guard("content.edit");
  if (!g.ok) return { ok: false, error: g.error };
  const res = await saveContent(key, data, g.id ?? null, status);
  if (res.ok) {
    await logAudit({ userId: g.id, userEmail: g.email, action: "content.save", entity: key });
    revalidatePath("/", "layout");
  }
  return res;
}

// ── Generic collection CRUD (services / portfolio / testimonials / faqs / knowledge) ──
export async function saveCollectionItem(collectionKey: string, formData: FormData): Promise<DbResult> {
  const g = await guard(collectionKey === "knowledge" ? "ai.configure" : "content.edit");
  if (!g.ok) return { ok: false, error: g.error };

  const def = COLLECTIONS[collectionKey];
  if (!def) return { ok: false, error: "Unknown collection." };

  const id = (formData.get("id") as string) || "";
  const row: Record<string, unknown> = {};
  for (const field of def.fields) {
    row[field.name] = coerceField(field, formData.get(field.name));
  }

  const res = id
    ? await updateRow(def.table, id, row)
    : await insertRow(def.table, row);

  if (res.ok) {
    await logAudit({
      userId: g.id,
      userEmail: g.email,
      action: id ? "collection.update" : "collection.create",
      entity: `${def.table}${id ? `#${id}` : ""}`,
    });
    revalidatePath(`/admin/collections/${collectionKey}`);
    revalidatePath("/", "layout");
  }
  return res;
}

export async function deleteCollectionItem(collectionKey: string, id: string): Promise<DbResult> {
  const g = await guard(collectionKey === "knowledge" ? "ai.configure" : "content.edit");
  if (!g.ok) return { ok: false, error: g.error };
  const def = COLLECTIONS[collectionKey];
  if (!def) return { ok: false, error: "Unknown collection." };
  const res = await deleteRow(def.table, id);
  if (res.ok) {
    await logAudit({ userId: g.id, userEmail: g.email, action: "collection.delete", entity: `${def.table}#${id}` });
    revalidatePath(`/admin/collections/${collectionKey}`);
    revalidatePath("/", "layout");
  }
  return res;
}

export async function duplicateCollectionItem(collectionKey: string, id: string): Promise<DbResult> {
  const g = await guard("content.edit");
  if (!g.ok) return { ok: false, error: g.error };
  const def = COLLECTIONS[collectionKey];
  if (!def) return { ok: false, error: "Unknown collection." };
  const orig = await getRow<Record<string, unknown>>(def.table, id);
  if (!orig) return { ok: false, error: "Item not found." };
  const copy = { ...orig };
  delete copy.id;
  delete copy.created_at;
  if (typeof copy[def.titleField] === "string") copy[def.titleField] = `${copy[def.titleField]} (copy)`;
  if ("slug" in copy && copy.slug) copy.slug = `${copy.slug}-copy`;
  const res = await insertRow(def.table, copy);
  if (res.ok) revalidatePath(`/admin/collections/${collectionKey}`);
  return res;
}

// ── Leads ──
export async function updateLead(id: string, patch: { status?: string; notes?: string }): Promise<DbResult> {
  const g = await guard("data.view");
  if (!g.ok) return { ok: false, error: g.error };
  const res = await updateRow("leads", id, patch);
  if (res.ok) {
    await logAudit({ userId: g.id, userEmail: g.email, action: "lead.update", entity: `leads#${id}`, meta: patch });
    revalidatePath("/admin/leads");
  }
  return res;
}

// ── Bookings ──
export async function updateBooking(id: string, patch: { status?: string; notes?: string }): Promise<DbResult> {
  const g = await guard("data.view");
  if (!g.ok) return { ok: false, error: g.error };

  // Cancellation / rejection: remove the Outlook event and email the attendee.
  if (patch.status === "cancelled" || patch.status === "rejected") {
    const { cancelBooking } = await import("@/lib/booking/service");
    await cancelBooking(id); // deletes Outlook event + sends cancellation email
    const res = await updateRow("bookings", id, patch); // preserve the exact status requested
    if (res.ok) {
      await logAudit({ userId: g.id, userEmail: g.email, action: "booking.update", entity: `bookings#${id}`, meta: patch });
      revalidatePath("/admin/bookings");
    }
    return res;
  }

  // Approval: ensure an Outlook event exists + send a confirmation email.
  if (patch.status === "approved") {
    const booking = await getRow<{
      starts_at?: string; ends_at?: string; name?: string; email?: string; topic?: string; outlook_event_id?: string;
    }>("bookings", id);
    if (booking?.starts_at && !booking.outlook_event_id) {
      const { createCalendarEvent, isOutlookReady } = await import("@/lib/outlook");
      const end = booking.ends_at ?? new Date(new Date(booking.starts_at).getTime() + 30 * 60000).toISOString();
      if (isOutlookReady) {
        const evt = await createCalendarEvent({
          subject: `QuionAi call — ${booking.name ?? booking.email ?? "Guest"}`,
          body: booking.topic ?? "Strategy call booked via QuionAi website.",
          start: booking.starts_at,
          end,
          attendeeEmail: booking.email,
          attendeeName: booking.name,
        });
        if (evt.ok && evt.id) await updateRow("bookings", id, { outlook_event_id: evt.id });
      }
      if (booking.email) {
        const [{ sendEmail, bookingConfirmationHtml }, { getBookingConfig }] = await Promise.all([
          import("@/lib/email"),
          import("@/lib/booking/config"),
        ]);
        const cfg = await getBookingConfig();
        void sendEmail({
          to: booking.email,
          subject: `Confirmed: ${cfg.meetingName}`,
          html: bookingConfirmationHtml({ name: booking.name, startsAt: booking.starts_at, meetingName: cfg.meetingName, timezone: cfg.timezone }),
        });
      }
    }
  }

  const res = await updateRow("bookings", id, patch);
  if (res.ok) {
    await logAudit({ userId: g.id, userEmail: g.email, action: "booking.update", entity: `bookings#${id}`, meta: patch });
    revalidatePath("/admin/bookings");
  }
  return res;
}

// ── Users / roles ──
export async function updateUserRole(userId: string, role: Role): Promise<DbResult> {
  const g = await guard("users.manage");
  if (!g.ok) return { ok: false, error: g.error };
  const res = await updateRow("profiles", userId, { role });
  if (res.ok) {
    await logAudit({ userId: g.id, userEmail: g.email, action: "user.role", entity: `profiles#${userId}`, meta: { role } });
    revalidatePath("/admin/users");
  }
  return res;
}

// ── Version restore ──
export async function restoreVersion(versionId: string): Promise<DbResult> {
  const g = await guard("content.edit");
  if (!g.ok) return { ok: false, error: g.error };
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Supabase not configured." };
  const { data: version } = await admin.from("content_versions").select("*").eq("id", versionId).maybeSingle();
  if (!version) return { ok: false, error: "Version not found." };
  const res = await saveContent(version.key, version.data, g.id ?? null, version.status ?? "published");
  if (res.ok) {
    await logAudit({ userId: g.id, userEmail: g.email, action: "content.restore", entity: version.key });
    revalidatePath("/", "layout");
  }
  return res;
}

// ── AI prompts + model config ──
export async function saveAiPrompt(key: string, content: string): Promise<DbResult> {
  const g = await guard("ai.configure");
  if (!g.ok) return { ok: false, error: g.error };
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Supabase not configured." };
  const { error } = await admin
    .from("ai_prompts")
    .upsert({ key, content, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) return { ok: false, error: error.message };
  await logAudit({ userId: g.id, userEmail: g.email, action: "ai.prompt", entity: key });
  revalidatePath("/admin/ai");
  return { ok: true };
}

export async function saveAiModel(config: Record<string, unknown>): Promise<DbResult> {
  const g = await guard("ai.configure");
  if (!g.ok) return { ok: false, error: g.error };
  return saveContent("settings.ai", config, g.id ?? null, "published");
}

// ── Chat ──
export async function deleteConversation(id: string): Promise<DbResult> {
  const g = await guard("data.view");
  if (!g.ok) return { ok: false, error: g.error };
  const res = await deleteRow("chat_conversations", id);
  if (res.ok) {
    await logAudit({ userId: g.id, userEmail: g.email, action: "chat.delete", entity: `chat#${id}` });
    revalidatePath("/admin/chat");
  }
  return res;
}

// ── Media ──
export async function deleteMedia(id: string): Promise<DbResult> {
  const g = await guard("content.edit");
  if (!g.ok) return { ok: false, error: g.error };
  const res = await deleteRow("media", id);
  if (res.ok) {
    await logAudit({ userId: g.id, userEmail: g.email, action: "media.delete", entity: `media#${id}` });
    revalidatePath("/admin/media");
  }
  return res;
}

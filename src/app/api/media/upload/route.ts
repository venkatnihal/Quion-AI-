import { NextResponse, type NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getProfile } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { createAdminClient } from "@/lib/supabase/admin";

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const KEY = process.env.CLOUDINARY_API_KEY;
const SECRET = process.env.CLOUDINARY_API_SECRET;

if (CLOUD && KEY && SECRET) {
  cloudinary.config({ cloud_name: CLOUD, api_key: KEY, api_secret: SECRET, secure: true });
}

export async function POST(request: NextRequest) {
  const profile = await getProfile();
  if (!profile || !can(profile.role, "content.edit")) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }
  if (!CLOUD || !KEY || !SECRET) {
    return NextResponse.json({ error: "Cloudinary is not configured. Set CLOUDINARY_* env vars." }, { status: 500 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${bytes.toString("base64")}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "quionai",
      resource_type: "auto",
    });

    const item = {
      url: result.secure_url,
      public_id: result.public_id,
      type: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      folder: "quionai",
    };

    // Persist to the media table (best effort — works once schema is applied).
    const admin = createAdminClient();
    let saved = item as Record<string, unknown> & { id?: string };
    if (admin) {
      const { data } = await admin.from("media").insert(item).select().maybeSingle();
      if (data) saved = data;
    }

    return NextResponse.json({ item: saved });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed." },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";

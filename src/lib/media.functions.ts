import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_USERNAME = "mileynevents";
const ADMIN_PASSWORD = "1234";

function checkAuth(u: string, p: string) {
  if (u.trim().toLowerCase() !== ADMIN_USERNAME || p !== ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}

const UploadSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(200),
  filename: z.string().min(1).max(200),
  contentType: z.string().min(1).max(100),
  dataBase64: z.string().min(1).max(15_000_000), // ~10MB
});

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => UploadSchema.parse(i))
  .handler(async ({ data }) => {
    checkAuth(data.username, data.password);
    const safe = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
    const bytes = Uint8Array.from(atob(data.dataBase64), (c) => c.charCodeAt(0));
    const { error } = await supabaseAdmin.storage
      .from("site-media")
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);
    const { data: pub } = supabaseAdmin.storage.from("site-media").getPublicUrl(path);
    return { url: pub.publicUrl, path };
  });

const DeleteSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(200),
  path: z.string().min(1).max(300),
});

export const deleteMedia = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => DeleteSchema.parse(i))
  .handler(async ({ data }) => {
    checkAuth(data.username, data.password);
    const { error } = await supabaseAdmin.storage.from("site-media").remove([data.path]);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

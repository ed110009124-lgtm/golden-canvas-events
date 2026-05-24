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

const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

const ALLOWED_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

// Magic byte signatures for the allowed image types
function detectMime(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) return "image/png";
  // GIF: 47 49 46 38 (37|39) 61
  if (
    bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38 &&
    (bytes[4] === 0x37 || bytes[4] === 0x39) && bytes[5] === 0x61
  ) return "image/gif";
  // WEBP: RIFF....WEBP
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) return "image/webp";
  return null;
}

const UploadSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(200),
  filename: z.string().min(1).max(200),
  contentType: z.enum(ALLOWED_MIME),
  dataBase64: z.string().min(1).max(15_000_000), // ~10MB
});

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => UploadSchema.parse(i))
  .handler(async ({ data }) => {
    checkAuth(data.username, data.password);
    const bytes = Uint8Array.from(atob(data.dataBase64), (c) => c.charCodeAt(0));
    if (bytes.length > 10 * 1024 * 1024) {
      throw new Error("File too large");
    }
    const detected = detectMime(bytes);
    if (!detected || detected !== data.contentType) {
      throw new Error("File contents do not match an allowed image type");
    }
    const ext = ALLOWED_EXT[detected];
    // Ignore client filename to avoid extension spoofing
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabaseAdmin.storage
      .from("site-media")
      .upload(path, bytes, { contentType: detected, upsert: false });
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

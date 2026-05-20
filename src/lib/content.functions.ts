import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_PASSWORD = "mileyn1234";
const ADMIN_USERNAME = "Mileynevents";

const SaveSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(200),
  key: z.string().min(1).max(100).regex(/^[a-z0-9_]+$/),
  value: z.unknown(),
});

export const saveSiteContent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SaveSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.username !== ADMIN_USERNAME || data.password !== ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const { error } = await supabaseAdmin
      .from("site_content")
      .upsert(
        { key: data.key, value: data.value as never, updated_at: new Date().toISOString() },
        { onConflict: "key" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const cache = new Map<string, unknown>();
const listeners = new Map<string, Set<(v: unknown) => void>>();

async function fetchKey(key: string) {
  const { data } = await supabase.from("site_content").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

export function useSiteContent<T>(key: string, fallback: T): T {
  const [value, setValue] = useState<T>(() => (cache.has(key) ? (cache.get(key) as T) : fallback));

  useEffect(() => {
    let alive = true;
    if (!listeners.has(key)) listeners.set(key, new Set());
    const set = (v: unknown) => {
      if (!alive) return;
      setValue((v as T) ?? fallback);
    };
    listeners.get(key)!.add(set);

    if (cache.has(key)) {
      setValue((cache.get(key) as T) ?? fallback);
    } else {
      fetchKey(key).then((v) => {
        cache.set(key, v);
        listeners.get(key)?.forEach((fn) => fn(v));
      });
    }
    return () => {
      alive = false;
      listeners.get(key)?.delete(set);
    };
  }, [key, fallback]);

  return value;
}

export function primeSiteContent(key: string, value: unknown) {
  cache.set(key, value);
  listeners.get(key)?.forEach((fn) => fn(value));
}

import { SupabaseClient } from "npm:@supabase/supabase-js@2";

/**
 * Returns true if the request is rate-limited.
 * @param supabase  Service-role client
 * @param action    Unique action name, e.g. "submit-waitlist"
 * @param ip        Client IP
 * @param limit     Max requests allowed per window
 * @param windowMs  Window duration in milliseconds
 */
export async function isRateLimited(
  supabase: SupabaseClient,
  action: string,
  ip: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const key = `${action}:${ip}`;
  const now = Date.now();
  // Fetch existing record
  const { data } = await supabase
    .from("rate_limits")
    .select("window_start, count")
    .eq("key", key)
    .maybeSingle();

  if (!data || new Date(data.window_start).getTime() < now - windowMs) {
    // No record or window expired — reset
    await supabase.from("rate_limits").upsert(
      { key, window_start: new Date().toISOString(), count: 1 },
      { onConflict: "key" }
    );
    return false;
  }

  if (data.count >= limit) return true;

  // Increment
  await supabase
    .from("rate_limits")
    .update({ count: data.count + 1 })
    .eq("key", key);

  return false;
}

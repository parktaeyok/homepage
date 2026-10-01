import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Publishable credentials identify the project; RLS protects member data.
const SUPABASE_URL = "https://zbokfwjsygjfctgobutw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_N2LwmmmJuVV6ulWy_uip4g_m1yahm4i";
const USERNAME_PATTERN = /^[a-z][a-z0-9_]{3,23}$/;

let browserClient: SupabaseClient | undefined;

export function getSupabase() {
  browserClient ??= createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  return browserClient;
}

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

export function isValidUsername(value: string) {
  return USERNAME_PATTERN.test(value);
}

export function usernameToAuthEmail(username: string) {
  return username + "@members.homepage.example.com";
}
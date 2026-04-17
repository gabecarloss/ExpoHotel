import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

let supabaseConfig: any = null;

if (typeof window !== "undefined") {
  supabaseConfig = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_KEY!,
    {
      auth: {
        storage: window.localStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );
}

export { supabaseConfig };
import { createClient } from "@/utils/supabase/client";

/**
 * Get the current user's JWT access token for API authentication
 * @returns JWT token string or null if not authenticated
 * @deprecated Use getAccessToken() from UserSessionProvider instead to avoid race conditions
 */
export async function getAuthToken(): Promise<string | null> {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting auth token:", error);
    return null;
  }

  if (!session) {
    return null;
  }

  return session.access_token;
}

/**
 * Get headers with authorization token for API requests
 * @returns Headers object with Authorization header, or null if not authenticated
 * @deprecated Use getAccessToken() from UserSessionProvider instead to avoid race conditions
 */
export async function getAuthHeaders(): Promise<Record<string, string> | null> {
  const token = await getAuthToken();

  if (!token) {
    return null;
  }

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

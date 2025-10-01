import { createClient } from "@/utils/supabase/client";

/**
 * Get the current user's JWT access token for API authentication
 * @returns JWT token string or null if not authenticated
 */
export async function getAuthToken(): Promise<string | null> {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    console.error("Error getting auth token:", error);
    return null;
  }

  return session.access_token;
}

/**
 * Get headers with authorization token for API requests
 * @returns Headers object with Authorization header
 */
export async function getAuthHeaders(): Promise<HeadersInit> {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("No authentication token available");
  }

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

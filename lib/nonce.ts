import { headers } from "next/headers";

/**
 * Get the CSP nonce from request headers.
 * This should only be called in Server Components or Server Actions.
 */
export function getNonce(): string | undefined {
  return headers().get("x-nonce") || undefined;
}

# Partner Tokens

Partner tokens let you give specific people free access to Market Spy and Market Scout without requiring them to create an account or pay. Each token is a single-use link that grants 1 analysis run.

## How it works

When a partner clicks their link, an invisible anonymous session is created for them behind the scenes. They go straight to the Market Spy tool — no sign-up form, no payment screen. The session persists in their browser cookies until the run is used.

---

## Generating a token

1. Go to `/admin/partner-tokens` (requires admin access)
2. Fill in **Partner / Promoter name** — used for your own tracking, not shown to the partner
3. Optionally add **Notes** (e.g. "Podcast collaboration", "Referral partner")
4. Click **Generate token**
5. Click **Copy link** next to the new token — this is the URL you share

The link format is: `https://www.strsage.com/partner/[token]`

---

## Sharing with a partner

Send the copied link directly to your partner. No other instructions needed. When they click it they'll see a branded welcome page and a single "Get Started for Free" button.

**Note:** The link is single-use. Once clicked and activated it cannot be used again. Generate a new token for each person.

---

## Partner experience

1. Partner clicks the link
2. Sees a welcome page with your partner name and a brief feature overview
3. Clicks **Get Started for Free**
4. Lands directly on the Market Spy analysis page, ready to run a report
5. After submitting an address they can also use Market Scout (both products share the 1 run)

No email, no password, no credit card at any point.

---

## Checking redemption status

The token list at `/admin/partner-tokens` shows each token's status:

| Status | Meaning |
|--------|---------|
| **Available** | Not yet used — link is still valid |
| **Redeemed [date]** | Partner has activated their access |
| **Expired** | Past the `expires_at` date (if one was set) |

---

## Revoking a token

Click **Revoke** next to any **Available** token to permanently delete it. The link will stop working immediately. Redeemed tokens cannot be revoked (the partner has already used their access).

---

## If a partner loses their session

Partner sessions persist via browser cookies. If their cookies are cleared or expire, they lose access — there is no way to log back in since no account was created.

If this happens, generate a new token and send them a fresh link.

---

## Technical notes

- Partner anonymous users are cleaned up by the existing admin cleanup job (`POST /api/admin/cleanup-anonymous-users`, 7-day default)
- Access is controlled by the `is_partner_user` flag on the `profiles` table — this bypasses the normal Stripe plan check in middleware
- Usage is tracked via the same `market_spy_listings_used` / `market_spy_listings_limit` fields as paid users
- Partner tokens are stored in the `partner_tokens` table in Supabase

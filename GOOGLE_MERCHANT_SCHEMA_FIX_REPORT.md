# Google Merchant Listings: Schema Fix Report

**Site:** https://zyminex.plus
**Date:** 2026-11-24
**Status:** Fixed in code and verified on a local production build. **Not deployed, not committed.**

Search Console (report of 2026-11-23) flagged 3 valid Product items with two warnings: missing `hasMerchantReturnPolicy` and missing `shippingDetails`. The three items are the Product markup on `/`, `/pricing` and `/zyminex`. These are the only pages whose Product uses plain `Offer` entries, which is what Google's merchant listings evaluate. `/reseller` and the channel pages use `AggregateOffer`, which Google counts as product snippets instead.

| Warning | Result |
|---|---|
| Missing `hasMerchantReturnPolicy` | **Addressed in code.** A link-only return policy is now declared on the site's Organization, and all 27 offers name that Organization as seller. Google doesn't document whether an Organization-level policy clears the per-item warning, so it needs checking after deployment (section 6). |
| Missing `shippingDetails` | **Intentionally left absent.** Nothing is shipped, so any shipping data would be invented. This warning will remain. It is non-critical: the items stay valid. |

---

## 1. Files inspected and changed

**Changed (structured data only; no visible content, design, CSS or pricing touched):**

| File | Change |
|---|---|
| `app/layout.tsx` | The Organization schema gains `hasMerchantReturnPolicy` (a link to /refund-policy). Its `@id` now comes from the shared `CONSTANTS.ORGANIZATION_ID`; the rendered value is unchanged. |
| `app/components/PageSchemas.tsx` | The homepage Product's 9 offers get `seller: {"@id": "https://zyminex.plus/#organization"}`, through the existing shared offer defaults. The stale comment is updated. |
| `app/pricing/layout.tsx` | The /pricing Product's 9 offers get the same `seller` reference. It replaces an empty placeholder object (`digitalDeliveryDetails = {}`) that rendered nothing. The stale comment is updated. |
| `app/zyminex/layout.tsx` | The /zyminex Product's 9 offers get the same `seller` reference. |
| `GOOGLE_MERCHANT_SCHEMA_FIX_REPORT.md` | This report (new). |

**Inspected:**
- **Schema sources:** `app/page.tsx` (renders the homepage Product), `app/reseller/layout.tsx`, `app/channels/[slug]/page.tsx`
- **Policy pages:** `app/refund-policy/page.tsx`, `app/terms/page.tsx`
- **Prices and FAQs:** `app/components/PricingSection.tsx` (the visible price table), `lib/seo.ts`, `lib/page-faqs.ts`, `lib/home-faqs.ts`, `app/faq/page.tsx`
- **Other pages that mention refunds:** `lib/blog.ts` (every refund mention), `app/dmca/page.tsx`
- **Version history:** the git history of the two missing properties
- **External references:** Google Search Central's merchant listing, return policy, shipping policy and product documentation, plus the schema.org definitions of `hasMerchantReturnPolicy`, `merchantReturnLink` and `seller`

---

## 2. Exact schema changes

**Organization** (rendered on every page by `app/layout.tsx`). One property was added:

```json
"hasMerchantReturnPolicy": {
  "@type": "MerchantReturnPolicy",
  "merchantReturnLink": "https://zyminex.plus/refund-policy"
}
```

**Every Offer on `/`, `/pricing` and `/zyminex`** (9 per page, 27 in total). One property was added:

```json
"seller": { "@id": "https://zyminex.plus/#organization" }
```

That `@id` is the existing Organization's. Every one of the three pages renders that Organization, so the reference resolves on each.

**Deliberately not added:**
- `returnPolicyCategory`
- `merchantReturnDays`
- `returnMethod`
- `returnFees`
- `refundType`
- any offer-level return policy
- `shippingDetails`, or any other shipping data
- ratings or reviews

**Unchanged:**
- Product entities, `@id`s, names and SKUs
- all 9 offers per page: names, prices, `USD`, `InStock`, URLs, descriptions, `validFrom`
- every other JSON-LD block (FAQ, breadcrumbs, WebPage, WebSite)

Google's docs allow two ways to satisfy an Organization-level return policy: country plus category, **or** `merchantReturnLink` alone. The link-only option was chosen because it is the only one that states nothing beyond "the policy is on this page" (see section 3).

All three properties are defined on the types used here (checked on schema.org): `hasMerchantReturnPolicy` on Organization, `merchantReturnLink` on MerchantReturnPolicy, `seller` on Offer.

---

## 3. The actual refund policy

### What the site publishes

**Main source: `/refund-policy`.**

Section 1 says: *"A refund is granted only if the delivered service is structurally and demonstrably non-functional due to causes within our server infrastructure."* All four of these conditions must be met:
1. *"The report is filed in writing within exactly 7 calendar days of the initial purchase date."*
2. *"There is a sustained, server related failure that prevents the service from working as advertised."*
3. *"Our 24/7 technical support desk has had at least 24 hours to fix the reported connection problem or set up alternate routing."*
4. *"You have completed the standard diagnostic steps we request, such as a router restart, app cache clear, and DNS check."*

The rest of the page:
- **No refund for:** change of mind, local network limits, device incompatibility, channel changes, or fair-use violations.
- **Procedure:** support verifies the account, reroutes the stream, and *"If the outage remains unresolvable, immediate refund approval follows."*
- **Payout:** *"After official technical authorization, the amount is refunded within 1 to 3 business days via the original payment method."*

**`/terms`, section 5** says the same thing in less detail: *"you may request a full refund within 7 days of purchase"* if the service doesn't work as promised or the team can't resolve technical problems. It *"does not cover change of mind requests, personal preference, local internet issues, or device incompatibility."*

### What the 24-hour condition means

It is a **minimum repair window**. A refund can't be authorized until support has had at least 24 hours to fix the reported problem or reroute the connection.

| It is not | Because |
|---|---|
| The deadline to ask for a refund | That deadline is 7 calendar days from the initial purchase, in writing. |
| The refund processing time | Processing is 1–3 business days after authorization. |

The condition appears only on `/refund-policy`; `/terms` doesn't mention it.

### The 7-day "product change" period

The brief for this task describes a 7-day period for product changes. **No page on the site publishes that.** What the site actually says:
- **The only 7-day period** is the deadline to report a technical failure in writing for a refund.
- **Plan changes** appear only in the pricing FAQ: *"Can I upgrade or modify my IPTV Subscription later?"* → *"Yes, you can upgrade at any time to add more screens or switch to a longer period."* That's at any time, with no 7-day window.
- **One blog FAQ** (`/blog/fix-iptv-buffering`) mentions *"a refund or a swap to a different channel package"* after 24 hours. It is generic advice about "your provider", not a stated Zyminex policy.

Because of this mismatch, the markup encodes neither period. If the real business policy differs from the published pages, **the pages need updating first**. That's a content decision for the owner. The markup doesn't need to change either way, because it only points to the page.

### Ambiguities in the published wording (left unchanged)

1. *"7 calendar days of the initial purchase date"*: it's unclear whether renewals get their own 7-day window.
2. `/terms` promises a *"full refund"*, while `/refund-policy` says *"the amount is refunded"*.
3. `/refund-policy` requires a written report with an order number. `/terms` says "contacting our support team", and the blog says "contact support on WhatsApp".
4. The blog says *"The FAQ page covers the details of the refund policy"*, but `/faq` contains no refund content.

### Why the markup is link-only

Google's return categories can't represent "refund only for a verified technical failure, reported within 7 days, after a 24-hour repair window, never for a change of mind":
- **`MerchantReturnFiniteReturnWindow` with 7 days** would tell shoppers they can get a refund for any reason within 7 days. That would present the guarantee as unconditional, which the policy excludes.
- **`MerchantReturnNotPermitted`** would hide the 7-day guarantee that the policy does offer.

The site's original markup used `MerchantReturnNotPermitted`, which was removed for that reason (commit `1e65159`). A link to the real policy page makes no claim beyond what the page says.

---

## 4. Why `shippingDetails` was intentionally not added

Zyminex sells digital IPTV subscriptions; login details are delivered electronically. There is no parcel, carrier, destination, shipping rate or transit time. Every shipping option Google offers requires some of those:
- per offer, `OfferShippingDetails` needs a rate, destination and delivery time
- at the Organization level, `ShippingService` needs shipping conditions

Any of them would have to be invented. Google's documentation has no exemption for digital goods, so the warning can't be cleared truthfully.

The site's first version had exactly this kind of invented data: $0 shipping to the US with 0-day handling and 0-day transit. It was removed in commit `1e65159` and **has not been re-added**. A warning for a property that doesn't apply is better than misleading structured data. The warning doesn't make the items invalid.

---

## 5. Validation results

All checks ran against an isolated production build of the working tree, served locally (`next start`), reading the raw server HTML. The before/after comparison used the live site's markup captured just before the edits; the live site was then identical to the committed code.

### Build and code checks

| Check | Result |
|---|---|
| Production build | Passed, 39/39 static pages. The only build warning is an existing CSS gradient notice in `globals.css`, which wasn't touched. |
| TypeScript (`tsc --noEmit`) | 0 errors |
| ESLint (`eslint .`) | 0 errors, 26 warnings (the same count as before this change) |
| Routes | 36/36 return 200; unknown URLs return 404 |
| Existing structured-data suite | 34 pages, 159 FAQ Q&A pairs, 47 JSON-LD URLs: 0 problems |

### Per page (`/`, `/pricing`, `/zyminex`: every check passed on all three)

| Check | `/` | `/pricing` | `/zyminex` |
|---|---|---|---|
| HTTP 200; all JSON-LD blocks parse | ✓ (4 blocks) | ✓ (3) | ✓ (3) |
| Exactly one Product; no conflicting `@id` definitions | ✓ | ✓ | ✓ |
| 9 offers, all plain `Offer` | ✓ | ✓ | ✓ |
| Every offer price = pricing table (by devices × months) | ✓ | ✓ | ✓ |
| `USD`, `InStock`, URL `https://zyminex.plus/pricing` on every offer | ✓ | ✓ | ✓ |
| Every offer has `seller: {"@id": ".../#organization"}` | 9/9 | 9/9 | 9/9 |
| Seller `@id` resolves to exactly one Organization on the page | ✓ | ✓ | ✓ |
| Organization return policy is link-only, pointing at /refund-policy | ✓ | ✓ | ✓ |
| No offer-level return policy or shipping data | ✓ | ✓ | ✓ |
| Before vs. after: the only differences are the added `seller` and the added return-policy link | ✓ | ✓ | ✓ |
| **Real browser:** after clicking 1, 2 and 3 devices, the displayed prices equal the schema offers | 9/9 | 9/9 | 9/9 |

The displayed prices on all three pages:

| Devices | 3 months | 6 months | 12 months |
|---|---|---|---|
| 1 device | $35 | $45 | $75 |
| 2 devices | $59 | $79 | $109 |
| 3 devices | $75 | $110 | $149 |

### Site-wide (all 34 sitemap pages plus the 404 page)

| Check | Result |
|---|---|
| JSON-LD parses on every URL | ✓ (105 blocks) |
| No shipping data anywhere (`shippingDetails`, `OfferShippingDetails`, `ShippingService`, `hasShippingService`, rates, destinations, delivery times) | ✓ none |
| No `returnPolicyCategory` or `merchantReturnDays` anywhere, so no 7-day return window is declared | ✓ none |
| No `AggregateRating`, `Review` or rating markup | ✓ none |
| `hasMerchantReturnPolicy` appears only on the Organization | ✓ |
| `/refund-policy`, local build and live: 200, canonical is itself, indexable, in the sitemap | ✓ |

**No unconditional 7-day refund claim in the structured data.** The JSON-LD mentions "7 day" 10 times, sitewide:
- **7 mentions** describe the TV guide or catch-up, not refunds.
- **The two blog review article FAQ answers** state conditions: *"7-day refund policy for genuine service failures"* and *"within the first 7 days … if the service does not work as promised."*
- **The `/refund-policy` page description** says *"7 day quality guarantee"*.

These existing texts mirror visible content and weren't changed.

### Not run

- **Google's Rich Results Test and Schema Markup Validator.** These are interactive Google tools, and the markup isn't live yet. Section 7 says how to run them after deployment.
- **Search Console.** I have no access to it; nothing in this report claims a change there.

---

## 6. Remaining Google warnings and why

| Warning | Expected after deploy and recrawl | Why |
|---|---|---|
| Missing `shippingDetails` (3 items) | **Remains** | No shipping exists. Clearing it would need invented shipping data. Non-critical: the items stay valid. |
| Missing `hasMerchantReturnPolicy` (3 items) | **Unconfirmed** | The policy is now declared once on the Organization. Offer-level settings override Organization-level ones, but Google doesn't document whether this per-item warning counts an Organization-level policy. |

If the return-policy warning stays after Google recrawls, the options are:
1. **Accept the warning (recommended).** The return policy is still published and linked.
2. **Add a per-offer policy.** Google requires a category there. "7-day returns" would promise more than the policy; "returns not permitted" would hide the 7-day guarantee.
3. **Configure returns in Search Console's account-level settings.** Google uses those in preference to markup, but they require the same kind of category choice, so the same accuracy problem applies.

### Observed but not changed (outside this fix)

- **Homepage offer names don't match the visible plans.** The homepage schema names its tiers by device count ("Standard - 1 Device", "Premium - 2 Devices", "VIP Multi-Room - 3 Devices"). The visible cards name them by duration: Starter is 3 months, Premium 6 months and Ultimate VIP 12 months. Prices, device counts and durations are all correct.
- **The three Products are defined separately** with different names, SKUs and `@id`s; `/` and `/zyminex` share the SKU `ZYMINEX-PREMIUM`. These were kept as requested (no refactor).
- **Purchase eligibility.** Google states that only pages where a shopper can purchase are eligible for merchant listing experiences. Purchases here happen through WhatsApp via `support-tv.online`, which is still unconfirmed. That may limit how Google shows these listings, whatever the warnings say.
- **Unverified marketing claims in schema descriptions.** "55,000+ live channels" and "150,000+ movies" are still open owner decisions. The Organization description also says "Instant email setup", while /setup and /support say logins arrive by WhatsApp.

---

## 7. Deployment and Google recrawling

**Both are still required.** The changes exist only in the local working tree. Nothing was deployed or committed.

1. **Review the diff, then commit and deploy.** Four schema files changed, plus this report.
2. **Purge the Cloudflare cache** (Caching → Configuration → Purge Everything). The site's HTML is cached at the edge for about 4 hours, so Google could otherwise still see the old markup.
3. **Test each page** with the Rich Results Test (https://search.google.com/test/rich-results): `https://zyminex.plus/`, `https://zyminex.plus/pricing` and `https://zyminex.plus/zyminex`.
   - Confirm each shows a valid merchant listing item with 9 offers.
   - Note whether the `hasMerchantReturnPolicy` warning is gone. The `shippingDetails` warning is expected to stay.
4. **In Search Console**, open **Shopping → Merchant listings**:
   - If the Rich Results Test no longer shows the return-policy warning, open the *Missing field "hasMerchantReturnPolicy"* issue and click **Validate fix**.
   - Do **not** click Validate fix on the `shippingDetails` issue. That field is intentionally absent, so validation would fail.
5. **Optional:** use **URL Inspection → Request indexing** on the three URLs to speed up the recrawl.
6. **Wait for Google.** Recrawling and validation usually take several days and can take a couple of weeks.

Until Search Console itself shows the change, treat the result as **fixed in code, pending Google validation**.

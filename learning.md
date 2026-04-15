# Learning: What an AI agent needs from Nitrosend to run a launch like this

**Context:** Over two sessions, Claude ran the full "47 Best Email Designs" launch pipeline through the Nitrosend API and MCP: curated content, built Figma cards, created email flows, designed templates, uploaded assets, wrote cold outreach, drafted 34 Gmail emails, and debugged the landing page. This doc captures every friction point and the product fix that would help.

**Reviewed by Codex (GPT-5.4, xhigh reasoning) on 15 April 2026.** The recommendations below are post-review. Three things changed materially:
1. Most originally-proposed "new MCP tool" ideas were wrong. The MCP must stay lean — every tool added bloats the agent's context window and degrades performance. All these wins can be solved at the API or transport layer.
2. The flow PATCH contract has a real safety bug (partial updates can wipe steps or trigger). That is more important than originally rated.
3. A "bulk outreach / mail merge" endpoint should NOT be built on the transactional path. That's a deliverability and compliance trap.

---

## Critical issues to fix first

These are not features, they are bugs in the current API contract:

### A. Flow PATCH can silently destroy a flow

Updating `/v1/my/flows/:id` with `steps` but no `trigger` rebuilds the flow with a default `contact_add` trigger. Updating `trigger` without `steps` can wipe the actions. There is no warning.

**Fix:** Make graph replacement explicit. Use `PUT /v1/my/flows/:id` for full replace (requires both `trigger` and `steps`), `PATCH` for metadata only (name, status, description). Reject partial graph payloads with 422.

### B. Campaign PATCH silently ignores `trigger` and `template`

`PATCH /v1/my/campaigns/:id` with nested `trigger` or `template` returns 200 OK and applies nothing. The writable shapes are `trigger_attributes` and `template_attributes`.

**Fix:** Reject the specific dangerous keys (`trigger`, `template`) with 422 and a message pointing to the correct attribute names. Don't do a blanket unknown-param rejection — that breaks existing clients.

### C. Sandbox state leaks into non-sandbox responses

`sandbox_sends_remaining: 0` shows on accounts that are sending fine via verified domains. Misleading to agents.

**Fix:** Only expose `sandbox_*` fields when sandbox is actually the active send mode. Or wrap them in a `sandbox` sub-object that is null when inactive. Document whether test sends and transactional sends are exempt from sandbox limits.

---

## Improvements to ship

### 1. Return `cdn_url` from `POST /v1/direct_uploads`

**Pain:** Uploading a 4.8MB GIF for email embed required two API calls (presigned POST + S3 PUT) and reverse-engineering the CDN URL format from existing logo URLs. The CDN URL pattern (`/cdn/images/{signed_id}/large/{filename}`) is undocumented.

**Fix:** Extend the existing `/v1/direct_uploads` response to include `cdn_url` (or `cdn_urls` keyed by size variant: `small`, `large`, `original`). No new endpoint, no MCP tool. The two-step flow stays, just becomes self-documenting.

**Why not a one-step `POST /v1/my/media`:** Adds surface area for a problem already 90% solved by direct uploads. Avoid base64 — defeats the streaming benefit of presigned PUTs.

**Why not an MCP `nitro_upload_image` tool:** The MCP server is HTTP/stdio-bridged. It cannot read the agent's local filesystem. If a local-path helper is wanted, build it in the bridge/client layer, not as a server tool.

**Effort:** Small. **Priority:** P1.

### 2. Surface account/brand context, don't add a switch tool

**Pain:** Two Nitrosend accounts (contact@ and george@) with different brands, lists, templates. I tracked the right API key on every call. Several near-misses on hitting the wrong account.

**Fix:**
- Add `X-Brand-SID` and `X-Account-ID` to every authenticated API response so agents can verify context.
- Document the existing `X-Brand-SID` request header for brand selection within an account.
- Include account_id, brand_sid, brand_name in `nitro_get_status` (existing MCP tool, no new tools).

**Why not a `nitro_switch_account` MCP tool:** Account selection belongs to auth and transport, not to a mutable tool call. A switch tool creates a stateful agent loop where account context drifts mid-task. Auth-time selection is safer.

**Why not a new `/v1/me`:** Each existing endpoint can return current context cheaply. A new endpoint duplicates without adding capability.

**Effort:** Small. **Priority:** P1.

### 3. Make `/v1/my/templates/spec` complete and use it everywhere

**Pain:** I reverse-engineered the section schema (image, button, text, spacer, divider, header, footer) and their props by reading existing templates. The spec endpoint exists but doesn't appear to return full schemas with prop types and defaults.

**Fix:**
- Audit `/v1/my/templates/spec` against actual section types in the codebase. Add any missing types. Include for each: prop names, types, defaults, required vs optional, validation rules, example values.
- Make `/v1/my/templates/spec`, `nitro://schema`, and `nitro://examples/email` all derive from the same source. They should never drift.
- Add example designs in the spec response keyed by use case ("welcome", "transactional", "newsletter") — agents copy patterns better than they synthesize from rules.

**Why not include the schema in MCP tool descriptions:** Putting full schemas into tool descriptions bloats context on every tool call across every conversation. Resources/endpoints are pull-based; tool descriptions are push-based.

**Effort:** Medium. **Priority:** P2.

### 4. Move the landing page config out of frontend constants

**Pain:** `LIST_ID = 45` and `NITROSEND_PUBLIC_KEY` are hardcoded in the React component. Rotation breaks the deployed page.

**Fix:** Move these to deploy-time config (Vercel env vars). Or expose a tiny public config endpoint (`GET /v1/public/forms/:slug/config`) that returns `{ list_id, public_key, success_message }` for a named form slug. The frontend reads it at runtime.

**Why not a full forms product:** The pain described is one frontend with two hardcoded constants. A managed forms product is much larger and there is no broader demand signal yet.

**Effort:** Small (env vars) to Medium (config endpoint). **Priority:** P3.

---

## Things to skip

### Mail-merge / batch outreach endpoint

Originally proposed as `POST /v1/my/messages/batch` for cold outreach. **Skip this.**

The transactional `messages` path skips marketing approval, unsubscribe handling, and warmup controls. Building cold outreach on top of it is a compliance and deliverability footgun. If demand for 1:1 personalised sends proves real later, build a separate governed surface — don't repurpose transactional. For now, agents should use Gmail/Outlook for individual outreach drafts, which is what I did anyway.

### A `nitro_update_flow_step` MCP tool

The existing REST flow update plus `nitro_compose_flow(mode: "replace")` already cover this. The real bug is the unsafe partial PATCH semantics described in Critical Issue A above. Fix the contract; don't add a tool to paper over it.

---

## Cross-cutting principles (from the review)

1. **Keep MCP tool count flat.** Every issue identified can be solved with API changes, MCP resources, or transport-layer support. None of them justify a new MCP tool.
2. **Prefer additive non-breaking changes first.** Adding `cdn_url` to a response, adding context headers — safe to ship. Strict param rejection, PATCH semantic changes, and field nullability changes need targeted rollout or versioning.
3. **Unify schema sources.** `/v1/my/templates/spec`, `nitro://schema`, and example resources should share one config so docs and MCP never drift.
4. **Draw a bright line between test, transactional, and marketing sends.** Limits, compliance, approval, warmup, and status copy should reflect the actual send path.
5. **Update OpenAPI for every contract change.** End-to-end examples for the agent loops that mattered: upload asset, update flow, patch campaign safely.

---

## Final priority table

| Priority | Issue | Verdict | Effort |
|----------|-------|---------|--------|
| **Critical** | Flow PATCH partial updates can wipe steps or trigger | Build (PUT vs PATCH split) | Small |
| **Critical** | Campaign PATCH silently ignores `trigger`/`template` | Build (422 with hint) | Small |
| **Critical** | Sandbox state shown when sandbox not active | Simplify (nullable or sub-object) | Small |
| P1 | `cdn_url` in direct_uploads response | Build | Small |
| P1 | Account/brand context on responses + `X-Brand-SID` docs | Build | Small |
| P2 | Template spec parity (audit + examples) | Simplify | Medium |
| P3 | Move landing page config off hardcoded constants | Defer | Small/Medium |
| Skip | Mail-merge / batch outreach endpoint | Skip | — |
| Skip | `nitro_switch_account` MCP tool | Skip (use auth/headers) | — |
| Skip | `nitro_upload_image` MCP tool | Skip (no MCP filesystem access) | — |
| Skip | Inline flow step PATCH | Skip (fix Critical A instead) | — |

---

*Written 14 April 2026 after running the full "47 Best Email Designs" launch pipeline via Claude Code across two sessions. Revised 15 April 2026 after Codex review.*

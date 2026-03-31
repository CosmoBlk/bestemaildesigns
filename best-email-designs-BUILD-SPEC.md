# Best Email Designs 2026 — Claude Code Build Spec

**Purpose:** Complete build instructions for Claude Code to execute. Covers: research/curation, Figma file build, landing page, email flow, Twitter assets, influencer outreach.
**Launch:** Tuesday 31 March 2026
**API keys:** All in `.env` in this directory. Load with `dotenv` or equivalent.

## Status Tracker (updated by Claude Code)

**Last updated:** 2026-03-30

| Phase | Status | Notes |
|-------|--------|-------|
| 1. Research & Curate | DONE - REVIEW | 55 emails curated from 254 candidates. curated-emails.json + curated-emails.md ready for George review. |
| 2. Figma File | NOT STARTED | Blocked on George review of Phase 1 |
| 3. Landing Page | NOT STARTED | |
| 4. Nitrosend Email Flow | NOT STARTED | |
| 5. Twitter/X Assets | NOT STARTED | Blocked on screenshots |
| 6. Influencer Outreach | NOT STARTED | |
| 7. OG Image & Assets | NOT STARTED | Blocked on screenshots |

**To resume:** Run `let's continue the best-email-designs build` and Claude will read this spec + memory file to pick up where it left off. Check research-*.json files for completed research, curated-emails.json for final curation.

---

## Phase 1: Research & Curate 50+ Email Designs

### Goal
Deep-scour the web for the 50+ best, most beautiful, most different, highest-converting email designs. Not generic templates. The actual emails that make you stop scrolling.

### What "Good" Means
- **Beautiful:** Visually striking. Strong typography, bold colour, creative layout, unexpected elements.
- **Different:** Not the standard 600px-wide, logo-header, text-block, CTA-button template. Emails that break conventions.
- **Non-generic:** Personality, voice, point of view. No "Hi [First Name], we've got exciting news!" garbage.
- **High-converting:** Where data exists, prioritise emails with proven revenue/engagement results.

### Sources (scour ALL of these)

**Primary — email galleries:**
1. https://reallygoodemails.com — largest collection. Use Firecrawl or Jina to scrape the most popular/highest-rated emails. Filter recent (2024-2026).
2. https://www.emailinspire.com/emails — curated, high quality.
3. https://www.emaildesigninspiration.com — additional gallery.

**Secondary — community/discussion:**
4. Reddit: search r/emailmarketing, r/design, r/web_design for "best email design", "email inspiration", "beautiful email" threads. Use Serper API.
5. Twitter/X: search for viral email design posts, "best email I've received" threads. Use Serper API.
6. Shopify community forums: ecommerce email examples with revenue data.

**Tertiary — awards & case studies:**
7. Litmus showcase / Email on Acid showcase — award-winning emails.
8. Google: "[brand] email case study conversion rate" — for revenue data.
9. Dribbble/Behance: email design projects.
10. Search "email design awards 2025 2026", "best email campaigns", "DMA email awards".

### Research Tools & API Usage

```
Firecrawl (FIRECRAWL_API_KEY):
- Scrape reallygoodemails.com gallery pages
- Scrape emailinspire.com galleries
- Extract email screenshots and metadata

Jina (JINA_API_KEY):
- Reader API for extracting clean content from pages
- Use for Reddit threads, blog posts, case studies

Serper (SERPER_API_KEY):
- Google search for "best email designs 2025 2026"
- Google search for specific brand email case studies
- Google search for Reddit/Twitter discussions about email design

Tavily (TAVILY_API_KEY):
- Deep research queries about email conversion data
- Finding case studies with revenue numbers
```

### Categories & Target Count

| Category | Target | Description |
|----------|--------|-------------|
| Welcome & Onboarding | 8-10 | First impressions, multi-step sequences |
| Product Launches | 6-8 | Announcements, feature releases, drops |
| Newsletters | 8-10 | Content-driven, editorial, digest formats |
| Cart Abandonment & Win-Back | 5-7 | Recovery, re-engagement, FOMO |
| Transactional | 5-7 | Receipts, confirmations, shipping that feel premium |
| Promotional & Sales | 6-8 | Offers, BFCM, seasonal, flash sales |
| Brand & Storytelling | 5-7 | Narrative, loyalty, community, founder letters |
| **Total** | **50-57** | |

### Output Format

Create a JSON file: `curated-emails.json`

```json
[
  {
    "id": 1,
    "brand": "Linear",
    "email_type": "Product Launch",
    "category": "Product Launches",
    "subject_line": "Linear 2024: The new standard",
    "title": "Linear — Product Launch Announcement",
    "screenshot_url": "https://reallygoodemails.com/...",
    "source_url": "https://reallygoodemails.com/emails/linear-2024",
    "why_special": "Dark theme with brutalist typography. Single-column layout that reads like a manifesto, not a marketing email. The gradient CTA button is the only colour on the page. Minimal, confident, zero fluff.",
    "what_to_steal": "Single-colour CTA against monochrome background. Manifesto-style copy instead of feature bullets. Let whitespace do the heavy lifting.",
    "conversion_data": null,
    "year": 2024,
    "tags": ["dark-mode", "typography", "minimalist", "saas"]
  }
]
```

Also create a human-readable markdown: `curated-emails.md` with all entries organised by category, for George to review.

### Screenshot Capture

For each curated email, we need a high-quality screenshot. Strategy:

1. **If available on reallygoodemails.com or emailinspire.com:** Extract the existing screenshot URL from the gallery page.
2. **If only available as a live webpage:** Use Jina's screenshot capability or note the URL for manual capture.
3. **Save all screenshots locally** to `screenshots/` directory, named `{id}-{brand-slug}.png`.
4. **Target resolution:** At least 600px wide. Full-length email capture preferred.

---

## Phase 2: Build the Figma File

### Figma File Details
- **File key:** `R0TGDVXqjQNIdVI4DxCbKM` (from .env: FIGMA_FILE_KEY)
- **Team key:** `team::1573590448862687876` (from .env: FIGMA_TEAM_KEY)
- **MCP tool:** `mcp__84391623-0c33-44d5-a515-33a38dc4b079__use_figma`

### Layout (follow Marko Ilic's structure closely)

**Page 1: "Thanks!" / Cover Page**
- Dark background (#1a1a1a)
- Title: "50+ Best Email Designs of 2026"
- Subtitle: "Curated by George Hartley"
- Branding block: "Made by George" with links to X (@gthartley) and LinkedIn
- CTA: "Need AI-powered email? nitrosend.com"
- Nitrosend logo/wordmark

**Page 2: Main Collection**
- Category headers across the top as section labels (like Marko's Hero / Features / Social Proof / etc.)
- Our categories: Welcome & Onboarding | Product Launches | Newsletters | Cart & Win-Back | Transactional | Promotional | Brand & Storytelling
- Under each category: vertical stack of email cards
- Each card: screenshot (left) + description panel (right)

**Email Card Structure:**
```
┌─────────────────────────────────────────────────┐
│ Brand Name                          Description │
│ ┌───────────────────────┐                       │
│ │                       │  [Description text]   │
│ │   Email Screenshot    │                       │
│ │   (600px wide)        │  Why it's special.    │
│ │                       │  What to steal.       │
│ │                       │                       │
│ └───────────────────────┘                       │
│            ⊕ OPEN LINK                          │
└─────────────────────────────────────────────────┘
```

- Card background: dark grey (#2a2a2a)
- Text: white (#ffffff) for brand name, light grey (#b0b0b0) for description
- "OPEN LINK" button: links to original source
- Card width: ~1000px total (600px screenshot + 400px description)
- Spacing between cards: 24px

**Page 3: Final CTA Page**
- "Want AI to build emails this good?"
- "Try nitrosend — the email platform for builders."
- nitrosend.com
- "Set up your entire email stack in minutes. No dashboard."
- MCP install command: `claude mcp add nitrosend -- npx -y @nitrosend/mcp`

### Figma Build Process (via Plugin API)

The Figma MCP `use_figma` tool executes JavaScript with access to the `figma` global. Build the file in stages:

**Stage 1: Set up pages and global styles**
```javascript
// Create pages
// Set up colour variables
// Define text styles
```

**Stage 2: Build cover page**
```javascript
// Dark background frame
// Title text
// Branding block
// CTA link
```

**Stage 3: Build category headers**
```javascript
// Create top-level frame with auto-layout
// Add category label frames
```

**Stage 4: Build email cards (loop through curated-emails.json)**
```javascript
// For each email:
//   1. Create card frame (auto-layout, dark bg)
//   2. Add screenshot image (figma.createImage from URL, or placeholder rectangle)
//   3. Add brand name text
//   4. Add description text
//   5. Add "OPEN LINK" element with hyperlink
//   6. Place in correct category column
```

**Stage 5: Build final CTA page**

**Stage 6: Add images**
```javascript
// For each email, fetch screenshot and add to card:
// const imageBytes = await fetch(url).then(r => r.arrayBuffer());
// const image = figma.createImage(new Uint8Array(imageBytes));
// rectangle.fills = [{ type: 'IMAGE', imageHash: image.hash, scaleMode: 'FIT' }];
```

**NOTE:** If image fetching fails due to CORS, create placeholder rectangles (600x800, #3a3a3a) with the source URL as the frame name. George can drag-drop images manually for any that fail.

---

## Phase 3: Landing Page — nitrosend.com/best-email-designs

### Page Spec

George deploys this on nitrosend.com. Claude Code should output a complete, self-contained HTML file (or React/Astro component if the site uses those frameworks).

**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  The 50+ Best Email Designs of 2026                         │
│  Curated by someone who's sent 10 billion.                  │
│                                                              │
│  [Preview grid: 2x3 thumbnails of best designs]             │
│                                                              │
│  [GIF/Video embed: rapid-fire flash of all 50+ designs]     │
│                                                              │
│  World-leading brands. Highest-converting campaigns.         │
│  Notes on what makes each one special and what to steal.     │
│  Give the link to your AI and level up every email you send. │
│                                                              │
│  ┌──────────────────────────────────────────────┐           │
│  │  [your@email.com]  [Get the collection free] │           │
│  └──────────────────────────────────────────────┘           │
│                                                              │
│  Curated by George Hartley                                   │
│  Creator of the Email Marketing Bible (908 sources,          │
│  44 experts). Previously: SmartrMail (12K customers,         │
│  10B emails, acquired 2022).                                 │
│                                                              │
│  ─────────────────────────────────────────────               │
│  Powered by nitrosend · Faster email for builders            │
│  nitrosend.com                                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Design:**
- Match nitrosend.com design language (light/warm cream background, orange accent, monospace "Nitrosend." branding)
- Clean, fast, mobile-optimised
- Email form: single field + button
- Orange accent on button (match nitrosend brand)
- Pulsing orange dot (●) on CTA

**Email Form Backend:**
- POST to nitrosend API (use NITROSEND_API_KEY_GEORGE from .env)
- Create contact in george@nitrosend.com account
- Trigger automated flow: send email with Figma link
- Success state: replace form with "Check your email — the collection is on its way."

**Open Graph / SEO:**
- Title: "50+ Best Email Designs of 2026 — Free Collection"
- Description: "Curated by George Hartley (SmartrMail, 10B emails). The most beautiful, highest-converting email designs of 2026. Free Figma file."
- OG Image: preview grid of best designs (create as a 1200x630 image)

---

## Phase 4: Nitrosend Email Flow (Dogfooding)

### Automated Welcome Email

When someone enters their email on the landing page, nitrosend sends:

**From:** george@nitrosend.com
**Subject:** Your email design collection

```
Hey,

Here's the collection: [Figma link]

50+ of the best email designs of 2026. Welcome sequences, product launches, newsletters, transactional, everything. Each one has notes on why it works and what to steal.

I curated this from a decade of building email tools (SmartrMail, 12K customers, 10B emails sent). these are the emails I'd study if I were starting from scratch.

If you want your AI to actually produce emails this good, try nitrosend. It's an email platform you control entirely from Claude, Cursor, or ChatGPT. We're in beta: nitrosend.com

Cheers,
George
```

**Setup via nitrosend MCP tools:**
- Use `nitro_compose_email` to create the email template
- Use `nitro_compose_flow` to create the automation (new contact → send email)
- Use `nitro_manage_audience` to set up the contact list/tag for this collection

---

## Phase 5: Twitter/X Assets

### The GIF

Create a rapid-fire GIF of the email screenshots. Format:
- 15-20 of the best screenshots
- 0.3 seconds per frame
- Dark background between frames (quick flash effect)
- Resolution: 1200x675 (Twitter optimal)
- File size: under 15MB (Twitter limit)

**Tools:** Use the Chrome MCP `gif_creator` tool if available, or create via Python (PIL/Pillow):

```python
from PIL import Image
import glob

# Load screenshots, resize to consistent width
# Create GIF with 300ms frame duration
# Save as best-email-designs-2026.gif
```

### The Twitter Post

```
Give this to your AI to completely level up your email designs.

I curated the 50+ best email designs of 2026. World-leading brands. Highest-converting campaigns. Personally selected.

I've been doing email for a decade. My companies have sent over 10 billion emails. it doesn't have to be boring. In fact it should be the opposite.

Giving it away 100% free. Like + reply "email" and I'll send you the link.

[Attach: GIF]
```

Tag @nitrosendx in a reply or thread.

### DM Template (for replying to commenters)

```
Hey! Here it is:

nitrosend.com/best-email-designs

Enter your email and you'll get the Figma file with all 50+ designs + notes instantly.

Cheers
```

---

## Phase 6: Influencer Amplification

### Budget: $1,000

### Track 1: Direct DM Outreach ($500)

**Target:** 50 influencers on Twitter/X in these niches:
- AI builders / vibe coders (5-50K followers)
- Design inspiration accounts
- Startup/indie hacker accounts
- Email marketing accounts
- "Building with Claude" / "Building with Cursor" accounts

**Use Serper API** to find influencer accounts:
- Search: "site:x.com AI builder" + follower ranges
- Search: "site:x.com vibe coding"
- Search: "site:x.com email design inspiration"

**Use Apollo API** to enrich if needed (find their other contact details).

**DM Template (Higgsfield style, from @gthartley):**

```
Hey [name] — I just put together a free curated collection of the 50+ best email designs of 2026. Screenshots, notes on why each works, organised by category in Figma.

Posting it tomorrow. I think it'd resonate with your audience.

Would you be open to reposting? Happy to pay $[50/100] for a repost. The collection is genuinely useful, not a product pitch.

Here's a preview: [landing page URL or screenshot]

Let me know.
```

**Output:** Create `influencer-targets.json`:
```json
[
  {
    "handle": "@example",
    "name": "Name",
    "followers": 15000,
    "niche": "AI builder",
    "rate_offer": 50,
    "dm_draft": "Hey...",
    "status": "pending"
  }
]
```

### Track 2: Whop Marketplace ($500)

**Whop listing draft:**

Title: Looking for 10 influencers to repost a free email design collection

```
I curated the 50+ best email designs of 2026 in a free Figma file. Screenshots, notes on what makes each special, organised by category.

Looking for influencers (5K-50K followers) in AI, design, startup, or marketing niches to repost when it launches tomorrow.

$50-100 per repost depending on audience size.

The collection is genuinely useful, not a product pitch. It's a free resource with no strings attached.

DM me with your handle and follower count if interested.
```

---

## Phase 7: OG Image & Preview Assets

Create shareable preview images:

1. **OG Image (1200x630):** Grid of 6 best email screenshots with overlay text "50+ Best Email Designs 2026 — Free"
2. **Twitter card image (1200x675):** Same as OG but optimised for Twitter
3. **Instagram-ready square (1080x1080):** Grid layout for potential IG sharing

Use Python + PIL/Pillow to composite these from the downloaded screenshots.

---

## Execution Order for Claude Code

```
1. RESEARCH (parallel agents if possible)
   ├── Scrape reallygoodemails.com (Firecrawl)
   ├── Scrape emailinspire.com (Firecrawl)
   ├── Search Reddit/Twitter/Google for best email designs (Serper)
   ├── Search for email design case studies with conversion data (Tavily)
   └── Search for award-winning emails (Serper)

2. CURATE
   ├── Compile all results into master list (60-70 candidates)
   ├── Score and rank by: beauty, uniqueness, conversion data, brand quality
   ├── Select top 50-57 across all categories
   ├── Write "why it's special" and "what to steal" for each
   └── Output: curated-emails.json + curated-emails.md

3. SCREENSHOT CAPTURE
   ├── Download/extract screenshot for each curated email
   ├── Save to screenshots/ directory
   └── Note any that need manual capture

4. BUILD FIGMA FILE
   ├── Set up pages, styles, colour variables
   ├── Build cover page with branding
   ├── Build category columns
   ├── Loop through curated-emails.json: create cards with screenshots + text
   ├── Build final CTA page
   └── Verify layout and test

5. CREATE ASSETS
   ├── Generate GIF from top 15-20 screenshots
   ├── Generate OG image (1200x630)
   └── Generate Twitter card image

6. BUILD LANDING PAGE
   ├── Create HTML/component for nitrosend.com/best-email-designs
   ├── Email capture form → nitrosend API
   └── Success state

7. SET UP NITROSEND FLOW
   ├── Create email template (delivery email with Figma link)
   ├── Create automation flow (new contact → send email)
   └── Test end-to-end

8. INFLUENCER OUTREACH
   ├── Research 50 target influencers (Serper + manual)
   ├── Draft personalised DMs for each
   ├── Output: influencer-targets.json
   └── Draft Whop listing

9. GEORGE REVIEW
   ├── Review curated-emails.md (add/remove emails)
   ├── Review Figma file (visual check)
   ├── Review landing page (deploy)
   ├── Review Twitter post + DM templates
   ├── Review influencer targets + DMs
   └── Test full funnel: comment → DM → landing page → email → Figma
```

---

## File Structure

```
nitrosend/
├── .env                              # All API keys
├── 50-beta-users-week-plan.md        # Main marketing plan
├── best-email-designs-2026-plan.md   # Strategic plan (this project)
├── best-email-designs-BUILD-SPEC.md  # THIS FILE — build instructions
├── curated-emails.json               # Research output: all 50+ emails with metadata
├── curated-emails.md                 # Human-readable curation for George to review
├── influencer-targets.json           # 50 influencer DM targets
├── screenshots/                      # Downloaded email screenshots
│   ├── 001-linear-product-launch.png
│   ├── 002-stripe-receipt.png
│   └── ...
├── assets/
│   ├── best-email-designs-2026.gif   # Twitter GIF
│   ├── og-image.png                  # 1200x630 OG image
│   └── twitter-card.png              # 1200x675 Twitter card
├── landing-page/
│   └── best-email-designs.html       # Landing page (or .astro/.jsx)
└── scripts/
    ├── scrape-emails.py              # Research scraper
    ├── create-gif.py                 # GIF generator
    └── create-og-image.py            # OG image generator
```

---

## Key References

- **Marko Ilic's collection (the model):** https://www.figma.com/design/Csy8f4SgANoEZ9bGAlPWUg/50--SaaS-Website-Inspiration
- **Marko's Gumroad page:** https://seedesign.gumroad.com/l/websiteinspiration
- **Marko's tweet:** https://x.com/markoilico/status/2037938029462270387
- **Really Good Emails:** https://reallygoodemails.com
- **Email Inspire:** https://www.emailinspire.com/emails
- **Figma file to build in:** Key `R0TGDVXqjQNIdVI4DxCbKM`
- **Nitrosend API (george@):** NITROSEND_API_KEY_GEORGE in .env
- **George's X:** @gthartley
- **Nitrosend X:** @nitrosendx

---

*This spec is designed for Claude Code to pick up and execute top-to-bottom. Start with Phase 1 (research) and work through sequentially. The research is the bottleneck — everything else builds from the curated-emails.json output.*

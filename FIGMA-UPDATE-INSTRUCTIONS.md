# Figma file updates (George to apply)

The Figma community file at `https://www.figma.com/community/file/1626130771879679378` still shows older counts on the cover + title. This needs a manual pass before launch because Figma can't be reliably edited by an agent.

## Source file
`https://www.figma.com/design/R0TGDVXqjQNIdVI4DxCbKM/Nitrosend?node-id=99-3`

## What needs to change

### 1. File title in Figma + community listing
**Current:** "50+ Best Email Designs of 2026"
**Change to:** "47 Best Email Designs of 2026"

Where to edit:
- Top-left of the editor, rename the file tab
- When republishing to community, update the publish title to match

### 2. Cover frame
The current cover still reads "57 Best Email Designs". Change the big headline number to **47**.

Optional: if you want to swap the cover art to match what we ship in the flow email and landing page, the canonical cropped asset is at:
`/Users/georgehartley/nitrosend/Best Email Designs/assets/47-best-email-designs-cover-cropped.jpg`

It's already in the `bestemaildesigns` GitHub repo at `main/assets/47-best-email-designs-cover-cropped.jpg` and served live at `https://raw.githubusercontent.com/CosmoBlk/bestemaildesigns/main/assets/47-best-email-designs-cover-cropped.jpg`.

### 3. Category counts inside the file (if any appear on section dividers)
Canonical breakdown (total 47):
- Welcome and Onboarding: 7
- Product Launches: 6
- Newsletters: 6
- Cart and Win-Back: 6
- Transactional: 2
- Promotional and Sales: 9
- Brand and Storytelling: 11

### 4. Republish
After edits, use the "Publish update" flow in the community panel so the public file reflects the new title + cover. The share URL (`/community/file/1626130771879679378`) stays the same, so every link already in the flow email and landing page keeps working.

## What is already correct everywhere else
- Flow email (Template 233) rendering "47" + NitroWheel sub-headline + cropped cover + 7/6/6/6/2/9/11 table. Verified live, Flow 134 fires on list 45 adds, delivery confirmed at georgehartley+9192@gmail.com.
- Landing page `nitrosend.com/best-email-designs` showing 47 everywhere, new Figma cover section between hero and "problem", Lucy Folk/MONA/Pangaia/Aesop preview gallery. Deployed via Vercel on commit 90e388b.
- `design.md` title updated to "47 Best Email Designs of 2026". Committed 243588b on the bestemaildesigns repo.

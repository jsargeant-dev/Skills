---
name: wm-proposal-writer
description: Convert proposal source materials into West Monroe-branded landing page copy that fits the proposal HTML template without editing the HTML. Use when the user provides proposal copy, PDFs, DOCX, PPTX, TXT, CSV, or XLSX files and wants a final .txt output shaped to the West Monroe proposal landing page sections and judged against the proposal and pitch narrative rubric.
---

# WM Proposal Writer

Use this skill when the goal is to turn source material into copy for the West Monroe proposal landing page template.

## Core rules

- Never edit the source HTML template.
- Use the HTML only as a structural guide.
- Keep existing div, nav, class, id, and section naming unchanged.
- Section headlines and visible card titles may be rewritten to match the copy.
- Final deliverable must be a `.txt` file.
- Write in West Monroe voice: direct, practical, collaborative, outcome-led.
- Do not use em dashes.
- Do not sound like generic consulting marketing.
- Start with the point in every major section.
- If the source lacks proof, quantify only what is explicitly supported.
- Keep all output inside the current thread folder.

## Inputs this skill supports

- `.txt`, `.md`, `.csv`
- `.pdf`
- `.docx`
- `.pptx`
- `.xlsx`, `.xlsm`

Notes:

- Use `scripts/extract_source_text.py` first when files need text extraction.
- Legacy binary Office files such as `.doc`, `.xls`, and `.ppt` are not reliably supported by the script. If those appear, ask for converted `.docx`, `.xlsx`, or `.pptx` versions only if needed.

## Required workflow

1. Extract source text from every provided file.
2. Read the landing page notes and section structure before drafting.
3. Distill the client situation:
   - client goals
   - current issues
   - stakes and urgency
   - why now
   - relevant West Monroe differentiators
   - proof points, case studies, statistics, testimonials, and team details
   - pricing and assumptions
4. Rewrite everything into West Monroe voice using the references in `references/`.
5. Shape the narrative to the rubric arc:
   - Client Problem
   - Insight
   - Stakes
   - Solution
   - Why West Monroe
   - Proof
6. Fill the output scaffold in `assets/wm-proposal-output-template.txt`.
7. Self-review against all seven rubric categories in `references/proposal-rubric.md`.
8. Revise weak sections before finalizing.
9. Save the finished copy as a `.txt` file in the current thread folder.

## Section mapping

Use the HTML comments and template structure summarized in `references/html-section-map.md`.

Important structure constraints:

- `hero`: 1 headline, 1 executive summary paragraph
- `perspective`: 1 section headline and 1 section body
- `issues`: 1 section headline and 1 section body
- `why-west-monroe`: 1 section headline and 1 section body
- `value`: 1 section headline and 1 value card with eyebrow, title, body, and 1 stat
- `approach`: 1 section headline, 1 section body, and 3 step cards
- `timeline`: 1 section headline, 1 section body, and 4 phases
- `team`: 1 section headline, 1 section body, and 6 team cards
- `related-articles`: 1 section headline, 1 intro body, and 4 article rows
- `case-studies`: 1 section headline and 1 case study card with title, body, and 2 stats
- `testimonials`: 1 section headline, 1 intro body, and 4 testimonial cards
- `pricing`: 1 section headline, eyebrow, price, body, plus any client-specific pricing assumptions or scope notes

Use updated visible headlines when they improve clarity or better match the proposal narrative. Do not change the underlying section keys, nav anchors, div structure, or HTML IDs that those sections map to.

If the source material does not support every slot:

- Fill the most important slots first.
- Leave unsupported slots as `TBD` rather than inventing facts.
- Do not duplicate the same proof point across sections unless necessary.

## Writing guidance

- Lead each section with the clearest takeaway.
- Prefer short sentences.
- Use active voice.
- Use inclusive “we” when partnership is real and helpful.
- Explain why the issue matters to the client, not just what West Monroe does.
- Make differentiation specific to the engagement.
- Keep credibility proof close to the claim it supports.
- For senior audiences, simplify methodology language.

## Rubric gate

Before finalizing, check each category and revise until the draft is at least “strong” in all seven:

- Strategic clarity
- Audience alignment
- Compelling case for change
- Differentiation and positioning
- Logical flow and narrative arc
- Proof and credibility
- Executive presence

If a category is weak, revise the copy. Do not output the first pass.

## Output rules

- Use the exact field labels from `assets/wm-proposal-output-template.txt`.
- Preserve field order.
- Keep plain text only.
- Fill both structural content fields and any visible headline/title fields included in the scaffold.
- Do not wrap the final deliverable in markdown unless the user asks.
- Save the final file with a descriptive name such as `wm-proposal-copy.txt`.

## Recommended command

To extract source files into plain text:

```bash
python3 /Users/jsargeant/Desktop/Landing\ Page\ Creation/thread-20260414-133943-wm-proposal-skill/wm-proposal-copy-skill/scripts/extract_source_text.py <file1> <file2> ... --output-dir ./extracted
```

Run that command from the workspace root or the current thread folder, not from inside the skill folder itself.

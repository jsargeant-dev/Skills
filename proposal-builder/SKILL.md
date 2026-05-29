---
name: proposal-builder
description: Update the West Monroe HTML proposal template with new approved copy. Use when the user provides draft or final copy and wants the HTML file updated to fit the template's section comments, content slots, repeated card modules, and carousel behavior.
---

# Proposal Builder

Use this skill when the goal is to take provided copy and apply it directly to the HTML proposal template.

## Core rules

- Work only inside the current thread folder.
- Never edit files from a different thread.
- Use the bundled template in `assets/template/` as the starting point for every new implementation.
- Treat the HTML comments as the source of truth for what each section is supposed to say.
- Update the live HTML to match the provided copy rather than producing a separate copy deck unless the user asks for one.
- Preserve the existing visual system unless the copy forces a layout-safe adjustment.
- Do not invent facts, proof points, client names, statistics, or testimonials.

## Required inputs

- A copy source such as `.txt`, `.md`, `.docx`, `.pdf`, pasted text, or structured notes
- The bundled template files in `assets/template/`:
  - `assets/template/index.html`
  - `assets/template/script.js`
  - `assets/template/styles.css`
  - `assets/template/assets/`

## Bundled template

This skill includes a full starter template so it can be installed and used without relying on the original source folder.

Bundled files:

- `assets/template/index.html`
- `assets/template/script.js`
- `assets/template/styles.css`
- `assets/template/assets/` with all referenced images and SVGs

When starting a new page build:

1. Copy the bundled template files into the current thread workspace.
2. Make all content edits in the copied thread-local files.
3. Leave the bundled template unchanged so it remains a clean starter.

Recommended thread-local starting structure:

- `index.html`
- `script.js`
- `styles.css`
- `assets/`

## Workflow

1. Copy `assets/template/index.html`, `script.js`, `styles.css`, and `assets/` into the current thread folder if they are not already there.
2. Read the copied template HTML comments before writing anything.
3. Identify every section and determine whether the provided copy supports it.
4. Map copy into the closest matching section based on intent, not just heading names.
5. Rewrite lightly when needed so the copy fits the structure, tone, and length of the module.
6. Remove unsupported sections from the final design instead of leaving filler or placeholder text.
7. Check repeated-card modules for visual balance and normalize copy length across cards.
8. Check both carousel modules and simplify them if they only have one item.
9. Review the final HTML for empty placeholders, broken navigation targets, and orphaned controls.

## Section guidance

Use the HTML comments in `index.html` to guide section purpose. For this template, the main sections are:

- `hero`: headline plus short executive framing paragraph
- `perspective`: point of view paragraph plus 3 supporting cards
- `issues`: challenge framing paragraph plus 4 issue cards
- `why-west-monroe`: partner rationale, featured value statement, and 4 value points
- `value`: value carousel with 1 stat per slide
- `approach`: overview paragraph plus 3 approach cards
- `timeline`: overview paragraph plus 4 phases
- `team`: overview paragraph plus 6 team cards
- `related-articles`: intro plus supporting article rows
- `case-studies`: case study carousel with 2 stats per slide
- `testimonials`: intro plus testimonial cards
- `pricing`: pricing summary plus supporting terms copy

## Fitting copy to the template

- If copy is too long for a slot, compress it while preserving meaning and proof.
- If copy is too short, redistribute the strongest ideas so the module still feels complete.
- Prefer concise, client-ready language over verbatim source text.
- Keep section headlines and card headlines tight.
- Preserve parallel structure across sibling cards when possible.

## Repeated-card rules

These modules must feel uniform across all visible cards:

- `perspective`
- `issues`
- `approach`
- `team`
- `testimonials`

For these modules:

- Keep the number of visible cards aligned to the grid the template expects unless removing the whole section.
- Make card headline length roughly comparable across the set.
- Make body copy length roughly comparable across the set.
- Shorten longer cards and expand shorter cards only with supported material so all cards feel even.
- If there is not enough valid copy to support the full module, remove the entire section instead of mixing strong cards with placeholders.

## Section removal rules

Remove a module entirely when the provided copy does not support that section.

When removing a section:

- Delete the whole `<section>` block from `index.html`.
- Remove or update any navigation link that points to that section.
- Remove related JavaScript only if it targets elements that no longer exist.
- Keep the remaining page structure clean and valid.

Do not leave:

- lorem ipsum
- `TBD`
- empty cards
- dead buttons
- broken anchors

## Carousel rules

This template has 2 carousel-style modules:

- `value`
- `case-studies`

If a carousel has only 1 item:

- Remove the left and right arrow buttons.
- Remove the `carousel-dots` container.
- Simplify `script.js` so it does not bind listeners or expect multiple slides for that module.

If a carousel has 2 or more items:

- Keep controls and dots.
- Make sure the slide data in `script.js` matches the final copy exactly.
- Keep stat labels concise and visually balanced across slides.

## Timeline rules

- Keep 4 phases only if the source supports a real 4-part sequence.
- If the copy supports fewer phases and the user has not asked to preserve 4, reduce the phase count and update both HTML and `script.js`.
- Make phase labels, summary copy, and deliverables feel parallel across phases.

## Team and testimonial rules

- Keep bios and quotes similar in length across the row.
- Remove personal links if none are available or appropriate.
- Use real attribution only when provided or clearly supported by the source.

## Editing boundaries

- Prefer editing `index.html` first.
- Edit `script.js` whenever carousel data, timeline data, or interactive controls change.
- Edit `styles.css` only for minor support changes caused by content fit.
- Do not edit files inside `assets/template/` during normal page work.
- Do not redesign the page unless the user asks.

## Final checks

Before finishing:

- Confirm every visible section has real copy.
- Confirm removed sections are gone from both content and navigation.
- Confirm repeated-card modules read evenly.
- Confirm single-item carousels no longer show arrows or dots.
- Confirm there are no references in `script.js` to deleted DOM nodes.
- Confirm the page still reads as one coherent story from top to bottom.

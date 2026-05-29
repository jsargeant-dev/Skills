---
name: create_wm_proposal
description: Run West Monroe proposal source material through copy generation, export a Word document, update the HTML template, refresh visual assets, and deliver a single-file proposal HTML.
---

# Create WM Proposal

## Purpose

This skill combines `wm-proposal-writer` and `proposal-builder` into one staged workflow for West Monroe proposal landing page production.

The workflow must turn source material into proposal copy, convert that copy into a reviewable Word document, update the HTML page, refresh supporting visual assets, and finish with exactly two final deliverables in the active thread folder:

- one `.docx` file containing the full proposal copy
- one single-file inlined HTML file named `proposal_<client-name>.html`

## Source skills used

- `wm-proposal-writer`
- `proposal-builder`

## Core operating rules

- Work only inside the current thread folder.
- Never edit files from a different thread.
- Create a new thread folder for each new run using the required workspace naming convention.
- Keep all intermediate and final files inside the active thread folder.
- The final folder state must contain exactly two files.
- Do not invent client facts, proof points, statistics, logos, testimonials, or imagery context.
- Preserve West Monroe voice in copy generation.
- Treat the HTML template comments as the source of truth for section intent.
- Dot-grids and whiteboards never get replaced or edited.

## Required workflow

### Phase 1: Run the combined skill

1. Start the skill in a new thread folder.
2. Ask the user for the client URL.
3. Gather all user-provided content and source files.
4. Confirm that all work products will be created only in the active thread folder.

### Phase 2: Generate proposal copy

1. Run the full `wm-proposal-writer` workflow on all provided content.
2. Extract text from supported source files as needed.
3. Rewrite the content into West Monroe proposal landing page copy.
4. Save the canonical draft as a temporary thread-local `.txt` file for downstream processing only.
5. Use a descriptive filename such as `wm-proposal-copy.txt`.
6. Treat the `.txt` file as a temporary working artifact only, never as a final deliverable.

## Phase 3: Convert copy to Word format

1. Immediately after the writing skill completes, convert the generated copy into a Word document.
2. Save the Word document in the current thread folder.
3. Save it as `wm-proposal-copy-review.docx`.
4. The `.docx` must contain the full proposal copy and remain in the folder as a final deliverable.

## Phase 4: Run HTML update

Once the copy and client URL are available:

1. Run the full `proposal-builder` workflow.
2. Use the generated copy as the copy source for HTML updates.
3. Copy the bundled HTML template into the current thread folder if not already present.
4. Update the template content using the generated copy.

## Phase 5: Pull client logo

1. Use the provided client URL to locate the client logo from the client website.
2. Save the selected logo asset into the current thread folder only as a temporary working asset until it is inlined into the final HTML.
3. Use the best available version that is clean, legible, and appropriate for the page.
4. Do not fabricate or redraw the logo.
5. If the logo cannot be found, ask the user to upload the client's logo file.

## Phase 6: Review and refresh visual assets

After the HTML content is updated, review all final visual assets in the HTML:

- icons
- photos
- logo

Asset review rules:

- Dot-grids never get touched.
- Whiteboards never get touched.
- Review whether each icon or photo matches the industry of the client
- Review whether each icon matches the meaning of the section where it appears.
- Review whether each photo supports the tone and content of the page.
- If an icon or photo is not a good fit, replace it using the approved asset libraries.

Approved asset libraries:

- `assets/icons/`
- `assets/photos/`

These asset libraries must be bundled with the skill package and distributed alongside this markdown file.

When replacing assets:

- Choose assets that better match the page content.
- Keep replacements visually consistent with the existing template.
- Use the bundled skill-local asset folders during the asset review step.
- Do not replace assets that already fit well.

## Phase 7: Update HTML asset references

1. Update the HTML to use the selected replacement icons, photos, and client logo.
2. Update CSS or JS only where required to support those asset changes.
3. Keep the visual system intact unless a minor adjustment is required for fit.

## Phase 8: Inline final deliverable

Before final delivery:

1. Inline all CSS into the HTML.
2. Inline all JavaScript into the HTML.
3. Inline all final image and graphic assets into the HTML so the output becomes a single-file deliverable.
4. Confirm the page still works after inlining.
5. Remove every temporary working file that is no longer needed after the final HTML is created, including the thread-local `.txt` copy file, copied template files, and any standalone downloaded or replacement asset files.
6. Verify that only the final `.docx` and final inlined `.html` remain in the thread folder.

Goal:

- final output must be one single HTML file

## Phase 9: Rename final file

Rename the final single-file HTML deliverable using this pattern:

- `proposal_<client-name>.html`

Use a clean client-name format suitable for filenames.

## Final deliverables

When the skill is complete, the thread folder must contain only these two files:

- `wm-proposal-copy-review.docx`
- `proposal_<client-name>.html`

Assets are not separate final outputs. All required CSS, JavaScript, logo, icons, and photos must be embedded into the final HTML file.

## Execution gates

It must not:

- begin without asking for the client URL
- fetch the client logo before receiving the client URL
- finalize or rename the HTML before the asset review pass is complete
- leave behind temporary `.txt` files or standalone asset files after the final inlined HTML has been created
- leave behind any third file in the completed thread folder

## Suggested implementation notes

- Treat this as a staged workflow rather than one uninterrupted run.
- Keep a clear handoff between the copy-generation phase and the HTML-update phase.
- Store the generated copy artifact as the canonical source for downstream HTML updates, but treat it as temporary rather than a final deliverable.
- Validate that all visible icons and photos support the section content before finalizing.
- Confirm there are no broken references after CSS, JS, and assets are inlined.
- Final state must be exactly two files in the thread folder: `wm-proposal-copy-review.docx` and `proposal_<client-name>.html`.

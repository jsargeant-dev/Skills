---
name: share
description: Inline linked assets from a built static HTML file into a single self-contained HTML file for easy sharing. Use when Codex needs to package an HTML page, landing page, prototype, export, or static site by embedding local CSS, JavaScript, images, SVGs, fonts, video/audio, and CSS url(...) assets as inline code or data URIs so the result can be sent as one .html file.
---

# Share

## Workflow

Use this skill when the user wants a built HTML page made shareable as one file.

1. Locate the source HTML file and its asset root. If the user points to a folder, prefer `index.html` in that folder.
2. Create the output in the current thread workspace, not beside the user's original unless they explicitly ask.
3. Run `scripts/inline-html-assets.mjs` with the source HTML and output path.
4. Verify that no local `src`, `href`, `srcset`, or CSS `url(...)` references remain unless they are anchors, `data:`, `mailto:`, `tel:`, remote URLs intentionally preserved, or other non-file schemes.
5. Report the output file path and any skipped references.

## Script

Run:

```bash
node /path/to/share/scripts/inline-html-assets.mjs /path/to/index.html /path/to/output-inline.html
```

Useful options:

```bash
--inline-remote-css
```

Fetch and inline remote stylesheet text. Use only when network access is appropriate and the user wants remote CSS folded in.

```bash
--keep-font-links
```

Keep remote font stylesheet links instead of removing them. Use when preserving exact web typography matters more than strict single-file portability.

## Defaults

- Inline local `<link rel="stylesheet">` files into `<style>` blocks.
- Inline local `<script src="...">` files into `<script>` blocks.
- Convert local image, media, font, icon, manifest, and CSS `url(...)` references to data URIs.
- Convert `srcset` candidates individually.
- Preserve page anchors and remote links by default.
- Remove Google Fonts preconnect and stylesheet links by default, because a truly shareable single file should not depend on those remote requests.
- Leave the source folder untouched.

## Validation

After generating the file, run a quiet scan rather than printing data URIs:

```bash
node /path/to/share/scripts/inline-html-assets.mjs /path/to/index.html /path/to/output-inline.html --check-only
```

If the page is visual or client-facing, open or render the generated HTML once when practical to catch broken layout or script errors.

---
name: quickstart-website-pages
description: Create West Monroe branded static website page mockups and lightweight front-end-only landing pages from plain-English goals. Use when a nontechnical user wants help shaping a webpage, campaign page, proposal page, service page, event page, ABM page, microsite concept, or design handoff prototype; ask guided intake questions, recommend page structure and UI direction, draft copy, and build or outline HTML without backend systems.
---

# Quickstart Website Pages

## Purpose

Help nontechnical users turn a rough page idea into a West Monroe branded static webpage or lightweight microsite concept. Guide the user through the goal, audience, page type, content, user action, and visual direction, then create a practical outline, first-pass copy, and optionally a front-end-only HTML mockup for design or web-team handoff.

Default to West Monroe branding unless the user explicitly requests neutral wireframes, client branding, or co-branding.

## Scope

Create front-end-only pages:

- Static landing pages, campaign pages, proposal pages, service pages, event pages, thought leadership pages, ABM account pages, and simple microsites.
- Minimal JavaScript interactions such as accordions, tabs, anchor navigation, modals, carousels, simple filters, and restrained animation.
- Placeholder areas or embeds for third-party forms, scheduling links, PDFs, videos, and HubSpot forms.

Do not build backend applications:

- No databases, authentication, admin panels, payment flows, custom APIs, dashboards with live data, CMS implementation, login portals, or persistent form handling.
- If a user asks for backend behavior, mock it as static states or placeholders and note what a future production team would need.

## Brand Source

Use the West Monroe UX/UI guidelines repository as the default source for brand, assets, and reusable templates:

`https://github.com/jsargeant-dev/west-monroe-ux-ui-guidelines.git`

When implementation requires specific brand details, read `references/west-monroe-brand-source.md`. Prefer existing nav, hero, footer, CTA, and page-section templates from the repository before inventing new layouts.

## Intake Flow

Start with one question:

`What is the goal of this page?`

Then ask only the few follow-up questions needed to proceed. Keep questions plain-language and avoid technical terms. Good follow-ups:

- Who is the page for?
- What should the visitor do next?
- What type of page should this be?
- What should the page feel like?
- What content do you already have?
- Should this use standard West Monroe branding, a campaign variation, or client/co-branded styling?

Ask at most 3-5 questions before making a first recommendation. If the user provides enough context, proceed without asking more.

## Recommended Workflow

1. Summarize the user's goal in plain language.
2. Recommend the best page type and explain why in one short paragraph.
3. Propose a page structure with section names and the job each section performs.
4. Draft first-pass copy in a West Monroe voice: clear, business-focused, practical, and credible.
5. If asked to build, create a static HTML mockup using West Monroe patterns and assets where available.
6. QA the page for responsive layout, text overflow, clear CTAs, placeholder labels, and frontend-only scope.
7. Provide design/web handoff notes that call out placeholder copy, imagery needs, links/forms to connect, and suggested refinements.

## Page Structure Patterns

Use these as starting points, then adapt to the goal:

- Campaign landing page: hero, market moment, audience pain, offer, outcomes, proof, CTA.
- Proposal page: hero, client challenge, proposed approach, workstreams, timeline, team/proof, CTA.
- Event page: hero, why attend, agenda, speakers, details, registration CTA.
- Service page: hero, problem, capabilities, approach, outcomes, proof, CTA.
- Thought leadership page: title/hero, thesis, article body, related insights, author/CTA.
- ABM page: account-specific hero, industry pressure, tailored POV, relevant capabilities, proof, next-step CTA.
- Microsite: concise home page plus 2-4 anchored or separate static sections/pages.

## UI Direction

Translate user intent into design guidance. Recommend choices such as:

- Executive audience: concise copy, strong hierarchy, fewer sections, proof points, advisory CTA.
- Campaign launch: bolder hero, sharper offer, repeated CTA, short conversion path.
- Proposal support: client-specific language, structured workstreams, timeline, team credibility.
- Educational page: editorial rhythm, scannable sections, related resources.

Avoid asking novice users to choose CSS frameworks, grids, breakpoints, or component libraries. Make those decisions based on the brand source and the target artifact.

## HTML Build Rules

When creating HTML:

- Keep the output static and portable.
- Prefer a single self-contained HTML file for quick review unless the user asks for a larger site.
- Use semantic HTML, responsive CSS, accessible button/link states, and stable layout constraints.
- Use restrained JavaScript only when it helps the page concept.
- Mark placeholder content clearly in comments or handoff notes, not as noisy on-page instructional text.
- Include realistic CTAs and navigation labels.
- Avoid generic SaaS styling, decorative gradient blobs, and backend-like UI unless the page concept requires them.

## Handoff Notes

End substantial outputs with concise handoff notes:

- Page goal
- Recommended audience and CTA
- Placeholder content or assets
- Brand/template assumptions
- Design refinements needed
- Web implementation notes, including any HubSpot, form, analytics, or asset hosting needs


# my learning of all the things

A public learning notebook and small Astro blog for the things I learn while programming, debugging, building Linux software, making art, and figuring things out as I go.

**Site:** https://miflow13.github.io/MikasOpenLearningNotebook/

## how it works

The notes live in `src/content/notes/` as Markdown files. Astro turns them into the home page, topic index, note index, and individual article pages.

To add a new note, create a Markdown file with frontmatter like:

```yaml
---
title: "What I learned"
description: "A short summary of the note."
topic: "Software Engineering"
order: 14
featured: false
draft: false
---
```

Then write the note underneath it and push the change. GitHub Actions builds and deploys the site from `main`.

## local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

The visual style intentionally matches my other small sites: plain white background, serif headings, simple links, thin rules, and very little decoration.

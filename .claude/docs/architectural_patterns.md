# Architectural Patterns & Conventions

This document describes the patterns, conventions, and design decisions used in the portfolio website.

## Hand-Crafted, Zero-Framework Architecture

The site is fully custom — no CSS framework, no JS libraries, no build process. The only external dependency is Google Fonts (Space Grotesk + JetBrains Mono). Everything else is hand-written:

- `index.html` — all content and structure
- `css/styles.css` — custom design system (~800 lines)
- `js/scripts.js` — vanilla JS interactions (~200 lines)

**Pattern**: All code in this repo is first-party. There is no "template code" that must be preserved — edit anything freely.

## Design System (CSS)

### Custom Properties

All design tokens live in `:root` at the top of css/styles.css:

- **Colors**: `--bg` (near-black), `--bg-alt`, `--surface`, `--border`, `--text`/`--text-dim`/`--text-faint`, and a single warm amber accent (`--accent: #f5a524`) with soft/glow variants
- **Type**: `--font-body` (Space Grotesk) and `--font-mono` (JetBrains Mono)
- **Layout**: `--container` (1100px), `--radius`, `--nav-height`

**Convention**: Never hardcode colors in rules — always use the custom properties. The accent color is used sparingly: indices, links, hover borders, stats, the primary button.

### Visual Language

- Dark theme throughout; alternating sections use `.section-alt` for subtle contrast
- Monospace (`.mono`) marks "engineer" accents: nav links, section indices (`01.`), terminal prompt, stats, badges, footer
- Section headings use numbered indices plus a horizontal rule via `.section-heading::after`
- Cards (`.post-card`, `.stat`) share the same surface/border/hover-lift treatment

### Responsive Breakpoints

Two breakpoints: `860px` (about grid stacks) and `720px` (mobile nav, tighter timeline). Fluid type via `clamp()` handles everything in between.

### Accessibility

- `prefers-reduced-motion` is respected: kills animations, reveals all content, hides the canvas
- All interactive elements are real `<a>`/`<button>` tags; menu toggle has `aria-expanded`/`aria-controls`
- Decorative elements (canvas, arrows, markers) carry `aria-hidden="true"`

## HTML Structure Patterns

### Section Organization

Each major section follows this pattern:

```html
<section class="section [section-alt]" id="section-name">
    <div class="container">
        <h2 class="section-heading reveal"><span class="section-index mono">0N.</span>Title</h2>
        <p class="section-sub reveal">Optional intro line</p>
        <!-- section content, elements tagged .reveal for scroll animation -->
    </div>
</section>
```

**Convention**:
- Section IDs (`about`, `blog`, `work`, `connect`) match nav anchors — navigation is pure `#anchor` links
- Numbered indices in nav and headings must stay in sync (01–04)
- Add `.reveal` to elements that should fade in on scroll

### Blog Post Cards

Posts live in `#blog` inside `.post-grid`, newest first:

```html
<a class="post-card reveal" href="[url]" target="_blank" rel="noopener">
    <span class="post-meta mono"><span class="post-badge">new</span>medium</span>
    <h3>[title]</h3>
    <span class="post-arrow mono" aria-hidden="true">read &rarr;</span>
</a>
```

**Convention**: Move the `<span class="post-badge">new</span>` to the newest post when adding one. Content itself is hosted on Medium/dev.to — this site only links out.

### Work Timeline

Each role is a `.timeline-entry` with a marker, header (title + `@ company` + mono period), paragraphs, and an optional `.stat-row` of key metrics (`<dl>` of `.stat` blocks). Newest role first.

## JavaScript Patterns

All JS is in one IIFE in js/scripts.js, organized by feature:

1. **Nav** — `.scrolled` class on scroll; mobile menu toggle
2. **Footer year** — auto-updated
3. **Scroll reveal** — IntersectionObserver adds `.visible` to `.reveal` elements (one-shot, then unobserved)
4. **Hero typewriter** — rotates words from the `data-words` JSON attribute on `#rotator`
5. **Hero canvas** — particle constellation; particles glow amber near the cursor; paused via IntersectionObserver when the hero is off-screen; DPR-aware

**Convention**: `reducedMotion` is checked once at the top; every animated feature must bail out (or degrade gracefully) when it's true.

## Icons

Social icons are **inline SVGs** in index.html (no icon font, no CDN). To add one, copy an official brand SVG path into the existing `.social-links` anchor pattern with `fill="currentColor"` and `aria-label`.

## Deployment Patterns

### GitHub Pages Configuration

**CNAME file**: Required for custom domain (ishtiaquezafar.com) — never modify.

- `master` branch is the production branch
- Direct commits to master trigger automatic deployment
- No build/CI process — files are served as-is

## Non-Patterns (Deliberately Not Used)

- **No CSS framework** (Bootstrap was removed in the 2026 redesign) — custom CSS only
- **No CSS preprocessor** (Sass, Less) — pure CSS with custom properties
- **No JavaScript build process** (webpack, Rollup) — vanilla JS served directly
- **No component system** — single HTML file with all content
- **No icon fonts** — inline SVG
- **No testing framework** — manual browser testing only
- **No package manager** (npm, yarn) — only dependency is Google Fonts via CDN

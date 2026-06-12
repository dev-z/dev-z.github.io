# Ishtiaque's Portfolio Website

## What This Project Is

Personal portfolio website hosted on GitHub Pages at ishtiaquezafar.com. Single-page site showcasing professional experience, blog posts, and contact information.

**Repository**: dev-z.github.io
**Live Site**: https://ishtiaquezafar.com (via CNAME:1)
**Hosting**: GitHub Pages

## Tech Stack

- **Frontend**: Pure HTML, CSS, JavaScript — fully hand-crafted, no frameworks, no build process
- **Fonts**: Google Fonts — Space Grotesk (display/body) + JetBrains Mono (accents), the only external dependency
- **Icons**: Inline SVG (no icon fonts or CDNs)
- **Design**: Custom dark theme with amber accent, defined via CSS custom properties in css/styles.css `:root`

## Project Structure

```
/
├── index.html              # Main single-page site with all content
├── css/
│   └── styles.css          # Hand-written design system (~800 lines)
├── js/
│   └── scripts.js          # Vanilla JS: nav, scroll reveal, typewriter, particle canvas
├── assets/
│   ├── favicon.ico         # Site favicon
│   └── img/
│       ├── profile-pic.png # About section image
│       └── work-pic.png    # (currently unused) conference photo
├── CNAME                   # Custom domain configuration
└── README.md               # Project overview
```

## Content Sections

The website (index.html) is organized into these sections:

1. **Nav**: Fixed top bar with numbered anchor links (01–04)
2. **Hero**: Particle-canvas background, terminal prompt, typewriter headline rotator
3. **About** (`#about`): Bio, skill chips, profile photo
4. **Writing** (`#blog`): Card grid of external blog posts, newest first with "new" badge
5. **Work** (`#work`): Timeline of roles (Skyflow, FINN, earlier) with stat cards
6. **Connect** (`#connect`): LinkedIn call-to-action
7. **Footer**: Inline-SVG social links (LinkedIn, Twitter/X, GitHub, Medium)

## Development Workflow

### Local Development

Since this is a static site with no build process:

```bash
# Option 1: Python simple server
python3 -m http.server 8000

# Option 2: Any static file server of your choice
# Then visit http://localhost:8000
```

### Deployment

Deployment is automatic via GitHub Pages:

1. Push changes to `master` branch
2. GitHub Pages automatically serves the updated site
3. Changes appear at ishtiaquezafar.com within minutes

**Important**: The `master` branch is the main/production branch.

## Making Changes

### Content Updates

All content is in `index.html`:

- **Adding a blog post**: Copy an existing `.post-card` anchor in the `#blog` section, place it first, and move the `<span class="post-badge">new</span>` to it
- **Work experience**: Add/edit `.timeline-entry` articles in `#work`; stats go in `.stat-row`
- **Social links**: Footer `.social-links` — inline SVG with `fill="currentColor"` and `aria-label`

### Styling

All design tokens (colors, fonts, spacing) are CSS custom properties in the `:root` block at the top of css/styles.css. Change tokens there rather than hardcoding values in rules.

### JavaScript

js/scripts.js is one IIFE with clearly-commented feature blocks: nav state, scroll reveal (IntersectionObserver), hero typewriter, hero particle canvas. All animations respect `prefers-reduced-motion`.

## Additional Documentation

For specialized topics, see:

- `.claude/docs/architectural_patterns.md` - design system, HTML/CSS/JS patterns and conventions

## Notes for Claude

- This is a **static site** with no build process — changes to HTML/CSS/JS are immediately deployable
- **Everything is first-party code** — no template or framework code to preserve; edit freely
- The only external dependency is **Google Fonts**
- **No testing framework** is in place (manual browser testing only)
- When updating content, maintain the existing **semantic HTML structure**, **`.reveal` scroll-animation classes**, and **numbered section indices** (nav and headings must stay in sync)
- **CNAME file** must remain unchanged — it configures the custom domain

# Ishtiaque's Portfolio Website

## What This Project Is

Personal portfolio website hosted on GitHub Pages at ishtiaquezafar.com. Single-page application showcasing professional experience, blog posts, and contact information.

**Repository**: dev-z.github.io
**Live Site**: https://ishtiaquezafar.com (via CNAME:1)
**Hosting**: GitHub Pages

## Tech Stack

- **Frontend**: Pure HTML, CSS, JavaScript (no build process)
- **UI Framework**: Bootstrap 5.1.3 (via CDN at index.html:144)
- **Icons**: Font Awesome 6.1.0 (index.html:12), Simple Line Icons 2.5.5 (index.html:14)
- **Fonts**: Google Fonts - Source Sans Pro (index.html:16)
- **Template**: Start Bootstrap - Stylish Portfolio v6.0.5 (js/scripts.js:2)

## Project Structure

```
/
├── index.html              # Main single-page application
├── css/
│   └── styles.css          # Bootstrap-based custom styles (11,526 lines)
├── js/
│   └── scripts.js          # Sidebar toggle, scroll effects (80 lines)
├── assets/
│   ├── favicon.ico         # Site favicon
│   └── img/
│       ├── profile-pic.png # About section image
│       └── work-pic.png    # Work section image
├── CNAME                   # Custom domain configuration
└── README.md               # Project overview
```

## Key Directories

- **`/` (root)**: Contains index.html - the single-page application with all content
- **`css/`**: Contains Bootstrap-based styles (mostly generated/template code)
- **`js/`**: Contains vanilla JavaScript for UI interactions (sidebar, scroll-to-top)
- **`assets/`**: Static assets (images, favicon)

## Content Sections

The website (index.html) is organized into these sections:

1. **Header/Hero** (index.html:34-40): Landing section with tagline
2. **About** (index.html:42-57): Professional introduction and profile
3. **Blog** (index.html:59-96): Links to Medium and dev.to articles
4. **Work** (index.html:98-116): Work experience at FINN GmbH
5. **Connect** (index.html:118-123): Call-to-action for collaboration
6. **Footer** (index.html:125-140): Social links (LinkedIn, Twitter, GitHub)

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

**Important**: The `master` branch is the main/production branch (git status shows this).

## Making Changes

### Content Updates

All content is in `index.html`. Key areas to update:

- **About section**: index.html:42-57
- **Blog links**: index.html:59-96 (add new `<a>` tags following existing pattern)
- **Work experience**: index.html:98-116
- **Social links**: index.html:127-136

### Styling

Custom styles are in `css/styles.css`. This is a large Bootstrap-based file - use browser DevTools to identify specific selectors before editing.

### JavaScript

UI interactions are in `js/scripts.js`:
- Sidebar menu toggle (js/scripts.js:11-17)
- Scroll-to-top button (js/scripts.js:43-56)

## Additional Documentation

For specialized topics, see:

- `.claude/docs/architectural_patterns.md` - UI patterns and conventions used in the template

## Notes for Claude

- This is a **static site** with no build process - changes to HTML/CSS/JS are immediately deployable
- The site uses **external CDN resources** (Bootstrap, Font Awesome) - no local dependencies to manage
- **No testing framework** is in place (manual browser testing only)
- **No package.json** or build tools - pure vanilla web development
- Template is from **Start Bootstrap** - large portions of CSS/JS are third-party code
- When updating content, maintain the existing **semantic HTML structure** and **Bootstrap grid classes**
- **CNAME file** must remain unchanged - it configures the custom domain

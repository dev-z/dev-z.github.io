# Architectural Patterns & Conventions

This document describes the patterns, conventions, and design decisions used in the portfolio website.

## Template-Based Architecture

This project is built on **Start Bootstrap's Stylish Portfolio template** (v6.0.5). The template provides:

- Single-page scrolling layout with anchor-based navigation
- Sidebar toggle menu
- Scroll-to-top functionality
- Responsive design with Bootstrap grid system

**Pattern**: Template code (especially CSS) should generally not be modified. Custom changes should be additive when possible.

## HTML Structure Patterns

### Section Organization

Each major section follows this pattern (see index.html:42-57, 59-96, 98-116):

```html
<section class="content-section [bg-dark]" id="section-name">
    <div class="container px-4 px-lg-5 [text-start] [text-light]">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col">
                <h6 class="mb-5 text-uppercase">Section Label</h6>
                <h1 class="mb-5">Section Heading</h1>
                <p class="text-justify">Content...</p>
            </div>
            [optional second column for images]
        </div>
    </div>
</section>
```

**Convention**:
- Alternating sections use `bg-dark` with `text-light` for visual contrast
- Section IDs match the navigation anchors (index.html:24-31)
- Consistent padding classes: `px-4 px-lg-5` for containers
- Consistent margin classes: `mb-5` for spacing

### Navigation Pattern

**Sidebar Navigation** (index.html:23-31):
- Toggle button with hamburger icon (index.html:22)
- Sidebar appears from left side when toggled
- JavaScript handles open/close state (js/scripts.js:11-17)
- Menu items link to section IDs using anchor tags

**Pattern**: Navigation is entirely client-side using `#anchor` links. No routing library needed.

## CSS Patterns

### Bootstrap Integration

**File**: css/styles.css (11,526 lines - mostly Bootstrap framework code)

**Convention**:
- Bootstrap 5.1.3 classes are used throughout
- Grid system: `container`, `row`, `col` (responsive columns)
- Spacing utilities: `mb-5`, `px-4`, `gx-4` (Bootstrap spacing scale)
- Text utilities: `text-uppercase`, `text-justify`, `text-start`, `text-light`

**Pattern**: Prefer Bootstrap utility classes over custom CSS when possible.

### Custom Image Handling

**Pattern** (index.html:53, 112):
```html
<div class="image-holder"><div class="about-image"></div></div>
<div class="image-holder"><div class="work-image"></div></div>
```

Images are set via CSS background-image (in styles.css) rather than `<img>` tags. This provides more styling control.

## JavaScript Patterns

### Event-Driven UI

**File**: js/scripts.js

**Pattern**: All JavaScript runs after DOM loads (js/scripts.js:6):
```javascript
window.addEventListener('DOMContentLoaded', event => {
    // All UI logic here
});
```

**Convention**:
- Event listeners are attached to elements via `querySelector`
- Helper functions prefixed with `_` are private (e.g., `_toggleMenuIcon` at js/scripts.js:29)
- State is tracked with simple boolean flags (e.g., `scrollToTopVisible` at js/scripts.js:9)

### No Framework Pattern

**Decision**: This project deliberately uses **vanilla JavaScript** without frameworks (React, Vue, etc.).

**Rationale**:
- Simple, single-page site doesn't warrant framework overhead
- Direct DOM manipulation is sufficient for limited interactivity
- No build process required - easier deployment

## Content Management Patterns

### External Content Links

**Blog posts** (index.html:63-80) link to external platforms:
- Medium: https://medium.com/@ishtiaque
- dev.to: https://dev.to/ishtiaque

**Pattern**: Content is maintained on external platforms. The portfolio site only links to them, not hosting content directly.

**Convention**: Blog link elements follow this structure:
```html
<a class="btn-outline-dark no-hover-effects" href="[url]" target="_blank">
    <div class="container px-0 mb-5"><h4>[title]</h4></div>
</a>
```

### Social Links

**Footer social links** (index.html:127-136) use:
- Simple Line Icons for social media icons
- `list-inline` for horizontal layout
- Circular styling via `social-link rounded-circle` classes

**Convention**: All external links use `target="_blank"` to open in new tabs.

## Responsive Design Patterns

### Mobile-First Approach

**Bootstrap breakpoints** used throughout:
- `col-12 col-md-6`: Full width on mobile, half width on medium+ screens (index.html:62, 82)
- `px-4 px-lg-5`: Smaller padding on mobile, larger on desktop
- `gx-4 gx-lg-5`: Responsive gutter spacing

**Pattern**: Order classes control visual order on different screen sizes:
```html
<div class="col-12 col-md-6 order-last order-md-first">
    <!-- Shows last on mobile, first on desktop -->
</div>
```

### Sidebar Menu (Mobile Navigation)

**Pattern**: On mobile, navigation is hidden in a sidebar that slides in when toggled. On desktop, it remains a slide-in menu (not a top navbar).

**Implementation**:
- CSS classes toggle `active` state (js/scripts.js:14-16)
- Hamburger icon changes to X when open (js/scripts.js:29-40)

## Asset Organization

### Image Assets

**Location**: assets/img/

**Convention**:
- Descriptive naming: `profile-pic.png`, `work-pic.png` (not generic like `image1.png`)
- Organized in `img/` subdirectory, not loose in `assets/`

### Icon Assets

**Pattern**: Icons are loaded from CDNs (Font Awesome, Simple Line Icons), not local files.

**Usage**:
- Font Awesome: `<i class="fas fa-bars"></i>` (index.html:22)
- Simple Line Icons: `<i class="icon-social-linkedin"></i>` (index.html:129)

## Deployment Patterns

### GitHub Pages Configuration

**CNAME file**: Required for custom domain (ishtiaquezafar.com)

**Pattern**:
- `master` branch is the production branch
- Direct commits to master trigger automatic deployment
- No build/CI process - files are served as-is

**Convention**: The CNAME file contains only the domain (no protocol, no path).

## Accessibility Patterns

### Semantic HTML

**Pattern**: Proper HTML5 semantic elements are used:
- `<header>` for masthead (index.html:34)
- `<section>` for content sections
- `<nav>` for sidebar navigation (index.html:23)
- `<footer>` for footer (index.html:125)

**Convention**: Section headings follow hierarchy (`<h1>`, `<h4>`, `<h6>`) for screen readers.

### Link Accessibility

**Pattern**: All interactive elements are proper `<a>` tags (not `<div onclick>`), ensuring keyboard navigation works.

## Maintenance Patterns

### Adding New Blog Posts

To add a new blog post link (index.html:63-80):

1. Add new `<a>` tag following the existing pattern
2. Place it at the top of the list (newest first)
3. Ensure consistent class names: `btn-outline-dark no-hover-effects`
4. Include `target="_blank"` for external links

### Updating Work Experience

Work content is in a single section (index.html:98-116). Update the paragraph text directly.

**Pattern**: Long-form content stays in paragraph tags, not broken into multiple sections (keeps it simple).

## Non-Patterns (Deliberately Not Used)

- **No CSS preprocessor** (Sass, Less) - pure CSS
- **No JavaScript build process** (webpack, Rollup) - vanilla JS served directly
- **No component system** - single HTML file with all content
- **No state management library** - simple boolean flags suffice
- **No testing framework** - manual browser testing only
- **No package manager** (npm, yarn) - all dependencies via CDN

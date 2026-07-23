### Personal portfolio and CV website for software engineering trainee opportunities

# Mads Damiri - Portfolio Website

Live website: [software.madsdamiri.dk](https://software.madsdamiri.dk)

<img width="2560" height="1440" alt="Portfolio website preview" src="src/assets/images/hero-clean-scene-bg-extra-wide.webp" />

This project is my personal portfolio and CV website. It is built to present who I am, what I am learning, the projects I have worked on, and the direction I am moving in as a software engineering student.

The website is designed as a dark, glass-inspired portfolio with a strong visual identity. It combines a personal introduction, selected software projects, an about page, a CV page and a contact page in one focused experience.

The purpose of the site is to support applications for trainee and student developer opportunities, while also giving visitors a better sense of my technical interests, work style and learning journey.

I am currently preparing for my 3rd semester in Software Engineering, which starts in September 2026.

---

# Portfolio Website - Project Documentation

This portfolio is a React and TypeScript single-page application built with Vite. It uses custom CSS, local visual assets and structured data files to render a personal website with multiple page views.

The site uses hash-based navigation, making it simple to host as a static website while still supporting separate pages such as About, Projects, CV and Contact.

## Features

The website includes:

- custom homepage hero section with personal introduction
- responsive header and navigation
- mobile dropdown navigation
- featured project cards
- searchable project archive
- project filtering by technology, status and semester
- project detail pages with screenshots and technical documentation
- About page with custom hero artwork and animated visual overlay
- CV page with journey timeline, technical stack and work maturity overview
- Contact page with direct contact options
- custom dark visual design using glass panels, gradients and generated background images
- local asset structure for portfolio images, project screenshots and page backgrounds

## Technologies

The project uses:

- React
- TypeScript
- Vite
- CSS
- Lucide React icons
- HTML
- Local image assets

The site does not use a large UI framework. Most layout, interaction styling and visual identity are custom-built.

## Project Structure

```text
software-madsdamiri-dk/
|-- .github/workflows/              # CI: typecheck and build on every push
|-- docs/
|   `-- diagrams/                   # Original SVG source diagrams (not bundled)
|-- public/                         # Static files served as-is: icons, brochures, robots, sitemap
|-- src/
|   |-- assets/
|   |   |-- images/                 # Shared page backgrounds, logo and profile images
|   |   `-- ProjectImages/          # Project screenshots and documentation images
|   |-- components/
|   |   |-- layout/                 # Site shell and footer
|   |   |-- navigation/             # Header and navigation
|   |   |-- pages/                  # About, Projects, CV, Contact, project detail and 404
|   |   |-- projects/               # Project card components
|   |   |-- sections/               # Homepage sections
|   |   `-- ui/                     # Reusable UI components
|   |-- data/                       # Navigation, profile and project content
|   |-- hooks/                      # Shared React hooks
|   |-- styles/
|   |   `-- global.css              # Global styling for the full site
|   |-- types/                      # Shared TypeScript types
|   |-- utils/                      # Small helper functions
|   |-- App.tsx                     # Route handling and page rendering
|   `-- main.tsx                    # React application entry point
|-- index.html
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- vite.config.ts
`-- README.md
```

The `docs/diagrams` folder holds the original vector versions of the UML and ER
diagrams. The site itself renders the smaller WebP exports under
`src/assets/ProjectImages`, so the SVG sources are kept as reference material
and are never bundled.

## Pages

### Home

The homepage introduces me as a software engineering student and highlights the overall direction of the portfolio. It includes a custom hero scene, call-to-action buttons, profile highlights and selected project cards.

### About

The About page focuses on background, values, learning style and motivation. It uses a custom hero image and visual overlay to connect code, books and personal development as part of the page identity.

### Projects

The Projects page works as a searchable project archive. Projects can be filtered by:

- status
- technology
- semester
- search text

Each project can link to a detailed page with screenshots, technical choices, documentation images and project-specific notes.

### CV

The CV page presents a more structured overview of my current software direction. It includes:

- hero section
- journey timeline
- technical stack
- work maturity overview
- document area for future CV and trainee material

### Contact

The Contact page provides direct ways to get in touch and is designed to support trainee or student developer opportunities.

## Architecture

The application is structured around a small set of clear layers:

### Data Layer

Content such as profile information, navigation items and project data is stored under `src/data`. This keeps much of the portfolio content separate from the visual components.

Important data files include:

- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/navigation.ts`

### Component Layer

The project separates components by responsibility:

- `pages` for full page views
- `sections` for homepage sections
- `ui` for smaller reusable components
- `layout` for the site shell and footer
- `navigation` for the header and menu
- `projects` for project-specific UI

### Styling Layer

The visual design is currently handled in one global stylesheet:

```text
src/styles/global.css
```

This keeps the project simple, but the file has grown past 5,000 lines. A future improvement would be to split the CSS into smaller files, for example:

```text
styles/
|-- base.css
|-- layout.css
|-- components/
|-- pages/
`-- utilities.css
```

### Routing

The site uses hash-based routing in `App.tsx`. This makes the website easy to deploy as a static site without server-side routing configuration.

Example routes:

```text
#home
#/about
#/projects
#/projects?tech=React
#/projects/project-slug
#/cv
#/contact
```

Anything that does not match a known route renders a 404 page instead of
silently falling back to the home page. Each sub-page is code-split with
`React.lazy`, so the first visit only downloads the home page.

## How to Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the typecheck on its own:

```bash
npm run typecheck
```

Dependency versions are pinned and `package-lock.json` is committed, so
`npm ci` reproduces the exact same build. GitHub Actions runs the typecheck and
the build on every push to `main`.

## Current Study Status

I am studying Software Engineering at VIA University College.

Current status:

- preparing for 3rd semester
- 3rd semester starts in September 2026
- focused on fullstack development, software design, databases and maintainable systems
- interested in trainee and student developer opportunities

## Accessibility and Performance Notes

- a skip link moves keyboard focus straight to the main content
- the image lightbox traps and restores focus, closes on `Escape`, supports
  arrow-key navigation and locks background scrolling while open
- all JavaScript-driven carousels stop when the visitor has reduced motion
  enabled, and pause while the browser tab is hidden
- below-the-fold images are lazy-loaded and decoded asynchronously
- React is split into its own chunk so app changes do not invalidate it

## Future Improvements

Possible future improvements include:

- splitting `global.css` into page-specific and component-specific styles, on a
  shared breakpoint scale rather than the current ad-hoc widths
- extracting the three auto-scrolling carousels into one shared hook
- moving larger page-specific text/data into dedicated files under `src/data`
- unit tests for the pure functions (`getRoute`, `projectMatches`, `tagTone`)
- adding a real downloadable CV and trainee material
- replacing the generated hero artwork with photos of my own setup and work
- adding more project detail pages as new projects are completed

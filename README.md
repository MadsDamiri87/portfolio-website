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
|-- public/                         # Static public files
|-- src/
|   |-- assets/
|   |   |-- images/                 # Shared page backgrounds, logo and profile images
|   |   `-- ProjectImages/          # Project screenshots and documentation images
|   |-- components/
|   |   |-- layout/                 # Site shell and footer
|   |   |-- navigation/             # Header and navigation
|   |   |-- pages/                  # About, Projects, CV, Contact and project detail pages
|   |   |-- projects/               # Project card components
|   |   |-- sections/               # Homepage sections
|   |   `-- ui/                     # Reusable UI components
|   |-- data/                       # Navigation, profile and project content
|   |-- styles/
|   |   `-- global.css              # Global styling for the full site
|   |-- types/                      # Shared TypeScript types
|   |-- utils/                      # Small helper functions
|   |-- App.tsx                     # Route handling and page rendering
|   `-- main.tsx                    # React application entry point
|-- index.html
|-- package.json
|-- tsconfig.json
|-- vite.config.ts
`-- README.md
```

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

This keeps the project simple, but the file has grown large. A future improvement would be to split the CSS into smaller files, for example:

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
#/projects/project-slug
#/cv
#/contact
```

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

## Current Study Status

I am studying Software Engineering at VIA University College.

Current status:

- preparing for 3rd semester
- 3rd semester starts in September 2026
- focused on fullstack development, software design, databases and maintainable systems
- interested in trainee and student developer opportunities

## Future Improvements

Possible future improvements include:

- final mobile layout polish across all pages
- splitting `global.css` into page-specific and component-specific styles
- moving larger page-specific text/data into dedicated files under `src/data`
- adding final downloadable CV and trainee material
- optimizing large images and SVG documentation assets
- adding more project detail pages as new projects are completed

## Notes

- This is a personal portfolio project.
- The visual identity is custom-made for the site.
- The project is designed to be hosted as a static website.
- The folder intended for GitHub is `software-madsdamiri-dk`.
- Generated/local folders such as `node_modules`, `dist` and rollback folders should not be committed.

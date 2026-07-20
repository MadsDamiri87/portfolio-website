# software-madsdamiri-dk

Personal portfolio and CV website for Mads Damiri, built to present projects, background, CV direction and contact information in one focused web experience.

The site is designed as a dark, glass-inspired portfolio with separate pages for Home, About, Projects, CV and Contact. It is intended both as a personal website and as supporting material for trainee/student developer opportunities.

## About Mads

Mads Damiri is a Software Engineering Student with a focus on fullstack development, clean structure, thoughtful design and practical problem solving.

Current study status:

- Preparing for 3rd semester
- 3rd semester starts in September 2026
- Studying Software Engineering at VIA University College
- Interested in trainee/student developer roles, backend, databases, fullstack systems, software quality and meaningful user experiences

## Pages

- **Home**: Main introduction, hero section, featured projects and profile highlights.
- **About**: Personal background, values, learning journey and current focus.
- **Projects**: Searchable project archive with filters, status lanes, semester view and project details.
- **CV**: CV-focused overview with hero section, journey timeline, technical stack and work maturity.
- **Contact**: Contact options and message flow.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Lucide React icons

The project intentionally keeps the frontend lightweight and mostly custom-built, without a large UI framework.

## Project Structure

```txt
src/
  assets/
    images/              Shared visual assets and generated page backgrounds
    ProjectImages/       Screenshots and documentation images for projects
  components/
    layout/              Site shell and footer
    navigation/          Header and navigation
    pages/               Full pages such as About, Projects, CV and Contact
    projects/            Project card components
    sections/            Home page sections
    ui/                  Small reusable UI components
  data/                  Navigation, profile and project data
  styles/                Global CSS
  types/                 Shared TypeScript types
  utils/                 Small helper functions
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

This is a personal portfolio project, so much of the visual identity is custom-made for the site. The current CSS is collected in one global stylesheet, which works for the project size, but a future cleanup could split styles into page-specific files for easier maintenance.

Recommended future cleanup:

- Split `global.css` into base, layout, component and page styles.
- Move larger page-specific data from page components into dedicated files under `src/data`.
- Split the largest page components into smaller subcomponents.
- Replace placeholder document links with final downloadable CV/brochure files when ready.

## Repository Upload Notes

The folder that should be uploaded to GitHub is:

```txt
software-madsdamiri-dk
```

Do not include generated or local-only folders such as:

```txt
node_modules/
dist/
_rollback-before-mobile-temp/
```

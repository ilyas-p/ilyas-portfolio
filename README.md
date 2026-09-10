# Mohammed Ilyas P — Portfolio

A premium, dark-first personal portfolio built with React, Vite, and Three.js.

## Tech stack

- React 19 + Vite
- Plain CSS (custom design system, CSS variables, no UI framework)
- Three.js (lazy-loaded, only for the Penalty Shootout project visual)
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev      # starts the dev server
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
├── components/     # UI components (one file per section/piece)
├── context/        # ThemeContext (dark/light mode, persisted to localStorage)
├── data/           # Content — profile, projects, skills (edit these, not the components)
├── hooks/          # useInView (scroll reveal), usePrefersReducedMotion
├── App.jsx
├── main.jsx
└── styles.css      # entire design system: tokens, reset, components
```

## Things to fill in before you deploy

1. **Resume** — drop your actual PDF at `public/resume.pdf` (replace the
   `public/RESUME_PLACEHOLDER.txt` note). The navbar's "Resume" button already
   links to `/resume.pdf`.
2. **Project links** — `src/data/projects.js` has `githubUrl` and `liveUrl`
   set to `null` for all three projects since none were provided. Fill them
   in and the "GitHub" / "Live Demo" buttons will activate automatically —
   until then they render as clearly disabled placeholders.
3. **Open Graph image** — `index.html` references `/og-image.png`. Add a
   1200×630 image at `public/og-image.png` for nicer social-media link
   previews (optional).
4. **Favicon** — `public/favicon.svg` is a simple "MI" monogram generated
   for this build; swap it for your own mark if you'd like.

## Design system

Colors, spacing, and typography are all defined as CSS variables at the top
of `src/styles.css` under `:root`, `:root[data-theme='dark']`, and
`:root[data-theme='light']`. Change a value once there and it updates
everywhere.

- Display font: Space Grotesk
- Body font: Inter
- Monospace (code panel, labels): IBM Plex Mono

## Notes

- The hero's animated code panel and the Penalty Shootout project's 3D
  ball/goal scene both respect `prefers-reduced-motion`.
- The Three.js scene is loaded via `React.lazy` so the ~500 kB three.js
  bundle is only fetched when that project card is needed.
- All content (name, projects, skills, experience, education) lives in
  `src/data/` — update those files rather than editing components directly.

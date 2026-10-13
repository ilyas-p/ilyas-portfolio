# Mohammed Ilyas P — "The Series" Portfolio

A cinematic, streaming-series-style portfolio for **Mohammed Ilyas P — Python Full-Stack Developer**.
Built with React 19, Vite 8, Tailwind CSS 4, Framer Motion, Lenis (smooth scroll) and Three.js.

The experience: an opening title sequence → "Who's watching?" profile picker (Recruiter / Developer / Creative
re-order the sections) → hero billboard → sections presented as seasons, "Originals" (projects), top picks,
skills, credentials and a resume viewer → "To be continued…" contact. The Ilyas Assistant chatbot is kept.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start the dev server
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
```

## Where to edit your content

| What | File |
| --- | --- |
| Name, title, email, phone, LinkedIn, **GitHub**, location, languages, education, internship, certification, About copy | `src/data/profile.js` |
| Projects (descriptions, features, tech, **githubUrl / liveUrl**) | `src/data/projects.js` |
| Skill groups | `src/data/skills.js` |
| Presentation only: palettes, season/episode titles, Top Picks order, intro-reel copy | `src/data/series.js` |

`series.js` *derives* everything it can from the three files above, so facts live in one place.

### Adding GitHub / project links
`profile.github` is set. Each project's `githubUrl` / `liveUrl` in `projects.js` is still `null`. Fill them in and the
matching buttons (hero contact, project cards, project modal, resume header, contact section) appear
automatically. Nothing is shown for a link that doesn't exist.

## Project structure

```
src/
  main.jsx, App.jsx, index.css        entry, stage flow (opening → profiles → home), Tailwind theme
  data/        profile.js  projects.js  skills.js  series.js
  hooks/       smoothScroll.jsx  useMedia.js  sectionProgress.js
  components/  OpeningSequence, ProfileSelector, Navbar, Hero, ContinueWatching, About, Seasons,
               Originals, ProjectCard, ProjectModal, TopPicks, Skills, Credentials, ResumeViewer,
               ResumeModal, FinalCTA, PlayIntro, CustomCursor, Football3D (lazy), PortfolioChatbot (+ .css)
public/        favicon.svg, resume.pdf, assets/ (portrait WebPs, og-image.jpg)
assets-src/    original photo + background-removed cutout (not deployed)
```

## Images
`public/assets/portrait-*.webp` are made from `assets-src/profile-cutout.png` (a background-removed copy of your
photo). To change the photo: remove the background, crop to the subject, export WebPs at 420/720/947px wide
into `public/assets/`. `og-image.jpg` (1200×630) is the social-share image; for link previews to work in
production, set `og:image` in `index.html` to an absolute URL on your domain.

## Deployment
It's a static Vite site — run `npm run build` and deploy `dist/`.
- **Vercel / Netlify / Cloudflare Pages:** build command `npm run build`, output directory `dist`.
- **GitHub Pages:** set `base` in `vite.config.js` to `'/<repo-name>/'` for project pages, build, and publish `dist/`.

No environment variables or API keys are used. The chatbot answers locally from your data files.

## Accessibility & behaviour notes
Skip link, keyboard-operable controls with visible focus, `prefers-reduced-motion` respected (smooth scroll and
the pinned horizontal Originals scroll fall back to native behaviour), custom cursor only on fine pointers.
The profile choice is remembered for the browser session only (`sessionStorage`).

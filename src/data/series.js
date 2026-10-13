/**
 * The "series" layer.
 *
 * The site is presented like a streaming series: sections are episodes, projects are "Originals".
 * This file maps the real content in profile.js, projects.js and skills.js into that structure.
 *
 *  - Facts come ONLY from those three files (plus the resume). Nothing is invented here.
 *  - What this file adds is presentation: palettes, season/episode titles, the ordering of
 *    the "Top Picks" row, and the copy of the highlight reel.
 *
 * To change a fact (an email, a project, a skill) edit the data file, not this one.
 */
import {
  profile as base,
  education,
  experience,
  certification,
  summary,
  intro,
  focusAreas,
} from './profile.js';
import { skillGroups } from './skills.js';
import { projects as baseProjects } from './projects.js';

export { education, experience, certification, focusAreas };

/* ------------------------------------------------------------------ palettes */

export const crimson = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
export const amber = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
export const ocean = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
export const violet = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
export const jade = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

/* ------------------------------------------------------------------- profile */

const [firstName, ...restName] = base.name.toUpperCase().split(' ');

export const profile = {
  fullName: base.name,
  displayName: base.name,
  /** The name as shown on the title cards: MOHAMMED / ILYAS P. */
  nameLines: [firstName, restName.join(' ')],
  seriesTag: 'THE SERIES',
  /** Decorative studio card shown at the very start of the opening sequence. */
  originalLabel: 'AN ILYAS ORIGINAL',
  role: base.title,
  tagline: ['Python', 'Full-Stack', 'Django'],
  intro,
  summary,
  location: base.location,
  region: 'Kerala, India',
  email: base.email,
  phone: base.phone,
  languages: base.languages,
  links: {
    linkedin: base.linkedin,
    github: base.github,
  },
  resumePdf: base.resumeUrl,
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet:
      '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-947.webp 947w',
    alt: `Portrait of ${base.name}`,
  },
};

/** Gmail web compose (kept from the original contact section — works without a desktop mail client). */
export const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${base.email}&su=${encodeURIComponent(
  "Let's build something",
)}`;
export const mailtoUrl = `mailto:${base.email}`;
export const telUrl = `tel:${base.phone.replace(/\s+/g, '')}`;

/* ------------------------------------------------------------------ projects */

/** Art direction per project (id → palette, motif and a few facts taken from the project data). */
const artDirection = {
  'codementor-ai': {
    palette: violet,
    motif: 'code',
    highlights: [{ value: '3', label: 'languages run securely — Python, Java, C' }],
  },
  'penalty-shootout': {
    palette: jade,
    motif: 'football',
    highlights: [
      { value: '3D', label: 'WebGL game built with React + Three.js' },
      { value: 'Render', label: 'where the Flask backend is deployed' },
    ],
  },
  'jersey-store': {
    palette: amber,
    motif: 'cart',
    highlights: [{ value: '2', label: 'modules — Admin and Customer' }],
  },
};

const fallbackPalettes = [crimson, ocean, violet];

export const projects = baseProjects.map((p, i) => {
  const art = artDirection[p.id] ?? { palette: fallbackPalettes[i % fallbackPalettes.length], motif: 'code', highlights: [] };
  return {
    id: p.id,
    number: p.number,
    /** Short form for big display type; the full name is kept for the resume sheet. */
    title: p.name.split(' — ')[0],
    fullTitle: p.name,
    genre: p.category,
    logline: p.description,
    overview: p.longDescription,
    stack: p.technologies,
    features: p.features,
    facts: [
      { value: String(p.features.length), label: 'key features' },
      { value: String(p.technologies.length), label: 'technologies' },
      ...art.highlights,
    ],
    // Buttons only render when a real URL exists (both are null until you add them in projects.js).
    github: p.githubUrl ?? undefined,
    live: p.liveUrl ?? undefined,
    palette: art.palette,
    motif: art.motif,
  };
});

/* -------------------------------------------------------------------- skills */

const SKILL_META = {
  Python: { mono: 'Py', note: 'Primary' },
  C: { mono: 'C' },
  HTML: { mono: 'Ht' },
  CSS: { mono: 'Cs' },
  JavaScript: { mono: 'Js' },
  'React.js': { mono: 'Re' },
  Bootstrap: { mono: 'Bs' },
  Django: { mono: 'Dj' },
  Flask: { mono: 'Fl' },
  'REST API': { mono: 'Ap' },
  MySQL: { mono: 'My' },
  MongoDB: { mono: 'Mg' },
  PostgreSQL: { mono: 'Pg' },
  SQLite: { mono: 'Sq' },
  'Three.js': { mono: '3D' },
};

const GROUP_SUBTITLES = {
  programming: 'Where the logic starts',
  frontend: 'Interfaces & the web platform',
  backend: 'Server-side logic & APIs',
  database: 'Storing & querying data',
  '3d': 'Interactive experiences in the browser',
};

const monoFor = (name) => SKILL_META[name]?.mono ?? name.slice(0, 2);

export const skillCategories = skillGroups.map((g) => ({
  id: g.id,
  title: g.label,
  subtitle: GROUP_SUBTITLES[g.id] ?? '',
  skills: g.skills.map((name) => ({ name, mono: monoFor(name), note: SKILL_META[name]?.note })),
}));

/** Alternate spellings so "React.js" (skills) matches "React" (project tech lists), etc. */
const ALIASES = {
  'React.js': ['react', 'react.js'],
  Bootstrap: ['bootstrap', 'bootstrap 5'],
};
const norm = (s) => s.toLowerCase();
const matches = (skill, tech) => (ALIASES[skill] ?? [norm(skill)]).includes(norm(tech));

/**
 * Where each skill actually appears — derived from the projects' technology lists and the
 * internship, so these cross-references can never drift from the real data.
 */
const internshipTech = ['Python', 'HTML', 'CSS', 'Bootstrap', 'SQLite'];

export const skillEvidence = Object.fromEntries(
  skillGroups
    .flatMap((g) => g.skills)
    .map((skill) => {
      const where = projects.filter((p) => p.stack.some((t) => matches(skill, t))).map((p) => p.title);
      if (internshipTech.some((t) => matches(skill, t))) where.push(`${experience.company.replace(/ Pvt\. Ltd\.$/, '')} internship`);
      return [skill, where];
    })
    .filter(([, where]) => where.length > 0),
);

/* --------------------------------------------------------------- credentials */

/** "2025 – 2027" is ongoing while its end year is still in the future. */
const isOngoing = (period) => Number(period.match(/(\d{4})\s*$/)?.[1]) > new Date().getFullYear();

/** Poster cards for the "Credentials" section (experience, certification and education). */
export const credentials = [
  {
    id: 'internship',
    title: experience.role,
    org: experience.company,
    detail: `${experience.points[0]}. ${experience.points[1]}.`,
    laurel: 'Internship',
  },
  {
    id: 'certification',
    title: certification.name,
    org: 'Certification',
    detail: '',
    laurel: 'Certified',
  },
  ...education.map((e, i) => ({
    id: e.id,
    title: e.degree.replace(/ \(MCA\)$/, ''),
    org: e.institution,
    detail: e.period,
    laurel: i === 0 && isOngoing(e.period) ? 'In Progress' : 'Education',
  })),
];

/* ------------------------------------------------------------------- seasons */

const [mca, bsc, hsc] = education;
const companyShort = experience.company.replace(/ Pvt\. Ltd\.$/, '');
const project = (id) => projects.find((p) => p.id === id);
const [pointStack, pointBuild, pointExperience, pointData] = experience.points;

const projectEpisodes = [
  { title: 'The AI Mentor', runtime: projects[0]?.genre },
  { title: 'The Striker', runtime: projects[1]?.genre },
  { title: 'The Storefront', runtime: projects[2]?.genre },
];

export const seasons = [
  {
    number: 1,
    title: 'The Foundation',
    period: hsc.period,
    synopsis: `Higher Secondary at ${hsc.institution}.`,
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Beginning',
        description: `${hsc.degree} at ${hsc.institution}.`,
        tags: ['Higher Secondary'],
        runtime: hsc.period,
        palette: amber,
      },
    ],
  },
  {
    number: 2,
    title: 'Enter: Computer Science',
    period: bsc.period,
    synopsis: `${bsc.degree} at ${bsc.institution}.`,
    episodes: [
      {
        code: 'S02 E01',
        title: 'The Student',
        description: `${bsc.degree} at ${bsc.institution}.`,
        tags: ['B.Sc', 'Computer Science'],
        runtime: bsc.period,
        palette: violet,
      },
    ],
  },
  {
    number: 3,
    title: 'Learning to Build',
    period: 'Internship',
    synopsis: `${experience.description}`,
    episodes: [
      {
        code: 'S03 E01',
        title: 'The Stack',
        description: `${pointStack}.`,
        tags: ['Python', 'HTML', 'CSS', 'Bootstrap', 'SQLite'],
        runtime: experience.company,
        palette: ocean,
      },
      {
        code: 'S03 E02',
        title: 'The Build',
        description: `${pointBuild}. ${pointExperience}.`,
        tags: ['Full-Stack', 'Web Apps'],
        runtime: experience.company,
        palette: crimson,
      },
      {
        code: 'S03 E03',
        title: 'The Data',
        description: `${pointData}.`,
        tags: ['SQLite', 'Databases'],
        runtime: experience.company,
        palette: jade,
      },
    ],
  },
  {
    number: 4,
    title: 'Building Real Products',
    period: 'Projects',
    synopsis: `${projects.length} Originals — an AI coding platform, a 3D football game and a Django e-commerce store.`,
    episodes: projects.map((p, i) => ({
      code: `S04 E0${i + 1}`,
      title: projectEpisodes[i]?.title ?? p.title,
      description: `${p.title} — ${p.logline}`,
      tags: p.stack.slice(0, 4),
      runtime: p.genre,
      palette: p.palette,
    })),
  },
  {
    number: 5,
    title: 'Now Streaming',
    period: mca.period,
    synopsis: `${mca.degree} at ${mca.institution}.`,
    episodes: [
      {
        code: 'S05 E01',
        title: 'The Postgraduate',
        description: `${mca.degree} at ${mca.institution}.`,
        tags: ['MCA', mca.period],
        runtime: mca.period,
        palette: crimson,
      },
      {
        code: 'S05 E02',
        title: 'The Next Chapter',
        description: 'Building practical web applications, exploring AI & 3D experiences and learning new technologies.',
        tags: ['Web Apps', 'AI', '3D', 'Learning'],
        runtime: 'In production',
        palette: violet,
      },
    ],
  },
];

/* ----------------------------------------------------------------- top picks */

export const topPicks = [
  { label: 'Core language', title: 'Python', detail: base.title, palette: violet },
  { label: 'Web framework', title: 'Django', detail: `${project('jersey-store')?.title} — Admin & Customer modules`, palette: amber },
  { label: 'The AI Original', title: project('codementor-ai')?.title, detail: 'AI mentor with progressive hints', palette: ocean },
  { label: 'Interactive 3D', title: 'Penalty Shootout', detail: 'React + Three.js, deployed on Render', palette: jade },
  { label: 'Internship', title: companyShort, detail: experience.role, palette: crimson },
  { label: 'Lightweight backend', title: 'Flask', detail: 'CodeMentor AI & the Penalty Shootout API', palette: violet },
  { label: 'Certification', title: certification.name, detail: 'Listed on the resume', palette: ocean },
  { label: 'Currently studying', title: 'MCA', detail: `${mca.institution} · ${mca.period}`, palette: amber },
  { label: 'Databases', title: 'SQL & NoSQL', detail: 'MySQL · MongoDB · PostgreSQL · SQLite', palette: jade },
  { label: 'Frontend', title: 'React.js', detail: 'Used in the 3D Penalty Shootout', palette: crimson },
];

/* --------------------------------------------------------------- intro reel */

/** Slides for the "▶ Play Intro" highlight reel. */
export const introSlides = [
  {
    kicker: 'Education',
    title: 'MCA · 2025 – 2027',
    lines: [mca.institution, `After ${bsc.degree} at ${bsc.institution}`],
    chips: ['Aspiring MCA student'],
  },
  {
    kicker: 'Skills',
    title: 'Python first.',
    lines: [
      'Python, C · HTML, CSS, JavaScript, React.js',
      'Django, Flask, REST API · MySQL, MongoDB, PostgreSQL, SQLite',
    ],
    chips: ['Python', 'Django', 'Flask', 'React.js', 'MySQL', 'Three.js'],
  },
  {
    kicker: 'Experience',
    title: 'Hands-on Internship',
    lines: [experience.role, `${experience.company} · ${experience.location}`, 'Python · HTML · CSS · Bootstrap · SQLite'],
  },
  {
    kicker: 'Projects',
    title: `${projects.length} Originals`,
    lines: projects.map((p) => `${p.title} — ${p.genre}`),
  },
  {
    kicker: 'Certified',
    title: certification.name,
    lines: ['Certification', 'Alongside the MCA and full-stack project work'],
  },
  {
    kicker: 'Current mission',
    title: 'Always building.',
    lines: [focusAreas.map((f) => f.body).join(' · ')],
  },
];

/* ------------------------------------------------------------ viewer profiles */

export const viewerProfiles = [
  {
    id: 'ilyas',
    name: 'Ilyas',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, credentials & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & skills first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const MAIN_PROFILE_ID = 'ilyas';

const episodeCount = seasons.reduce((n, s) => n + s.episodes.length, 0);

export const sectionMeta = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & experience', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${episodeCount} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: `Top ${topPicks.length} highlights`, palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Credentials', card: 'My Credentials', meta: 'Experience • Education • Certification', palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]"
      />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** A small illustrated scene per project, drawn from what the project actually is. */
function CodeMotif({ a }) {
  const lines = [
    { x: 0, w: 52 },
    { x: 14, w: 86 },
    { x: 14, w: 64 },
    { x: 28, w: 96 },
    { x: 14, w: 40 },
  ];
  return (
    <g fill="none" stroke={a}>
      {/* editor window */}
      <rect x="196" y="48" width="172" height="132" rx="12" strokeWidth="2" strokeOpacity="0.85" />
      <path d="M196 74 H368" strokeWidth="1" strokeOpacity="0.35" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={212 + i * 14} cy="61" r="3.5" fill={a} fillOpacity={0.35 + i * 0.2} stroke="none" />
      ))}
      {lines.map((l, i) => (
        <line
          key={i}
          x1={214 + l.x}
          x2={214 + l.x + l.w}
          y1={94 + i * 15}
          y2={94 + i * 15}
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity={i === 3 ? 0.9 : 0.3 + (i % 3) * 0.12}
        />
      ))}
      {/* AI mentor hint bubble */}
      <g transform="translate(244 150)">
        <rect width="132" height="58" rx="12" fill="#07070a" fillOpacity="0.55" strokeWidth="2" strokeOpacity="0.9" />
        <path d="M24 58 l-8 14 l22 -14" fill="#07070a" fillOpacity="0.55" strokeWidth="2" strokeOpacity="0.9" strokeLinejoin="round" />
        <line x1="40" x2="108" y1="22" y2="22" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
        <line x1="40" x2="88" y1="38" y2="38" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M22 18 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" fill={a} stroke="none" />
      </g>
    </g>
  );
}

function FootballMotif({ a }) {
  const posts = { l: 200, r: 380, top: 66, bottom: 190 };
  return (
    <g fill="none" stroke={a}>
      {/* net */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={posts.l + 18 * (i + 1)} x2={posts.l + 18 * (i + 1)} y1={posts.top} y2={posts.bottom} strokeWidth="1" strokeOpacity="0.2" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1={posts.l} x2={posts.r} y1={posts.top + 16 * (i + 1)} y2={posts.top + 16 * (i + 1)} strokeWidth="1" strokeOpacity="0.2" />
      ))}
      {/* goal frame */}
      <path d={`M${posts.l} ${posts.bottom} V${posts.top} H${posts.r} V${posts.bottom}`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
      <path d={`M170 ${posts.bottom} H410`} strokeWidth="2" strokeOpacity="0.45" />
      {/* shot path + target */}
      <path d="M252 246 C 270 160, 322 120, 352 98" strokeWidth="2.5" strokeDasharray="6 8" strokeLinecap="round" strokeOpacity="0.8" />
      <circle cx="352" cy="98" r="9" strokeWidth="2" strokeOpacity="0.9" />
      <circle cx="352" cy="98" r="3" fill={a} stroke="none" />
      {/* ball */}
      <g transform="translate(252 240)">
        <circle r="19" fill="#07070a" fillOpacity="0.6" strokeWidth="2.5" />
        <path d="M0 -8 L7.6 -2.5 L4.7 6.5 H-4.7 L-7.6 -2.5 Z" fill={a} fillOpacity="0.85" stroke="none" />
        <path d="M0 -8 V-19 M7.6 -2.5 L18 -6 M4.7 6.5 L11 15 M-4.7 6.5 L-11 15 M-7.6 -2.5 L-18 -6" strokeWidth="1.5" strokeOpacity="0.7" />
      </g>
    </g>
  );
}

const JERSEY = 'M20 6 L6 14 L12 28 L20 24 V54 H40 V24 L48 28 L54 14 L40 6 C38 12 22 12 20 6 Z';

function CartMotif({ a }) {
  return (
    <g fill="none" stroke={a}>
      <g transform="translate(206 70) scale(1.1)" opacity="0.28">
        <path d={JERSEY} strokeWidth="1.6" strokeLinejoin="round" />
      </g>
      <g transform="translate(300 58) scale(1.4)" opacity="0.4">
        <path d={JERSEY} strokeWidth="1.6" strokeLinejoin="round" />
      </g>
      {/* hero jersey */}
      <g transform="translate(226 34) scale(2.5)">
        <path d={JERSEY} fill="#07070a" fillOpacity="0.45" strokeWidth="0.9" strokeOpacity="0.95" strokeLinejoin="round" />
        <path d="M20 6 C22 12 38 12 40 6" strokeWidth="0.8" strokeOpacity="0.6" />
        <path d="M20 34 H40 M20 40 H40" strokeWidth="0.9" strokeOpacity="0.4" />
      </g>
      {/* cart */}
      <g transform="translate(318 196)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 0 H10 L20 40 H64 L74 12 H14" strokeWidth="3" strokeOpacity="0.9" />
        <circle cx="28" cy="54" r="6" strokeWidth="3" strokeOpacity="0.9" />
        <circle cx="58" cy="54" r="6" strokeWidth="3" strokeOpacity="0.9" />
      </g>
    </g>
  );
}

const MOTIFS = { code: CodeMotif, football: FootballMotif, cart: CartMotif };

/** Motif illustrations for each Original, built from what the project actually is. */
export function ProjectArt({ project, className = '' }) {
  const a = project.palette.accent;
  const Motif = MOTIFS[project.motif] ?? CodeMotif;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />
        <g transform="translate(40 -10) scale(0.88)">
          <Motif a={a} />
        </g>
      </svg>
    </PosterBackdrop>
  );
}

/** Small monogram mark used in the nav and on cards. */
export function SeriesMark({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 24 32" className="h-[1.1em] w-auto" aria-hidden>
        <path d="M3 27 V6 L12 18 L21 6 V27" fill="none" stroke="#e5132b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-mist">SERIES</span>
    </span>
  );
}

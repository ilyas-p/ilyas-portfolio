import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { MAIN_PROFILE_ID, viewerProfiles } from './data/series.js';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import OpeningSequence from './components/OpeningSequence.jsx';
import ProfileSelector from './components/ProfileSelector.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ContinueWatching from './components/ContinueWatching.jsx';
import Scene from './components/Scene.jsx';
import About from './components/About.jsx';
import Seasons from './components/Seasons.jsx';
import Originals from './components/Originals.jsx';
import TopPicks from './components/TopPicks.jsx';
import Skills from './components/Skills.jsx';
import Credentials from './components/Credentials.jsx';
import ResumeSection from './components/ResumeViewer.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import PortfolioChatbot from './components/PortfolioChatbot.jsx';
import { EASE } from './components/fx.jsx';
import './components/PortfolioChatbot.css';

// Overlays are only needed on demand — split them out of the first load.
const PlayIntro = lazy(() => import('./components/PlayIntro.jsx'));
const ProjectModal = lazy(() => import('./components/ProjectModal.jsx'));
const ResumeModal = lazy(() => import('./components/ResumeModal.jsx'));

const STORAGE_KEY = 'ilyas-series-profile';

function readStoredProfile() {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return viewerProfiles.some((p) => p.id === v) ? v : null;
  } catch {
    return null;
  }
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <Series />
    </SmoothScrollProvider>
  );
}

function Series() {
  const stored = readStoredProfile();
  const [stage, setStage] = useState(stored ? 'home' : 'opening'); // opening → profiles → home
  const [profileId, setProfileId] = useState(stored ?? MAIN_PROFILE_ID);
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  const order = viewerProfiles.find((p) => p.id === profileId).order;

  useEffect(() => {
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const pickProfile = useCallback(
    (id) => {
      setProfileId(id);
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* storage unavailable — the profile simply won't persist */
      }
      if (stage !== 'home') {
        window.scrollTo(0, 0);
        setStage('home');
      } else {
        const p = viewerProfiles.find((v) => v.id === id);
        setToast(`Now watching as ${p.name} — ${p.blurb.toLowerCase()}`);
        scrollTo(0, { offset: 0 });
      }
    },
    [stage, scrollTo],
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  const sections = {
    about: <About />,
    journey: <Seasons />,
    originals: <Originals onOpen={setProject} />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Credentials />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <LayoutGroup>
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <div className="grain" aria-hidden />
      <CustomCursor />

      <AnimatePresence>
        {stage === 'opening' && <OpeningSequence key="opening" onDone={() => setStage('profiles')} />}
        {stage === 'profiles' && <ProfileSelector key="profiles" onPick={pickProfile} />}
      </AnimatePresence>

      {stage === 'home' && (
        <motion.div
          initial={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <Navbar order={order} profileId={profileId} onSwitch={pickProfile} />
          <main>
            <Hero
              key={`hero-${profileId}`}
              onPlay={() => setPlaying(true)}
              onResume={() => setResumeOpen(true)}
              profileId={profileId}
            />
            <ContinueWatching order={order} />
            {order.map((id) => (
              <Scene key={id} id={id} className={id === 'originals' ? '!py-0 sm:!py-0' : ''}>
                {sections[id]}
              </Scene>
            ))}
            <FinalCTA onReplay={() => setStage('opening')} />
          </main>
        </motion.div>
      )}

      {/* Outside the animated wrapper so its fixed positioning is relative to the viewport */}
      {stage === 'home' && <PortfolioChatbot />}

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <PlayIntro key="intro" onClose={closeIntro} />}</AnimatePresence>
        <AnimatePresence>
          {project && <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />}
        </AnimatePresence>
        <AnimatePresence>{resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}</AnimatePresence>
      </Suspense>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[150] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl px-5 py-3 text-center text-sm text-bone"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

import React, { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'yazh-silambam-intro-complete';

function isIntroEnabled() {
  return import.meta.env.VITE_INTRO_VIDEO_ENABLED === 'true';
}

function shouldSkipFromStorage() {
  try {
    return !!sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}

export default function IntroVideo() {
  const videoSrc = import.meta.env.VITE_INTRO_VIDEO_SRC || '/videos/intro.mp4';
  const poster = import.meta.env.VITE_INTRO_VIDEO_POSTER || '';
  const muted = import.meta.env.VITE_INTRO_VIDEO_MUTED !== 'false';

  const [status, setStatus] = useState(() => {
    if (!isIntroEnabled() || shouldSkipFromStorage()) return 'hidden';
    return 'visible';
  });

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore private mode */
    }
    setStatus((s) => (s === 'hidden' ? 'hidden' : 'exiting'));
    window.setTimeout(() => setStatus('hidden'), 650);
  }, []);

  useEffect(() => {
    if (status === 'hidden') return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [status]);

  useEffect(() => {
    if (status !== 'visible') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const skipIfReduced = () => {
      if (mq.matches) dismiss();
    };
    skipIfReduced();
    mq.addEventListener('change', skipIfReduced);
    return () => mq.removeEventListener('change', skipIfReduced);
  }, [status, dismiss]);

  if (status === 'hidden') return null;

  return (
    <div
      className={`intro-video-overlay ${status === 'exiting' ? 'intro-video-overlay--out' : ''}`}
      role="presentation"
    >
      <video
        className="intro-video-el"
        src={videoSrc}
        poster={poster || undefined}
        autoPlay
        muted={muted}
        playsInline
        preload="auto"
        onEnded={dismiss}
        onError={dismiss}
      />

      <button type="button" className="intro-video-skip" onClick={dismiss}>
        Skip
      </button>
    </div>
  );
}

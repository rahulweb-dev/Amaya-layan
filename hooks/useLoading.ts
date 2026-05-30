'use client';

import { useEffect, useState } from 'react';

export function useLoading(minDuration = 2800) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let windowLoaded = false;
    let animFrame: number;
    let finished = false;

    const finish = () => {
      if (finished) return;
      const elapsed = Date.now() - startTime;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        finished = true;
        setProgress(100);
        // Give progress bar time to visually fill to 100 before exit
        setTimeout(() => setDone(true), 700);
      }, wait);
    };

    const tick = () => {
      if (finished) return;
      const elapsed = Date.now() - startTime;
      // Progress eases toward 90 naturally; jumps to 100 only on finish()
      const eased = 90 * (1 - Math.exp(-3 * (elapsed / minDuration)));
      setProgress(Math.min(90, Math.round(eased)));
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);

    if (document.readyState === 'complete') {
      windowLoaded = true;
      finish();
    } else {
      window.addEventListener('load', () => {
        windowLoaded = true;
        finish();
      }, { once: true });
    }

    return () => {
      cancelAnimationFrame(animFrame);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { progress, done };
}

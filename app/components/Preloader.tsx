'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let count = 0;

    const timer = setInterval(() => {
      count++;

      setProgress(count);

      if (count >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          setHide(true);
        }, 500);
      }
    }, 25);

    return () => clearInterval(timer);
  }, []);

  if (hide) return null;

  return (
    <div className='fixed inset-0 bg-[#021A13] z-[9999] flex items-center justify-center'>
      <div className='text-center text-limestone'>
        <h2 className='text-4xl mb-4'>LAYAN VERDE</h2>

        <div className='text-xl'>{progress}%</div>
      </div>
    </div>
  );
}

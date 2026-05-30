'use client';

import dynamic from 'next/dynamic';

const Loader = dynamic(() => import('./Loader'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Loader />
      {children}
    </>
  );
}

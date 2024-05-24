'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const DrawingMap = dynamic(() => import('../components/Map'), { ssr: false });
const Toolbar = dynamic(() => import('../components/Toolbar'), { ssr: false });

export default function Home() {
  const [drawType, setDrawType] = useState<string | null>(null);

  return (
    <div>
      <Toolbar setDrawType={setDrawType} />
      <DrawingMap drawType={drawType} />
    </div>
  );
}

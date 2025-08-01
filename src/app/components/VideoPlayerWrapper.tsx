'use client';

import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  ssr: false
});

export default function VideoPlayerWrapper() {
  return <VideoPlayer />;
} 
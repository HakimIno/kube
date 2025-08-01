"use client";

import React from 'react';
import { MainLayout } from '@/components/MainLayout';
import { useParams } from 'next/navigation';

export default function ChannelPage() {
  const params = useParams();
  const channelId = params.id;

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Channel {channelId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add channel content here */}
      </div>
    </MainLayout>
  );
} 
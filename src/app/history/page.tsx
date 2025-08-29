"use client";

import React from 'react';
import { MainLayout } from '@/components/MainLayout';
import { VideoList } from '@/components/VideoList';
import { videos } from '@/data/videos';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function HistoryPage() {
  // ในอนาคตจะดึงข้อมูลจาก API หรือ localStorage
  const historyVideos = videos.slice(1, 7); // ตัวอย่างข้อมูล

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="pt-6">
          <VideoList 
            videos={historyVideos} 
            title="Watch History" 
            layout="list"
            showChannelInfo={true}
          />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
} 
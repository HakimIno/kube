"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MainLayout } from '@/components/MainLayout';
import { VideoPlayer } from '@/components/VideoPlayer';
import { VideoInfo } from '@/components/VideoInfo';
import { ChannelInfo } from '@/components/ChannelInfo';
import { RecommendedVideos } from '@/components/RecommendedVideos';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getVideoById, getRecommendedVideos } from '@/data/videos';

const Watch = () => {
  const params = useParams();
  const videoId = params.videoId as string;
  
  const video = getVideoById(videoId);
  const recommendedVideos = getRecommendedVideos(videoId, 10);

  if (!video) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Video Not Found</h1>
              <p className="text-gray-400">The video you're looking for doesn't exist.</p>
            </div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="flex flex-col lg:flex-row gap-6 pt-6">
          {/* Main Content */}
          <div className="w-full lg:w-[75%]">
            <VideoPlayer />
            <VideoInfo />
            <ChannelInfo />
          </div>

          {/* Recommended Videos */}
          <div className="sticky top-20 overflow-y-auto">
            <RecommendedVideos videos={recommendedVideos} />
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Watch;

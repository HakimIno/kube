"use client";

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MainLayout } from '@/components/MainLayout';
import { VideoPlayer } from '@/components/VideoPlayer';
import { VideoInfo } from '@/components/VideoInfo';
import { ChannelInfo } from '@/components/ChannelInfo';
import { RecommendedVideos } from '@/components/RecommendedVideos';

const recommendedVideos = [
  {
    id: '1',
    title: 'Another Exciting Video',
    thumbnail: 'https://files.vidstack.io/sprite-fight/poster.webp',
    channelName: 'Channel Name',
    views: '500K views',
    uploadTime: '1 week ago'
  },
  {
    id: '2',
    title: 'Amazing Animation Showcase',
    thumbnail: 'https://i.ytimg.com/vi/DjG1E4n0PcA/maxresdefault.jpg',
    channelName: 'Animation Studio',
    views: '1.2M views',
    uploadTime: '2 weeks ago'
  },
  {
    id: '3',
    title: 'Creative Design Process',
    thumbnail: 'https://i.ytimg.com/vi/YJpeMcWenNY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCH52bhcWng5jwTtmQlzYiKhiizlA',
    channelName: 'Design Channel',
    views: '300K views',
    uploadTime: '3 days ago'
  }
];

export default function Home() {
  return (
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
  );
}
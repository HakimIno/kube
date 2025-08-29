import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  views: string;
  uploadTime: string;
}

interface RecommendedVideosProps {
  videos: Video[];
}

export const RecommendedVideos: React.FC<RecommendedVideosProps> = ({ videos }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">Recommended Videos</h2>
      <div className="space-y-3">
        {videos.map((video) => (
          <Link key={video.id} href={`/watch/${video.id}`}>
            <div className="group bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer">
              <div className="flex gap-3 p-2">
                <div className="relative w-[168px] h-[94px] flex-shrink-0">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
                    <Icon icon="solar:play-circle-bold" className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors text-sm line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {video.channelName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {video.views} • {video.uploadTime}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 
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
  duration?: string;
}

interface VideoListProps {
  videos: Video[];
  title?: string;
  layout?: 'grid' | 'list';
  showChannelInfo?: boolean;
}

export const VideoList: React.FC<VideoListProps> = ({ 
  videos, 
  title, 
  layout = 'grid',
  showChannelInfo = true 
}) => {
  if (layout === 'list') {
    return (
      <div className="w-full">
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
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
                    {video.duration && (
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {video.duration}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
                      <Icon icon="solar:play-circle-bold" className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors text-sm line-clamp-2">
                      {video.title}
                    </h3>
                    {showChannelInfo && (
                      <>
                        <p className="text-xs text-gray-400 mt-1">
                          {video.channelName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {video.views} • {video.uploadTime}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div className="w-full">
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videos.map((video) => (
          <Link key={video.id} href={`/watch/${video.id}`}>
            <div className="group cursor-pointer">
              <div className="relative aspect-video mb-2">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover rounded-lg"
                />
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <Icon icon="solar:play-circle-bold" className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors text-sm line-clamp-2">
                  {video.title}
                </h3>
                {showChannelInfo && (
                  <>
                    <p className="text-xs text-gray-400 mt-1">
                      {video.channelName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {video.views} • {video.uploadTime}
                    </p>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 
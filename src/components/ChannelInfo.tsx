import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export const ChannelInfo = () => {
  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
                            src="/avatar-placeholder.svg"
            alt="Channel Avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h2 className="text-base font-medium text-white">
              Channel Name
            </h2>
            <p className="text-sm text-gray-400">
              100K subscribers
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 text-sm">
          <Icon icon="solar:bell-bold" className="w-5 h-5" />
          <span>Subscribe</span>
        </button>
      </div>
      <div className="mt-4 bg-white/5 rounded-xl p-3">
        <p className="text-sm text-white whitespace-pre-line">
          This is a description of the Sprite Fight video. It contains exciting action and stunning visuals. Subscribe for more content like this!
        </p>
        <button className="text-sm text-gray-400 mt-1 hover:text-white transition-colors">
          Show more
        </button>
      </div>
    </div>
  );
}; 
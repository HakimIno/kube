import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import '../styles/animations.css'; // ตรวจสอบว่า import path ถูกต้อง

export const VideoInfo = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  // State นี้ใช้เป็น key เพื่อบังคับให้ React re-render และเล่น animation ใหม่ทุกครั้งที่กด
  const [animationKey, setAnimationKey] = useState(0);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl font-medium text-white">Sprite Fight</h1>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-4">
        {/* --- Video Stats --- */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>1M views</span>
          <span>•</span>
          <span>2 days ago</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Icon icon="solar:eye-bold" className="w-4 h-4" />
            1.2K watching
          </span>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex items-center gap-2 text-white">

          {/* === Like Button with Particle Effect === */}
          <button 
            onClick={handleLike}
            className="like-btn bg-white/10 hover:bg-white/20"
          >
            <div className={`icon-wrapper ${isLiked ? 'liked' : ''}`}>
              <Icon icon={isLiked ? "solar:like-bold" : "solar:like-linear"} className="w-5 h-5" />
              {[...Array(20)].map((_, index) => (
                <div key={index} className="particle" />
              ))}
            </div>
            <span>12K</span>
          </button>

          {/* === Dislike Button === */}
          <button 
            onClick={handleDislike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-sm unlike-button ${isDisliked ? 'active' : ''}`}
          >
            {/* เปลี่ยนไอคอนตาม isDisliked */}
            <Icon icon={isDisliked ? "solar:dislike-bold" : "solar:dislike-linear"} className="w-5 h-5" />
          </button>

          {/* === Other Buttons === */}
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-sm">
            <Icon icon="solar:share-bold" className="w-5 h-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-sm">
            <Icon icon="solar:menu-dots-bold" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
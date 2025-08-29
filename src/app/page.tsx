"use client";

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MainLayout } from '@/components/MainLayout';
import { VideoPlayer } from '@/components/VideoPlayer';
import { VideoInfo } from '@/components/VideoInfo';
import { ChannelInfo } from '@/components/ChannelInfo';
import { RecommendedVideos } from '@/components/RecommendedVideos';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

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
  const { user, token, refreshToken, isAuthenticated, refreshAuthToken, logout } = useAuth();
  const [tokenInfo, setTokenInfo] = useState<{
    expiresAt?: string;
    timeUntilExpiry?: string;
    isExpired?: boolean;
  }>({});

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiry = expirationTime - currentTime;
        
        setTokenInfo({
          expiresAt: new Date(expirationTime).toLocaleString(),
          timeUntilExpiry: timeUntilExpiry > 0 
            ? `${Math.floor(timeUntilExpiry / 1000 / 60)} minutes`
            : 'Expired',
          isExpired: timeUntilExpiry <= 0
        });
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, [token]);

  const handleManualRefresh = async () => {
    try {
      await refreshAuthToken();
      alert('Token refreshed successfully!');
    } catch (error) {
      alert('Failed to refresh token: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert('Logout successful!');
    } catch (error) {
      alert('Logout failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="flex flex-col lg:flex-row gap-6 pt-6">
          {/* Debug Section - Remove this in production */}
          <div className="w-full bg-gray-900 p-4 rounded-lg mb-4 max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold mb-2">Authentication Debug Info</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
              <p><strong>User ID:</strong> {user?.id}</p>
              <p><strong>User Name:</strong> {user?.name}</p>
              <p><strong>User Email:</strong> {user?.email}</p>
              <p><strong>User Role:</strong> {user?.role}</p>
              <p><strong>Access Token:</strong> {token ? `${token.substring(0, 20)}...` : 'None'}</p>
              <p><strong>Refresh Token:</strong> {refreshToken ? `${refreshToken.substring(0, 20)}...` : 'None'}</p>
              <p><strong>Token Expires At:</strong> {tokenInfo.expiresAt || 'Unknown'}</p>
              <p><strong>Time Until Expiry:</strong> {tokenInfo.timeUntilExpiry || 'Unknown'}</p>
              <p><strong>Token Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  tokenInfo.isExpired ? 'bg-red-600' : 'bg-green-600'
                }`}>
                  {tokenInfo.isExpired ? 'Expired' : 'Valid'}
                </span>
              </p>
            </div>
            
            <div className="mt-4 space-x-2">
              <button
                onClick={handleManualRefresh}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Manual Refresh Token
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Test Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          {/* <div className="w-full lg:w-[75%]">
            <VideoPlayer />
            <VideoInfo />
            <ChannelInfo />
          </div> */}

          {/* Recommended Videos */}
          {/* <div className="sticky top-20 overflow-y-auto">
            <RecommendedVideos videos={recommendedVideos} />
          </div> */}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  views: string;
  uploadTime: string;
  duration?: string;
  description?: string;
  videoUrl?: string;
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'Another Exciting Video',
    thumbnail: 'https://files.vidstack.io/sprite-fight/poster.webp',
    channelName: 'Channel Name',
    views: '500K views',
    uploadTime: '1 week ago',
    duration: '10:30',
    description: 'This is an exciting video with amazing content that will keep you entertained.',
    videoUrl: 'https://files.vidstack.io/sprite-fight/720p.mp4'
  },
  {
    id: '2',
    title: 'Amazing Animation Showcase',
    thumbnail: 'https://i.ytimg.com/vi/DjG1E4n0PcA/maxresdefault.jpg',
    channelName: 'Animation Studio',
    views: '1.2M views',
    uploadTime: '2 weeks ago',
    duration: '15:45',
    description: 'A stunning showcase of the latest animation techniques and creative processes.',
    videoUrl: 'https://files.vidstack.io/sprite-fight/720p.mp4'
  },
  {
    id: '3',
    title: 'Creative Design Process',
    thumbnail: 'https://i.ytimg.com/vi/YJpeMcWenNY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCH52bhcWng5jwTtmQlzYiKhiizlA',
    channelName: 'Design Channel',
    views: '300K views',
    uploadTime: '3 days ago',
    duration: '8:20',
    description: 'Learn about the creative design process from concept to final product.',
    videoUrl: 'https://files.vidstack.io/sprite-fight/720p.mp4'
  },
  {
    id: '4',
    title: 'Web Development Tutorial',
    thumbnail: 'https://i.ytimg.com/vi/1Rs2ND1ryYc/maxresdefault.jpg',
    channelName: 'Code Master',
    views: '750K views',
    uploadTime: '5 days ago',
    duration: '25:10',
    description: 'Complete tutorial on modern web development with React and TypeScript.',
    videoUrl: 'https://files.vidstack.io/sprite-fight/720p.mp4'
  },
  {
    id: '5',
    title: 'Music Production Tips',
    thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    channelName: 'Music Producer',
    views: '420K views',
    uploadTime: '1 day ago',
    duration: '12:35',
    description: 'Essential tips and tricks for music production in the digital age.',
    videoUrl: 'https://files.vidstack.io/sprite-fight/720p.mp4'
  },
  {
    id: '6',
    title: 'Cooking Masterclass',
    thumbnail: 'https://i.ytimg.com/vi/8rSH8-pbHZ0/maxresdefault.jpg',
    channelName: 'Chef Kitchen',
    views: '890K views',
    uploadTime: '4 days ago',
    duration: '18:45',
    description: 'Learn to cook delicious meals with professional techniques.',
    videoUrl: 'https://files.vidstack.io/sprite-fight/720p.mp4'
  },
  {
    id: '7',
    title: 'Fitness Workout Guide',
    thumbnail: 'https://i.ytimg.com/vi/7TLk7pscICk/maxresdefault.jpg',
    channelName: 'Fitness Pro',
    views: '650K views',
    uploadTime: '6 days ago',
    duration: '22:15',
    description: 'Complete workout guide for building strength and endurance.',
    videoUrl: 'https://files.vidstack.io/sprite-fight/720p.mp4'
  },
  {
    id: '8',
    title: 'Photography Techniques',
    thumbnail: 'https://i.ytimg.com/vi/3dQJIGeWjWM/maxresdefault.jpg',
    channelName: 'Photo Expert',
    views: '320K views',
    uploadTime: '2 days ago',
    duration: '14:30',
    description: 'Master the art of photography with these essential techniques.',
    videoUrl: 'https://files.vidstack.io/sprite-fight/720p.mp4'
  }
];

export const getVideoById = (id: string): Video | undefined => {
  return videos.find(video => video.id === id);
};

export const getRecommendedVideos = (currentVideoId?: string, limit: number = 10): Video[] => {
  const filteredVideos = currentVideoId 
    ? videos.filter(video => video.id !== currentVideoId)
    : videos;
  
  return filteredVideos.slice(0, limit);
}; 
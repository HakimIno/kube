import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { BackgroundElements } from './BackgroundElements';
import { defaultLayoutIcons } from './icon';

export const VideoPlayer = () => {

  const captions = [
    {
      "src": "https://files.vidstack.io/sprite-fight/subs/english.vtt",
      "label": "English",
      "language": "en-US",
      "kind": "subtitles" as const,
      "type": "vtt" as const,
      "default": true
    },
    {
      "src": "https://files.vidstack.io/sprite-fight/subs/spanish.vtt",
      "label": "Spanish",
      "language": "es-ES",
      "kind": "subtitles" as const,
      "type": "vtt" as const
    },
    {
      "src": "https://files.vidstack.io/sprite-fight/chapters.vtt",
      "language": "en-US",
      "kind": "chapters" as const,
      "type": "vtt" as const,
      "default": true
    }
  ]

  return (
    <div className="relative rounded-lg overflow-hidden bg-black/50 border border-black/50">
      <BackgroundElements />
      <MediaPlayer
        src="https://files.vidstack.io/sprite-fight/1080p.mp4"
        className="w-full aspect-video h-full"
        viewType='video'
        streamType='on-demand'
        logLevel='warn'
        playsInline
      >
        <MediaProvider

        >
          <Poster
            className="vds-poster"
            src="https://files.vidstack.io/sprite-fight/poster.webp"
            alt=""
          />

          {captions.map(track => (
            <Track {...track} key={track.src} />
          ))}
        </MediaProvider>

        <DefaultVideoLayout
          thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>
    </div>
  );
}; 
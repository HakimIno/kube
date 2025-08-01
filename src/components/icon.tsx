"use client";
import { Icon } from '@iconify/react';
import type { DefaultLayoutIconProps as VidstackIconProps } from '@vidstack/react/player/layouts/default';

function createIcon(iconName: string) {
    function DefaultLayoutIcon(props: VidstackIconProps) {
        const { className, style, ...rest } = props;
        return <Icon icon={iconName} className={className} style={{ ...style, width: '1.5rem', height: '1.5rem' }} />;
    }

    DefaultLayoutIcon.displayName = 'DefaultLayoutIcon';
    return DefaultLayoutIcon;
}

export const defaultLayoutIcons: DefaultLayoutIcons = {
    AirPlayButton: {
        Default: createIcon('iconoir:airplay-solid'),
    },
    GoogleCastButton: {
        Default: createIcon('iconoir:chromecast-active'),
    },
    PlayButton: {
        Play: createIcon('iconoir:play-solid'),
        Pause: createIcon('iconoir:pause-solid'),
        Replay: createIcon('iconoir:replay'),
    },
    MuteButton: {
        Mute: createIcon('iconoir:sound-off-solid'),
        VolumeLow: createIcon('iconoir:sound-low-solid'),
        VolumeHigh: createIcon('iconoir:sound-high-solid'),
    },
    CaptionButton: {
        On: createIcon('iconoir:closed-captions-tag-solid'),
        Off: createIcon('iconoir:closed-captions-tag'),
    },
    PIPButton: {
        Enter: createIcon('solar:to-pip-bold'),
        Exit: createIcon('iconoir:maximize'),
    },
    FullscreenButton: {
        Enter: createIcon('iconoir:expand'),
        Exit: createIcon('iconoir:collapse'),
    },
    SeekButton: {
        Backward: createIcon('iconoir:rewind'),
        Forward: createIcon('iconoir:forward'),
    },
    DownloadButton: {
        Default: createIcon('iconoir:download'),
    },
    Menu: {
        Accessibility: createIcon('iconoir:accessibility'),
        ArrowLeft: createIcon('iconoir:nav-arrow-left'),
        ArrowRight: createIcon('iconoir:nav-arrow-right'),
        Audio: createIcon('iconoir:music-double-note'),
        Chapters: createIcon('iconoir:list'),
        Captions: createIcon('iconoir:closed-captioning'),
        Playback: createIcon('iconoir:play'),
        Settings: createIcon('solar:settings-bold'),
        AudioBoostUp: createIcon('iconoir:sound-high-solid'),
        AudioBoostDown: createIcon('iconoir:sound-low-solid'),
        SpeedUp: createIcon('iconoir:forward'),
        SpeedDown: createIcon('iconoir:rewind'),
        QualityUp: createIcon('iconoir:nav-arrow-up'),
        QualityDown: createIcon('iconoir:nav-arrow-down'),
        FontSizeUp: createIcon('iconoir:text-size'),
        FontSizeDown: createIcon('iconoir:text-size'),
        OpacityUp: createIcon('iconoir:eye'),
        OpacityDown: createIcon('iconoir:eye-closed'),
        RadioCheck: createIcon('iconoir:check-circle'),
    },
    KeyboardDisplay: {
        Play: createIcon('iconoir:play'),
        Pause: createIcon('iconoir:pause'),
        Mute: createIcon('iconoir:volume-cross'),
        VolumeUp: createIcon('iconoir:volume-high'),
        VolumeDown: createIcon('iconoir:volume-low'),
        EnterFullscreen: createIcon('iconoir:maximize'),
        ExitFullscreen: createIcon('iconoir:minimize'),
        EnterPiP: createIcon('solar:to-pip-bold'),
        ExitPiP: createIcon('solar:quit-pip-bold'),
        CaptionsOn: createIcon('iconoir:closed-captioning'),
        CaptionsOff: createIcon('iconoir:closed-captioning-off'),
        SeekForward: createIcon('iconoir:forward'),
        SeekBackward: createIcon('iconoir:rewind'),
    },
};

export interface DefaultLayoutIconProps extends VidstackIconProps { }

export interface DefaultLayoutIcon {
    (props: DefaultLayoutIconProps): React.ReactNode;
}

export interface DefaultAirPlayButtonIcons {
    Default: DefaultLayoutIcon;
    Connecting?: DefaultLayoutIcon;
    Connected?: DefaultLayoutIcon;
}

export interface DefaultGoogleCastButtonIcons {
    Default: DefaultLayoutIcon;
    Connecting?: DefaultLayoutIcon;
    Connected?: DefaultLayoutIcon;
}

export interface DefaultPlayButtonIcons {
    Play: DefaultLayoutIcon;
    Pause: DefaultLayoutIcon;
    Replay: DefaultLayoutIcon;
}

export interface DefaultMuteButtonIcons {
    Mute: DefaultLayoutIcon;
    VolumeLow: DefaultLayoutIcon;
    VolumeHigh: DefaultLayoutIcon;
}

export interface DefaultCaptionButtonIcons {
    On: DefaultLayoutIcon;
    Off: DefaultLayoutIcon;
}

export interface DefaultPIPButtonIcons {
    Enter: DefaultLayoutIcon;
    Exit: DefaultLayoutIcon;
}

export interface DefaultFullscreenButtonIcons {
    Enter: DefaultLayoutIcon;
    Exit: DefaultLayoutIcon;
}

export interface DefaultSeekButtonIcons {
    Backward: DefaultLayoutIcon;
    Forward: DefaultLayoutIcon;
}

export interface DefaultDownloadButtonIcons {
    Default: DefaultLayoutIcon;
}

export interface DefaultMenuIcons {
    Accessibility: DefaultLayoutIcon;
    ArrowLeft: DefaultLayoutIcon;
    ArrowRight: DefaultLayoutIcon;
    Audio: DefaultLayoutIcon;
    AudioBoostUp: DefaultLayoutIcon;
    AudioBoostDown: DefaultLayoutIcon;
    Chapters: DefaultLayoutIcon;
    Captions: DefaultLayoutIcon;
    Playback: DefaultLayoutIcon;
    Settings: DefaultLayoutIcon;
    SpeedUp: DefaultLayoutIcon;
    SpeedDown: DefaultLayoutIcon;
    QualityUp: DefaultLayoutIcon;
    QualityDown: DefaultLayoutIcon;
    FontSizeUp: DefaultLayoutIcon;
    FontSizeDown: DefaultLayoutIcon;
    OpacityUp: DefaultLayoutIcon;
    OpacityDown: DefaultLayoutIcon;
    RadioCheck: DefaultLayoutIcon;
}

export interface DefaultKeyboardDisplayIcons {
    Play: DefaultLayoutIcon;
    Pause: DefaultLayoutIcon;
    Mute: DefaultLayoutIcon;
    VolumeUp: DefaultLayoutIcon;
    VolumeDown: DefaultLayoutIcon;
    EnterFullscreen: DefaultLayoutIcon;
    ExitFullscreen: DefaultLayoutIcon;
    EnterPiP: DefaultLayoutIcon;
    ExitPiP: DefaultLayoutIcon;
    CaptionsOn: DefaultLayoutIcon;
    CaptionsOff: DefaultLayoutIcon;
    SeekForward: DefaultLayoutIcon;
    SeekBackward: DefaultLayoutIcon;
}

export interface DefaultLayoutIcons {
    AirPlayButton: DefaultAirPlayButtonIcons;
    GoogleCastButton: DefaultGoogleCastButtonIcons;
    PlayButton: DefaultPlayButtonIcons;
    MuteButton: DefaultMuteButtonIcons;
    CaptionButton: DefaultCaptionButtonIcons;
    PIPButton: DefaultPIPButtonIcons;
    FullscreenButton: DefaultFullscreenButtonIcons;
    SeekButton: DefaultSeekButtonIcons;
    DownloadButton?: DefaultDownloadButtonIcons;
    Menu: DefaultMenuIcons;
    KeyboardDisplay?: Partial<DefaultKeyboardDisplayIcons>;
}
'use client';

import { Player } from '@remotion/player';
import { FarmDashboardComposition } from './FarmDashboardComposition';
import {
  DASHBOARD_DURATION,
  DASHBOARD_FPS,
  DASHBOARD_HEIGHT,
  DASHBOARD_WIDTH,
} from './dashboardConfig';

export default function DashboardPlayer() {
  return (
    <Player
      component={FarmDashboardComposition}
      durationInFrames={DASHBOARD_DURATION}
      fps={DASHBOARD_FPS}
      compositionWidth={DASHBOARD_WIDTH}
      compositionHeight={DASHBOARD_HEIGHT}
      style={{
        width: '100%',
        height: '100%',
      }}
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
      showVolumeControls={false}
      initiallyMuted
      numberOfSharedAudioTags={0}
    />
  );
}

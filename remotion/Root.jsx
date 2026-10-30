import { Composition } from 'remotion';
import { FarmDashboardComposition } from '../app/components/remotion/FarmDashboardComposition';
import {
  DASHBOARD_DURATION,
  DASHBOARD_FPS,
  DASHBOARD_HEIGHT,
  DASHBOARD_WIDTH,
} from '../app/components/remotion/dashboardConfig';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="FarmDashboard"
        component={FarmDashboardComposition}
        durationInFrames={DASHBOARD_DURATION}
        fps={DASHBOARD_FPS}
        width={DASHBOARD_WIDTH}
        height={DASHBOARD_HEIGHT}
      />
    </>
  );
};

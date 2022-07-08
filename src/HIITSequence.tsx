import { AbsoluteFill, useCurrentFrame } from 'remotion';

import './HIITSequence.css';

export const HIITSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const endFrame = 60 * 24;
  const seconds = Math.floor((endFrame - frame - 1) / 24);
  const minutes = Math.floor(seconds / 60);

  const ss = `00${seconds % 60}`.slice(-2);
  const mm = `00${minutes % 60}`.slice(-2);

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <div className="_counter">
        {mm}:{ss}
      </div>
    </AbsoluteFill>
  );
};

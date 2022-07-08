import { AbsoluteFill } from 'remotion';

import './HIITSequence.css';

export const HIITSequence: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <div className="_counter">00:00</div>
    </AbsoluteFill>
  );
};

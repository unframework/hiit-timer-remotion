import { Composition } from 'remotion';
import { HIITSequence, TOTAL_S } from './HIITSequence';

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="HIITSequence"
        component={HIITSequence}
        durationInFrames={TOTAL_S * 24}
        fps={24}
        width={854}
        height={480}
      />
    </>
  );
};

import { Composition } from 'remotion';
import { HIITSequence } from './HIITSequence';

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="HIITSequence"
        component={HIITSequence}
        durationInFrames={24 * 90}
        fps={24}
        width={1280}
        height={720}
      />
    </>
  );
};

import {
  Audio,
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  staticFile,
} from 'remotion';

import './HIITSequence.css';

export const HIITSequence: React.FC = () => {
  const endFrame = 60 * 24;

  const frame = useCurrentFrame();

  const seconds = Math.floor((endFrame - frame + 23) / 24);
  const minutes = Math.floor(seconds / 60);

  const ss = `00${seconds % 60}`.slice(-2);
  const mm = `00${minutes % 60}`.slice(-2);

  // Line up four beeps at the end of the period
  const blips = [1, 2, 3, 4];

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {blips.map((tminus) => (
        <Sequence
          key={tminus}
          name={`Blip T-${tminus}`}
          from={endFrame - tminus * 24}
          durationInFrames={24}
        >
          <Audio src={staticFile('blip.wav')} />
        </Sequence>
      ))}

      <div className="_counter">
        {mm}:{ss}
      </div>
    </AbsoluteFill>
  );
};

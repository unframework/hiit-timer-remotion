import {
  Audio,
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  staticFile,
} from 'remotion';

import './HIITSequence.css';

export const WorkClip: React.FC = () => {
  const frame = useCurrentFrame();

  // count up
  const seconds = Math.floor(frame / 24);
  const minutes = Math.floor(seconds / 60);

  const ss = `00${seconds % 60}`.slice(-2);
  const mm = `00${minutes % 60}`.slice(-2);

  const beeps = [...new Array(30)];

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {beeps.map((_, index) => (
        <Sequence from={index * 24}>
          <Audio src={staticFile('active.wav')} />
        </Sequence>
      ))}

      <div className="_counter">
        {mm}:{ss}
      </div>
    </AbsoluteFill>
  );
};

export const RestClip: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const seconds = Math.floor((durationInFrames - frame + 23) / 24);
  const minutes = Math.floor(seconds / 60);

  const ss = `00${seconds % 60}`.slice(-2);
  const mm = `00${minutes % 60}`.slice(-2);

  // Line up four beeps at the end of the period
  const blips = [1, 2, 3, 4];

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <Audio src={staticFile('chime.wav')} />

      {blips.map((tminus) => (
        <Sequence
          key={tminus}
          name={`Blip T-${tminus}`}
          from={durationInFrames - tminus * 24}
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

export const HIITSequence: React.FC = () => {
  const endFrame = 60 * 24;

  return (
    <>
      <Sequence from={0} durationInFrames={24 * 30}>
        <WorkClip />
      </Sequence>
      <Sequence from={24 * 30} durationInFrames={24 * 60}>
        <RestClip durationInFrames={endFrame} />
      </Sequence>
    </>
  );
};

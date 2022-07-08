import React from 'react';
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

  // Count up
  const seconds = Math.floor(frame / 24);
  const minutes = Math.floor(seconds / 60);

  const ss = `00${seconds % 60}`.slice(-2);
  const mm = `00${minutes % 60}`.slice(-2);

  const beeps = [...new Array(30)];

  return (
    <AbsoluteFill style={{ backgroundColor: 'orange' }}>
      {beeps.map((_, index) => (
        <Sequence from={index * 24}>
          <Audio src={staticFile('active.wav')} />
        </Sequence>
      ))}

      <div className="_counter -active">
        {mm}:{ss}
      </div>
    </AbsoluteFill>
  );
};

export const RestClip: React.FC<{ text: string; durationInFrames: number }> = ({
  text,
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
    <AbsoluteFill style={{ backgroundColor: 'green' }}>
      <Audio src={staticFile('chime.wav')} />

      {blips.map((tminus) => (
        <Sequence
          key={tminus}
          name={`Blip T-${tminus}`}
          from={durationInFrames - tminus * 24}
          durationInFrames={24}
        >
          <Audio volume={1.2} src={staticFile('blip.wav')} />
        </Sequence>
      ))}

      {seconds <= 10 ? (
        <div className="_counter">
          {mm}:{ss}
        </div>
      ) : (
        <div className="_counter">{text}</div>
      )}

      <div
        className="_progress"
        style={{ width: `${(100 * frame) / durationInFrames}%` }}
      />
    </AbsoluteFill>
  );
};

const WARMUP_S = 300;
const COOLDOWN_S = 300;
const WORK_S = 30;
const REST_S = 150;

export const TOTAL_S = WARMUP_S + 5 * (WORK_S + REST_S) - REST_S + COOLDOWN_S;

export const HIITSequence: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={WARMUP_S * 24}>
        <RestClip text="WARMUP" durationInFrames={WARMUP_S * 24} />
      </Sequence>

      {[0, 1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <Sequence
            from={(WARMUP_S + step * (WORK_S + REST_S)) * 24}
            durationInFrames={WORK_S * 24}
          >
            <WorkClip />
          </Sequence>
          {step < 4 ? (
            <Sequence
              from={(WARMUP_S + step * (WORK_S + REST_S) + WORK_S) * 24}
              durationInFrames={REST_S * 24}
            >
              <RestClip text="NICE" durationInFrames={REST_S * 24} />
            </Sequence>
          ) : null}
        </React.Fragment>
      ))}

      <Sequence
        from={(WARMUP_S + 5 * (WORK_S + REST_S) - REST_S) * 24}
        durationInFrames={COOLDOWN_S * 24}
      >
        <RestClip text="COOLDOWN" durationInFrames={COOLDOWN_S * 24} />
      </Sequence>
    </>
  );
};

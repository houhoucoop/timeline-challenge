import { useState } from "react";
import {
  DEFAULT_DURATION_TIME,
  REF_KEYS,
  PLAYHEAD_WIDTH,
  SEGMENT_COUNTS,
} from "./utils/constants";
import { useScrollX } from "./hooks/useScrollX";
import { Playhead } from "./Playhead";
import { Ruler } from "./Ruler";
import { TrackList } from "./TrackList";
import { KeyframeList } from "./KeyframeList";
import { PlayControls } from "./PlayControls";
import { Segment } from "./Segment";

export const Timeline = () => {
  const { scrollRefs } = useScrollX();

  // FIXME: performance concerned
  const [time, setTime] = useState(0);
  const [durationTime, setDurationTime] = useState(DEFAULT_DURATION_TIME);

  const setRef = (key: string) => (element: HTMLDivElement) => {
    if (element) {
      scrollRefs.current.set(key, element);
    } else {
      scrollRefs.current.delete(key);
    }
  };

  const durationWidth = `${durationTime}px`;

  const rulerRef = scrollRefs.current.get(REF_KEYS.RULER);
  const keyframeListRef = scrollRefs.current.get(REF_KEYS.KEYFRAME_LIST);
  const playheadScrollX =
    rulerRef?.scrollLeft ?? keyframeListRef?.scrollLeft ?? 0;
  const playheadPosition = time - playheadScrollX;
  const isPlayheadVisible = playheadPosition + PLAYHEAD_WIDTH >= 0;

  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr]
    bg-gray-800 border-t-2 border-solid border-gray-700"
      data-testid="timeline"
    >
      <PlayControls
        time={time}
        setTime={setTime}
        durationTime={durationTime}
        setDurationTime={setDurationTime}
      />
      <Ruler
        ref={setRef(REF_KEYS.RULER)}
        width={durationWidth}
        setTime={setTime}
      />
      <TrackList />
      <KeyframeList ref={setRef(REF_KEYS.KEYFRAME_LIST)}>
        {Array.from({ length: SEGMENT_COUNTS }).map((_, index) => (
          <Segment key={index} width={durationWidth} />
        ))}
      </KeyframeList>
      <Playhead position={playheadPosition} isVisible={isPlayheadVisible} />
    </div>
  );
};

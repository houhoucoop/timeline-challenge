import { useState, useEffect } from "react";
import {
  DEFAULT_DURATION_TIME,
  REF_KEYS,
  PLAYHEAD_WIDTH,
} from "./utils/constants";
import { useSyncScroll } from "./hooks/useSyncScroll";
import { Playhead } from "./Playhead";
import { Ruler } from "./Ruler";
import { TrackList } from "./TrackList";
import { KeyframeList } from "./KeyframeList";
import { PlayControls } from "./PlayControls";

export const Timeline = () => {
  const { setRef, scrollLeft = 0 } = useSyncScroll();

  const [time, setTime] = useState(0);
  const [durationTime, setDurationTime] = useState(DEFAULT_DURATION_TIME);

  // ensure current time does not exceed duration time
  useEffect(() => {
    if (time > durationTime) {
      setTime(durationTime);
    }
  }, [time, durationTime, setTime]);

  const durationWidth = `${durationTime}px`;
  const playheadPosition = time - scrollLeft;
  const isPlayheadVisible = playheadPosition + PLAYHEAD_WIDTH >= 0;

  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr]
    bg-gray-800 border-t-2 border-solid border-gray-700"
      data-testid="timeline"
    >
      <PlayControls
        time={time}
        onTimeChange={setTime}
        durationTime={durationTime}
        onDurationTimeChange={setDurationTime}
      />
      <Ruler
        ref={setRef(REF_KEYS.RULER)}
        width={durationWidth}
        onTimeChange={setTime}
      />
      <TrackList ref={setRef(REF_KEYS.TRACK_LIST)} />
      <KeyframeList
        ref={setRef(REF_KEYS.KEYFRAME_LIST)}
        width={durationWidth}
      />
      <Playhead position={playheadPosition} isVisible={isPlayheadVisible} />
    </div>
  );
};

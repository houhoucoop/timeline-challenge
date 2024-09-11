import { useEffect } from "react";
import { NumberInput } from "./NumberInput";
import {
  DEFAULT_STEP,
  CURRENT_MIN_TIME,
  DURATION_MIN_TIME,
  DURATION_MAX_TIME,
  DEFAULT_DURATION_TIME,
} from "./utils/constants";

type PlayControlsProps = {
  time: number;
  setTime: (time: number) => void;
  durationTime?: number;
  setDurationTime: (time: number) => void;
};

export const PlayControls = ({
  time,
  setTime,
  durationTime = DEFAULT_DURATION_TIME,
  setDurationTime,
}: PlayControlsProps) => {
  // ensure current time does not exceed duration time
  useEffect(() => {
    if (time > durationTime) {
      setTime(durationTime);
    }
  }, [time, durationTime, setTime]);

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700
 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <NumberInput
          dataTestId="time"
          value={time}
          defaultValue={time}
          min={CURRENT_MIN_TIME}
          max={durationTime}
          step={DEFAULT_STEP}
          onChange={setTime}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <NumberInput
          dataTestId="max-time"
          value={durationTime}
          defaultValue={durationTime}
          min={DURATION_MIN_TIME}
          max={DURATION_MAX_TIME}
          step={DEFAULT_STEP}
          onChange={setDurationTime}
        />
        Duration
      </fieldset>
    </div>
  );
};

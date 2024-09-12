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
  onTimeChange: (time: number) => void;
  durationTime?: number;
  onDurationTimeChange: (time: number) => void;
};

export const PlayControls = ({
  time,
  onTimeChange,
  durationTime = DEFAULT_DURATION_TIME,
  onDurationTimeChange,
}: PlayControlsProps) => {
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
          onChange={onTimeChange}
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
          onChange={onDurationTimeChange}
        />
        Duration
      </fieldset>
    </div>
  );
};

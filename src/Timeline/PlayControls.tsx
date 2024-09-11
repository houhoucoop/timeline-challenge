import { NumberInput } from "./NumberInput";

type PlayControlsProps = {
  time: number;
  setTime: (time: number) => void;
};

export const PlayControls = ({ time, setTime }: PlayControlsProps) => {
  const handleCurrentChange = (value: number) => setTime(value);

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
          min={0}
          max={2000}
          step={10}
          onChange={handleCurrentChange}
          defaultValue={0}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="max-time"
          min={100}
          max={2000}
          step={10}
          defaultValue={2000}
        />
        Duration
      </fieldset>
    </div>
  );
};

import { DEFAULT_DURATION_TIME } from "./utils/constants";

type SegmentProps = {
  width?: string;
};

export const Segment = ({
  width = `${DEFAULT_DURATION_TIME}px`,
}: SegmentProps) => {
  return (
    <div className="py-2" data-testid="segment" style={{ width }}>
      <div className="h-6 rounded-md bg-white/10"></div>
    </div>
  );
};

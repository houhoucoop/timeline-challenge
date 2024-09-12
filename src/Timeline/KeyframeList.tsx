import { forwardRef, memo } from "react";
import { Segment } from "./Segment";
import { DEFAULT_DURATION_TIME, SEGMENT_COUNTS } from "./utils/constants";

type KeyframeListProps = {
  width?: string;
};

export const KeyframeList = memo(
  forwardRef<HTMLDivElement, KeyframeListProps>(
    ({ width = `${DEFAULT_DURATION_TIME}px` }, ref) => {
      return (
        <div
          className="px-4 min-w-0 overflow-auto"
          data-testid="keyframe-list"
          ref={ref}
        >
          {Array.from({ length: SEGMENT_COUNTS }).map((_, index) => (
            <Segment key={index} width={width} />
          ))}
        </div>
      );
    }
  )
);

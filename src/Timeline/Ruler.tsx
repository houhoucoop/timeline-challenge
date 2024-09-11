import { useRef, forwardRef, MouseEvent } from "react";
import { DEFAULT_DURATION_TIME } from "./utils/constants";

type RulerProps = {
  width?: string;
  setTime: (time: number) => void;
};

export const Ruler = forwardRef<HTMLDivElement, RulerProps>(
  ({ width = `${DEFAULT_DURATION_TIME}px`, setTime }, ref) => {
    const isDragging = useRef(false);

    const getRoundedValue = (offsetX: number): number => {
      return Math.round(offsetX / 10) * 10;
    };

    const handleDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const roundedValue = getRoundedValue(x);

      setTime(roundedValue);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault(); // prevents text selection during dragging
      isDragging.current = true;
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (isDragging.current) {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const roundedValue = getRoundedValue(x);
        setTime(roundedValue);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    return (
      <div
        className="px-4 py-2 min-w-0
      border-b border-solid border-gray-700
      overflow-x-auto overflow-y-hidden"
        data-testid="ruler"
        ref={ref}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="h-6 rounded-md bg-white/25" style={{ width }}></div>
      </div>
    );
  }
);

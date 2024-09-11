import { forwardRef, ReactNode } from "react";

type KeyframeListProps = {
  children: ReactNode;
};

export const KeyframeList = forwardRef<HTMLDivElement, KeyframeListProps>(
  ({ children }, ref) => {
    return (
      <div
        className="px-4 min-w-0 overflow-auto"
        data-testid="keyframe-list"
        ref={ref}
      >
        {children ? children : null}
      </div>
    );
  }
);

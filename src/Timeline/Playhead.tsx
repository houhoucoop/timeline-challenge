type PlayheadProps = {
  position: number;
  isVisible: boolean;
};

export const Playhead = ({ position, isVisible }: PlayheadProps) => {
  return (
    <div
      className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10"
      data-testid="playhead"
      style={{
        transform: `translateX(${position}px)`,
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};

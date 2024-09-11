import { useState, useRef, useEffect } from "react";

export const useScrollX = () => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRefs = useRef(new Map());

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      setScrollLeft(target.scrollLeft);
    };

    scrollRefs.current.forEach((ref) => {
      ref?.addEventListener("scroll", handleScroll);
    });

    return () => {
      scrollRefs.current.forEach((ref) => {
        ref?.removeEventListener("scroll", handleScroll);
      });
    };
  }, []);

  useEffect(() => {
    scrollRefs.current.forEach((ref) => {
      if (ref) ref.scrollLeft = scrollLeft;
    });
  }, [scrollLeft]);

  return { scrollRefs };
};

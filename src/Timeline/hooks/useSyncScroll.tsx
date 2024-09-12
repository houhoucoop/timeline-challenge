import { useEffect, useRef, useState } from "react";
import { REF_KEYS } from "../utils/constants";

const HORIZONTAL_SCROLL_KEYS = new Set([
  REF_KEYS.RULER,
  REF_KEYS.KEYFRAME_LIST,
]);
const VERTICAL_SCROLL_KEYS = new Set([
  REF_KEYS.TRACK_LIST,
  REF_KEYS.KEYFRAME_LIST,
]);

export const useSyncScroll = () => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRefs = useRef(new Map<string, HTMLDivElement>());

  const setRef = (key: string) => (element: HTMLDivElement | null) => {
    if (element) {
      scrollRefs.current.set(key, element);
    } else {
      scrollRefs.current.delete(key);
    }
  };

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const targetKey = Array.from(scrollRefs.current.entries()).find(
        ([_, ref]) => ref === target
      )?.[0];

      if (!targetKey) return;

      // update horizontal scroll
      if (HORIZONTAL_SCROLL_KEYS.has(targetKey)) {
        setScrollLeft(target.scrollLeft);
      }

      // update vertical scroll
      if (VERTICAL_SCROLL_KEYS.has(targetKey)) {
        setScrollTop(target.scrollTop);
      }
    };

    const refs = Array.from(scrollRefs.current.values());
    refs.forEach((ref) => ref.addEventListener("scroll", handleScroll));

    return () => {
      refs.forEach((ref) => ref.removeEventListener("scroll", handleScroll));
    };
  }, []);

  // sync horizontal scroll
  useEffect(() => {
    HORIZONTAL_SCROLL_KEYS.forEach((key) => {
      const element = scrollRefs.current.get(key);
      if (element) {
        element.scrollLeft = scrollLeft;
      }
    });
  }, [scrollLeft]);

  // sync vertical scroll
  useEffect(() => {
    VERTICAL_SCROLL_KEYS.forEach((key) => {
      const element = scrollRefs.current.get(key);
      if (element) {
        element.scrollTop = scrollTop;
      }
    });
  }, [scrollTop]);

  return { scrollRefs, scrollLeft, scrollTop, setRef };
};

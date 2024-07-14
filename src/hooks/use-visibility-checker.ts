import { RefObject, useEffect, useRef } from 'react';

interface UseVisibilityCheckerProps {
  ref: RefObject<Element>;
  marginTop?: number;
  marginBottom?: number;
  onChange?: () => void;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterOnce?: () => void;
}

export function useVisibilityChecker({
  ref,
  marginTop = 0,
  marginBottom = 0,
  onChange,
  onEnter,
  onLeave,
  onEnterOnce
}: UseVisibilityCheckerProps) {
  const state = useRef<{
    triggered: boolean;
    wasVisible: boolean;
    isVisible: boolean;
    io: IntersectionObserver | null;
  }>({
    triggered: false,
    wasVisible: false,
    isVisible: false,
    io: typeof window !== 'undefined'
      ? new IntersectionObserver(handleIntersection, {
          rootMargin: `${marginBottom}px 0px ${marginTop}px 0px`,
        })
      : null,
  }).current;

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (ref.current === entry.target) {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          state.isVisible = true;
          state.wasVisible = false;
        } else {
          state.isVisible = false;
          state.wasVisible = true;
        }
        runCallbacks();
      }
    });
  }

  function runCallbacks() {
    if (state.wasVisible !== state.isVisible) {
      if (onChange) onChange();
      if (state.isVisible) {
        if (onEnter) onEnter();
      } else {
        if (onLeave) onLeave();
      }

      if (state.isVisible && !state.triggered) {
        state.triggered = true;
        if (onEnterOnce) onEnterOnce();
      }
    }
  }

  useEffect(() => {
    const node = ref.current;
    if (node && state.io) state.io.observe(node);

    return () => {
      if (node && state.io) state.io.unobserve(node);
    };
  }, [ref, state.io]);
}
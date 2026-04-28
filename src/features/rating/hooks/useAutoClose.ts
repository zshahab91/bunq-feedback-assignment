import { useEffect, useRef } from "react";
import type { FlowState } from "../types";

export function useAutoClose(
  step: FlowState["step"],
  delayMs: number,
  onElapsed: () => void,
) {
  const onElapsedRef = useRef(onElapsed);

  useEffect(() => {
    onElapsedRef.current = onElapsed;
  }, [onElapsed]);

  useEffect(() => {
    if (step !== "thankyou") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onElapsedRef.current();
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [step, delayMs]);
}

import { useEffect, useState } from "react";

export const useMousePosition = ({
  mode,
  ref = window,
  scroll = "xy",
  scrollTarget = window,
}: {
  mode: "client" | "page" | "screen" | "offset";
  ref?: (HTMLElement & typeof globalThis) | (Window & typeof globalThis);
  scroll?: "x" | "y" | "xy" | "none";
  scrollTarget?:
    | (HTMLElement & typeof globalThis)
    | (Window & typeof globalThis);
}): { x: number; y: number } => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const sX = scroll === "x" || scroll === "xy" ? scrollTarget.scrollX : 0;
    const sY = scroll === "y" || scroll === "xy" ? scrollTarget.scrollY : 0;
    const setFromEvent = (e: MouseEvent): void => {
      if (mode === "client") {
        return setPosition({ x: e.clientX - sX, y: e.clientY - sY });
      }
      if (mode === "page") {
        return setPosition({ x: e.pageX - sX, y: e.pageY - sY });
      }
      if (mode === "screen") {
        return setPosition({ x: e.screenX - sX, y: e.screenY - sY });
      }
      return setPosition({ x: e.offsetX - sX, y: e.offsetY - sY });
    };

    ref.addEventListener("mousemove", setFromEvent);

    return () => {
      ref.addEventListener("mousemove", setFromEvent);
    };
  }, [mode, ref, scrollTarget, scroll]);

  return position;
};

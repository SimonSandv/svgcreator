import { createEvent, createStore } from "effector";
import { removeUndefined } from "index";
import type { SvgMousePos } from "types";

export const setSvgMousePos = createEvent<Partial<SvgMousePos>>();

export const $svgMousePos = createStore<SvgMousePos>({
  x: 0,
  y: 0,
}).on(setSvgMousePos, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

import { createEvent, createStore } from "effector";
import { removeUndefined } from "../util/utilityFunctions";

export type SvgMousePos = {
  x: number;
  y: number;
};

export const setSvgMousePos = createEvent<Partial<SvgMousePos>>();

export const $svgMousePos = createStore<SvgMousePos>({
  x: 0,
  y: 0,
}).on(setSvgMousePos, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

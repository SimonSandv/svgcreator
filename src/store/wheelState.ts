import { createEvent, createStore } from "effector";
import { removeUndefined } from "index";
import type { WheelState } from "types";

export const setWheelState = createEvent<Partial<WheelState>>();

export const $wheelState = createStore<WheelState>({
  outerCenterPos: { x: 0, y: 0 },
  outerPos: { x: 0, y: 0 },
  innerPos: { x: 0, y: 0 },
  innerPosMem: { x: 0, y: 0 },
  innerPressed: false,
  outerPressed: false,
  angle: 0,
  angleMem: 0,
  sat: 100,
  light: 50,
}).on(setWheelState, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

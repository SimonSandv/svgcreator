import { createEvent, createStore } from "effector";
import { removeUndefined } from "../util/utilityFunctions";

export type WheelState = {
  cord: { x: number; y: number };
  pos: { x: number; y: number };
  posMem: { x: number; y: number };
  innerPressed: boolean;
  outerPressed: boolean;
  angle: number;
  angleMem: number;
  sat: number;
  light: number;
};

export const setWheelState = createEvent<Partial<WheelState>>();

export const $wheelState = createStore<WheelState>({
  cord: { x: 0, y: 0 },
  pos: { x: 0, y: 0 },
  posMem: { x: 0, y: 0 },
  innerPressed: false,
  outerPressed: false,
  angle: 0,
  angleMem: 0,
  sat: 100,
  light: 50,
}).on(setWheelState, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

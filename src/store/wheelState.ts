import { createEvent, createStore } from "effector";
import { removeUndefined } from "../util/utilityFunctions";

export type WheelState = {
  pressed: boolean;
  angle: number;
};

export const setWheelState = createEvent<Partial<WheelState>>();

export const $wheelState = createStore<WheelState>({
  pressed: false,
  angle: 0,
}).on(setWheelState, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

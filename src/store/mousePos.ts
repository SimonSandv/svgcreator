import { createEvent, createStore } from "effector";
import { removeUndefined } from "../util/utilityFunctions";

export type MousePos = {
  x: number;
  y: number;
};

export const setMousePos = createEvent<Partial<MousePos>>();

export const $mousePos = createStore<MousePos>({
  x: 0,
  y: 0,
}).on(setMousePos, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

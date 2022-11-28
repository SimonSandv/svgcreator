import { createEvent, createStore } from "effector";
import { removeUndefined } from "index";
import type { MousePos } from "types";

export const setMousePos = createEvent<Partial<MousePos>>();

export const $mousePos = createStore<MousePos>({
  x: 0,
  y: 0,
}).on(setMousePos, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

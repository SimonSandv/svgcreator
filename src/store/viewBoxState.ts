import { createEvent, createStore } from "effector";
import { RecursivePartial, ViewBoxState } from "types";
import { removeUndefined } from "index";

export const setViewBoxState = createEvent<RecursivePartial<ViewBoxState>>();

export const $viewBoxState = createStore<ViewBoxState>({
  x: 0,
  y: 0,
  width: 100,
  height: 50,
}).on(setViewBoxState, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

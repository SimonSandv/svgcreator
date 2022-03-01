import { createEvent, createStore } from "effector";
import { RecursivePartial } from "../util/utilityTypes";
import { removeUndefined } from "../util/utilityFunctions";

export type ViewBoxState = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const setViewBoxState = createEvent<RecursivePartial<ViewBoxState>>();

export const $viewBoxState = createStore<ViewBoxState>({
  x: 0,
  y: 0,
  width: 100,
  height: 50,
}).on(setViewBoxState, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

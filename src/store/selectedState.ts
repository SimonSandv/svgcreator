import { createStore, createEvent } from "effector";
import { removeUndefined } from "../util/utilityFunctions";

export type SelectedState = {
  mode: string;
  pathIndex: number;
  lineIndex: number;
  inputIndex: number;
  point: string;
  drag: boolean;
};
export const setSelectedState = createEvent<Partial<SelectedState>>();
export const $selectedState = createStore<SelectedState>({
  mode: "line",
  pathIndex: -1,
  lineIndex: 0,
  inputIndex: 0,
  point: "endPos",
  drag: false,
}).on(setSelectedState, (state, payload) => {
  const noUndef = removeUndefined(payload);
  return { ...state, ...noUndef };
});

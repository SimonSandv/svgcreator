import { createEvent, createStore } from "effector";
import { RecursivePartial } from "../util/utilityTypes";
import { removeUndefined } from "../util/utilityFunctions";

export type GridState = {
  display: boolean;
  smallGrid: { display: boolean; opacity: number; color: string };
  largeGrid: { display: boolean; opacity: number; color: string };
};
export const setGridState = createEvent<RecursivePartial<GridState>>();
export const $gridState = createStore<GridState>({
  display: true,
  smallGrid: { display: true, opacity: 10, color: "silver" },
  largeGrid: { display: true, opacity: 20, color: "silver" },
}).on(setGridState, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

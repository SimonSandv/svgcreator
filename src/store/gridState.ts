import { createEvent, createStore } from "effector";
import { RecursivePartial, GridState } from "types";
import { removeUndefined } from "../util/utilityFunctions";

export const setGridState = createEvent<RecursivePartial<GridState>>();
export const $gridState = createStore<GridState>({
  display: true,
  smallGrid: { display: true, opacity: 10, color: "silver" },
  largeGrid: { display: true, opacity: 20, color: "silver" },
}).on(setGridState, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

import { createEvent, createStore } from "effector";
import { RecursivePartial } from "../util/utilityTypes";
import { removeUndefined } from "../util/utilityFunctions";

export type WidgetState = {
  show: "none" | "tool";
};

export const setWidgetState = createEvent<RecursivePartial<WidgetState>>();

export const $widgetState = createStore<WidgetState>({
  show: "none",
}).on(setWidgetState, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

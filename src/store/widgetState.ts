import { createEvent, createStore } from "effector";
import type { WidgetState, RecursivePartial } from "types";
import { removeUndefined } from "index";

export const setWidgetState = createEvent<RecursivePartial<WidgetState>>();

export const $widgetState = createStore<WidgetState>({
  show: "none",
}).on(setWidgetState, (state, payload): WidgetState => {
  return { ...state, ...removeUndefined(payload) };
});

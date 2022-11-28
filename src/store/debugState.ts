import { createEvent, createStore } from "effector";
import { RecursivePartial, DebugPoint, DebugState } from "../util/utilityTypes";
import { removeUndefined } from "../util/utilityFunctions";

export const updateDebugPoint = createEvent<RecursivePartial<DebugPoint>>();

export const setDebugState = createEvent<RecursivePartial<DebugState>>();

export const $debugState = createStore<DebugState>({
  debugPoint: {
    pos: { abs: { x: 0, y: 0 }, rel: { x: 0, y: 0 } },
    show: true,
    radius: 1,
  },
}).on(setDebugState, (state, payload) => {
  return { ...state, ...removeUndefined(payload) };
});

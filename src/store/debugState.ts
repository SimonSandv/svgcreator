import { createEvent, createStore } from "effector";
import { RecursivePartial } from "../util/utilityTypes";
import { removeUndefined } from "../util/utilityFunctions";

export interface DebugPoint {
  pos?: { abs: { x: number; y: number }; rel: { x: number; y: number } };
  show?: boolean;
  radius?: number;
}
export const updateDebugPoint = createEvent<RecursivePartial<DebugPoint>>();

export type DebugState = {
  debugPoint: DebugPoint;
};

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

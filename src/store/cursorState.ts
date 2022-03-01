import { createEvent, createStore } from "effector";
import { RecursivePartial } from "../util/utilityTypes";
import { removeUndefined } from "../util/utilityFunctions";

export type CursorState = {
  shape: "circle" | "rect";
  pos: { x: number; y: number };
  snap: boolean;
  hover: boolean;
};

export const setCursorState = createEvent<RecursivePartial<CursorState>>();
export const toggleSnap = createEvent();
export const setHover = createEvent<{ hover: boolean }>();

export const $cursorState = createStore<CursorState>({
  shape: "circle",
  pos: { x: 0, y: 0 },
  snap: true,
  hover: false,
})
  .on(setCursorState, (state, payload) => {
    return { ...state, ...removeUndefined(payload) };
  })
  .on(toggleSnap, (state) => {
    return {
      ...state,
      snap: !state.snap,
    };
  })
  .on(setHover, (state, { hover }) => {
    return {
      ...state,
      hover,
    };
  });

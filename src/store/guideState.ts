import { createStore, createEvent } from "effector";
import { Color, RecursivePartial, GuideState } from "types";
import { removeUndefined } from "index";

export const setGuideState = createEvent<RecursivePartial<GuideState>>();
export const $guideState = createStore<GuideState>({
  show: true,
  endPos: {
    show: true,
    point: {
      show: true,
      radius: 0.5,
      fill: {
        default: "plum",
        hover: "plum",
        selected: "plum",
        inactive: "lightGray",
      },
      stroke: {
        default: "transparent",
        hover: "powderBlue",
        selected: "powderBlue",
        inactive: "transparent",
      },
      strokeWidth: 0.25,
    },
  },
  startControl: {
    show: true,
    point: {
      show: true,
      radius: 0.5,
      fill: {
        default: "paleGreen",
        hover: "paleGreen",
        selected: "paleGreen",
        inactive: "lightGray",
      },
      stroke: {
        default: "transparent",
        hover: "powderBlue",
        selected: "powderBlue",
        inactive: "lightGray",
      },
      strokeWidth: 0.25,
    },
    line: {
      show: true,
      strokeWidth: 0.25,
      stroke: {
        default: "paleGreen",
        hover: "paleGreen",
        selected: "powderBlue",
        inactive: "lightGray",
      },
    },
  },
  endControl: {
    show: true,
    point: {
      show: true,
      radius: 0.5,
      fill: {
        default: "lightSalmon",
        hover: "lightSalmon",
        selected: "lightSalmon",
        inactive: "lightGray",
      },
      stroke: {
        default: "transparent",
        hover: "powderBlue",
        selected: "powderBlue",
        inactive: "lightGray",
      },
      strokeWidth: 0.25,
    },
    line: {
      show: true,
      strokeWidth: 0.25,
      stroke: {
        default: "lightSalmon",
        hover: "lightSalmon",
        selected: "powderBlue",
        inactive: "lightGray",
      },
    },
  },
  arc: {
    show: true,
    point: {
      show: true,
      radius: 0.5,
      fill: {
        default: "aquamarine",
        hover: "aquamarine",
        selected: "aquamarine",
        inactive: "lightGray",
      },
      stroke: {
        default: "transparent",
        hover: "powderBlue",
        selected: "powderBlue",
        inactive: "lightGray",
      },
      strokeWidth: 0.25,
    },
    line: {
      show: true,
      strokeWidth: 0.25,
      stroke: {
        default: "aquamarine",
        hover: "aquamarine",
        selected: "powderBlue",
        inactive: "lightGray",
      },
    },
  },
}).on(setGuideState, (state, payload) => {
  const noUndef = removeUndefined(payload);
  return { ...state, ...noUndef };
});

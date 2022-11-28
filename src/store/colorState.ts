import { createEvent, createStore } from "effector";
import convert from "color-convert";
import { hslToString, rgbToString, hslToArray, rgbToArray } from "index";
import type { ColorState, ColorTuple, Color, AddColor, SetColor } from "types";

export const addColor = createEvent<AddColor>();
export const setColor = createEvent<SetColor>();
export const setSelectedColor = createEvent<number>();

export const appropriateColors = (payload: SetColor): Color => {
  if (typeof payload.color === "string" && payload.type !== "hex") {
    payload.color =
      payload.type === "hsl"
        ? hslToArray(payload.color)
        : rgbToArray(payload.color);
  }
  const hex =
    payload.type === "hex"
      ? (payload.color as string)
      : payload.type === "rgb"
      ? `${convert.rgb.hex(payload.color as ColorTuple)}`
      : `${convert.hsl.hex(payload.color as ColorTuple)}`;
  const hsl =
    payload.type === "hex"
      ? convert.hex.hsl(payload.color as string)
      : payload.type === "rgb"
      ? convert.rgb.hsl(payload.color as ColorTuple)
      : (payload.color as ColorTuple);
  const rgb =
    payload.type === "hex"
      ? convert.hex.rgb(payload.color as string)
      : payload.type === "hsl"
      ? convert.hsl.rgb(payload.color as ColorTuple)
      : (payload.color as ColorTuple);
  return {
    index: payload.index,
    hex,
    hsl: { string: hslToString(hsl), array: hsl },
    rgb: { string: rgbToString(rgb), array: rgb },
    opacity: payload.opacity ?? 100,
  };
};

export const $colorState = createStore<ColorState>({
  colors: [
    {
      index: 0,
      hex: "FF0000",
      hsl: { string: "hsl(0, 100%, 50%)", array: [0, 100, 50] },
      rgb: { string: "rgb(255, 0, 0)", array: [255, 0, 0] },
      opacity: 100,
    },
  ],
  selected: 0,
})
  .on(addColor, (state, payload): ColorState => {
    return {
      ...state,
      colors: [
        ...state.colors,
        appropriateColors({ ...payload, index: state.colors.length - 1 }),
      ],
    };
  })
  .on(setColor, (state, payload): ColorState => {
    return {
      ...state,
      colors: Array.from(state.colors, (color, index) => {
        if (index === color.index)
          return appropriateColors({ ...payload, index });
        return { ...color };
      }),
    };
  })
  .on(setSelectedColor, (state, payload): ColorState => {
    return {
      ...state,
      selected: payload,
    };
  });

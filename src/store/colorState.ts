import { createEvent, createStore } from "effector";
import convert from "color-convert";

type Color = {
  index: number;
  hex: string;
  hsl: [number, number, number];
  rgb: [number, number, number];
  opacity: number;
};

export type ColorState = {
  colors: Color[];
  selected: number;
};

type ColorTuple = [number, number, number];

export type AddColor = {
  type: "rgb" | "hex" | "hsl";
  color: ColorTuple | string;
  opacity?: number;
};
interface SetColor extends AddColor {
  index: number;
}

export const addColor = createEvent<AddColor>();
export const setColor = createEvent<SetColor>();
export const setSelectedColor = createEvent<number>();

const appropriateColors = (payload: SetColor): Color => {
  return {
    index: payload.index,
    hex:
      payload.type === "hex"
        ? (payload.color as string)
        : payload.type === "rgb"
        ? `${convert.rgb.hex(payload.color as ColorTuple)}`
        : `${convert.hsl.hex(payload.color as ColorTuple)}`,
    hsl:
      payload.type === "hex"
        ? convert.hex.hsl(payload.color as string)
        : payload.type === "rgb"
        ? convert.rgb.hsl(payload.color as ColorTuple)
        : (payload.color as ColorTuple),
    rgb:
      payload.type === "hex"
        ? convert.hex.hsl(payload.color as string)
        : payload.type === "rgb"
        ? convert.rgb.hsl(payload.color as ColorTuple)
        : (payload.color as ColorTuple),
    opacity: payload.opacity ?? 100,
  };
};

export const $colorState = createStore<ColorState>({
  colors: [
    { index: 0, hex: "", hsl: [0, 100, 50], rgb: [255, 0, 0], opacity: 100 },
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

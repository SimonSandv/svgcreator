//-----------------------------------
// UtilityTypes

export type CustomCSS = React.CSSProperties &
  Record<`--${string}`, number | string>;

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type PartialExcept<T, K extends keyof T> = RecursivePartial<T> &
  Pick<T, K>;

export type XY = { x: number; y: number };
export type XYZ = { x: number; y: number; z: number };

export type RGB = { r: number; y: number; z: number };
export type HSL = { h: number; s: number; l: number };

export type Obj = { [k: string]: unknown };

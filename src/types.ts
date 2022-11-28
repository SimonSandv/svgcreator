/**
 * @see {@link someFunc}
 * @param someparam - description.
 */

//-----------
//UTILITY TYPES
//-----------

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

//------------------

export type Coord = XY;

export type CoordSet = {
  rel: Coord;
  abs: Coord;
};

export type InputArray = Input[];

export type LinePreview = {
  inputArray: InputArray;
  param: Param;
  data: Data;
  stage: number;
};

export type Data = {
  abs: string;
  rel: string;
};

export type Line = {
  lineIndex: number;
  inputArray: InputArray;
  preview: LinePreview;
  tool: string;
  data: Data;
  rel: boolean;
  param: Param;
  complete: boolean;
};

export interface Param {
  endPos: CoordSet;
  startControl: CoordSet | undefined;
  endControl: CoordSet | undefined;
  radius: Coord | undefined;
  degree: number | undefined;
  largeArcFlag: 0 | 1 | undefined;
  sweepFlag: 0 | 1 | undefined;
}

export type Position = {
  current: Coord;
  previous: Coord;
};

export type Shape = "circle" | "rect";
export type Cursor = {
  shape: Shape;
  pos: Coord;
};

export type Marker = {
  show: boolean;
};

export type Markers = {
  start: Marker;
  mid: Marker;
  end: Marker;
};

export type LineCap = "butt" | "round" | "square";
export type LineJoin = "miter" | "round" | "bevel";

export type Stroke = {
  width?: { value?: number; operand?: string };
  color?: string;
  lineCap?: "butt" | "round" | "square" | "inherit" | undefined;
  lineJoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
  opacity?: number;
  miterLimit?: number;
  dashArray?: number[];
  dashOffset?: number;
};

export type Transform = {
  matrix?: [number, number, number, number, number, number];
  translate?: { x: number; y?: number };
  scale?: { x: number; y?: number };
  rotate?: { angle: number; x: number; y: number };
  skewX?: number;
  skewY?: number;
};

export type Fill = {
  color?: string;
  opacity?: number;
  rule?: "nonzero" | "evenodd";
};

export type PathProps = Pick<
  React.SVGProps<SVGPathElement>,
  | "display"
  | "fill"
  | "opacity"
  | "stroke"
  | "strokeWidth"
  | "strokeOpacity"
  | "strokeMiterlimit"
  | "strokeDasharray"
  | "strokeDashoffset"
  | "strokeLinecap"
  | "strokeLinejoin"
  | "color"
  | "colorInterpolation"
  | "fillOpacity"
  | "fillRule"
  | "transform"
>;

export type Path = {
  pathIndex: number;
  lines: Line[];
  position: Position;
  data: string;
  previewData: string;
  markers: Markers;
  // attr: Presentation;
  attr: PathProps;
  title?: string;
};

export type Presentation = {
  stroke: Stroke;
  fill: Fill;
  opacity?: number;
  filter?: string[];
  vectorEffect?:
    | "none"
    | "non-scaling-stroke"
    | "non-scaling-size"
    | "non-rotation"
    | "fixed-position";
  color?: string;
  colorInterpolation?: "auto" | "sRGB" | "linearRGB";
  display?: string;
  pathLength?: number;
  mask?: string[];
  clip?: Clip;
  transform?: Transform;
};

export type Clip = {
  path?: string;
  rule?: string;
};

export type ClipPath = {
  id: string;
  rule: string;
};

export type Input = {
  id: number;
  relative: number;
  absolute: number;
};

export type ViewBox = {
  position: Coord;
  width: number;
  height: number;
};

export type Selected = {
  mode: string;
  pathIndex: number;
  lineIndex: number;
  inputIndex: number;
  point: string;
  drag: boolean;
};

export type ParamInfo = {
  name: string;
  description: string;
};

export type Tool = {
  toolIndex: number;
  short: string;
  description: string;
  text: string;
  param: ParamInfo[];
  rel: boolean;
};

export type ToolArray = Tool[];

export type ColorVariants = {
  default: string;
  hover: string;
  selected: string;
  inactive: string;
};

export type GuideLine = {
  show: boolean;
  stroke: ColorVariants;
  strokeWidth: number;
};

export type Guides = {
  show: boolean;
  endPos: {
    show: boolean;
    point: GuidePoint;
  };
  startControl: {
    show: boolean;
    point: GuidePoint;
    line: GuideLine;
  };
  endControl: {
    show: boolean;
    point: GuidePoint;
    line: GuideLine;
  };
  arc: {
    show: boolean;
    point: GuidePoint;
    line: GuideLine;
  };
};

export type WidgetButton = {
  title: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  description: string;
  action: () => void;
};

export type WidgetMenuState = {
  show: "none" | "tool";
};

export type WidgetState = {
  show: "none" | "tool";
};

export type ColorState = {
  colors: Color[];
  selected: number;
};

export type ColorTuple = [number, number, number];

export type Color = {
  index: number;
  hex: string;
  hsl: { string: string; array: ColorTuple };
  rgb: { string: string; array: ColorTuple };
  opacity: number;
};

export type AddColor = {
  type: "rgb" | "hex" | "hsl";
  color: ColorTuple | string;
  opacity?: number;
};
export interface SetColor extends AddColor {
  index: number;
}

export interface DebugPoint {
  pos?: { abs: { x: number; y: number }; rel: { x: number; y: number } };
  show?: boolean;
  radius?: number;
}
export type DebugState = {
  debugPoint: DebugPoint;
};

export type GridState = {
  display: boolean;
  smallGrid: { display: boolean; opacity: number; color: string };
  largeGrid: { display: boolean; opacity: number; color: string };
};

export type GuidePoint = {
  show: boolean;
  fill: Color;
  stroke: Color;
  radius: number;
  strokeWidth: number;
};

export type GuideState = {
  show: boolean;
  endPos: {
    show: boolean;
    point: GuidePoint;
  };
  startControl: {
    show: boolean;
    point: GuidePoint;
    line: GuideLine;
  };
  endControl: {
    show: boolean;
    point: GuidePoint;
    line: GuideLine;
  };
  arc: {
    show: boolean;
    point: GuidePoint;
    line: GuideLine;
  };
};

export type MousePos = {
  x: number;
  y: number;
};

export type SelectedState = {
  mode: string;
  pathIndex: number;
  lineIndex: number;
  inputIndex: number;
  point: string;
  drag: boolean;
};

export interface AddLineToPath {
  pathIndex: number;
  tool: string;
  endPos: CoordSet;
  startControl: CoordSet;
  endControl: CoordSet;
  degree?: number;
  radius?: Coord;
  largeArcFlag?: 0 | 1;
  sweepFlag?: 0 | 1;
}

export interface RemoveLineFromPath {
  pathIndex: number;
  lineIndex: number;
}

export interface UpdateInput {
  pathIndex: number;
  lineIndex: number;
  inputIndex: number;
  relative: number;
  absolute: number;
  preview?: boolean;
}

export interface UpdateInputArray {
  pathIndex: number;
  lineIndex: number;
  inputArray: InputArray;
  preview?: boolean;
}

export interface UpdatePosition {
  pathIndex: number;
  x: number;
  y: number;
}

export interface UpdatePathData {
  pathIndex: number;
  data: string;
}

export interface UpdateLineTool {
  pathIndex: number;
  lineIndex: number;
  tool: string;
}

export interface UpdateLineComplete {
  pathIndex: number;
  lineIndex: number;
  complete: boolean;
}

export interface LoadPathData {
  pathIndex?: number;
  preview?: boolean;
}

export interface UpdateLineData {
  pathIndex?: number;
  lineIndex?: number;
  preview?: boolean;
}

export interface RemovePath {
  pathIndex: number;
}

export interface UpdateRel {
  pathIndex?: number;
  lineIndex?: number;
  event: boolean;
}

export interface UpdateMousePos {
  x: number;
  y: number;
}

export interface UpdateSelected {
  mode?: string;
  pathIndex?: number;
  lineIndex?: number;
  inputIndex?: number;
  point?: string;
  drag?: boolean;
}

export interface UpdateNumberOfInputs {
  pathIndex: number;
  lineIndex: number;
  preview?: boolean;
}

export interface UpdatePreviewStage {
  pathIndex: number;
  lineIndex: number;
  stage: number;
}

export interface UpdateLineParam {
  pathIndex: number;
  lineIndex: number;
  endPos?: CoordSet | undefined;
  startControl?: CoordSet | undefined;
  endControl?: CoordSet | undefined;
  degree?: number | undefined;
  radius?: Coord | undefined;
  largeArcFlag?: 0 | 1 | undefined;
  sweepFlag?: 0 | 1 | undefined;
  preview?: boolean;
  save?: boolean;
}

export interface UpdatePathAttribute {
  pathIndex: number;
  clipPath?: string;
  clipPathRule?: string;
  color?: string;
  colorInterpolation?: "auto" | "sRGB" | "linearRGB";
  display?: string;
  pathLength?: number;
  mask?: string[];
  vectorEffect?:
    | "none"
    | "non-scaling-stroke"
    | "non-scaling-size"
    | "non-rotation"
    | "fixed-position";
  filter?: string[];
  strokeWidthValue?: number;
  strokeWidthOperand?: string;
  strokeWidthJoined?: string;
  strokeColor?: string;
  strokeLineCap?: "butt" | "round" | "square";
  strokeLineJoin?: "miter" | "round" | "bevel";
  strokeOpacity?: number;
  strokeMiterLimit?: number;
  strokeDashArray?: number[];
  strokeDashOffset?: number;
  fillColor?: string;
  fillOpacity?: number;
  fillRule?: "nonzero" | "evenodd";
  transformMatrix?: [number, number, number, number, number, number];
  transformTranslate?: { x: number; y?: number };
  transformScale?: { x: number; y?: number };
  transformRotate?: { angle: number; x: number; y: number };
  transformSkewX?: number;
  transformSkewY?: number;
}

export interface UpdatePathProps extends PathProps {
  pathIndex: number;
}

export interface Store {
  paths: Path[];
  active: boolean;
}

export type SvgMousePos = {
  x: number;
  y: number;
};

export type ThemeState = {
  themeIndex: number;
  themes: string[][];
};
export interface ChangeTheme {
  themeIndex: number;
}
export interface AddTheme {
  theme: string[];
}

export type ToolState = {
  tool: {
    toolIndex: number;
    short: string;
    description: string;
    text: string;
    param: ParamInfo[];
    rel: boolean;
  };
  toolArray: Tool[];
};

export type ViewBoxState = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WheelState = {
  outerCenterPos: { x: number; y: number };
  outerPos: { x: number; y: number };
  innerPos: { x: number; y: number };
  innerPosMem: { x: number; y: number };
  innerPressed: boolean;
  outerPressed: boolean;
  angle: number;
  angleMem: number;
  sat: number;
  light: number;
};

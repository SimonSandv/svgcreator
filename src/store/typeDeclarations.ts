export type Coord = {
  x: number;
  y: number;
};

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

export type DebugPoint = {
  pos: CoordSet;
  show: boolean;
  radius: number;
};

export type Color = {
  default: string;
  hover: string;
  selected: string;
  inactive: string;
};

export type GuidePoint = {
  show: boolean;
  fill: Color;
  stroke: Color;
  radius: number;
  strokeWidth: number;
};

export type GuideLine = {
  show: boolean;
  stroke: Color;
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

export type ThemeState = { themeIndex: number; themes: string[][] };

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

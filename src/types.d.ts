/**
 * @see {@link someFunc}
 * @param someparam - description.
 */
/// <reference types="react" />
export declare type CustomCSS = React.CSSProperties & Record<`--${string}`, number | string>;
export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export declare type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>;
export declare type XY = {
    x: number;
    y: number;
};
export declare type XYZ = {
    x: number;
    y: number;
    z: number;
};
export declare type RGB = {
    r: number;
    y: number;
    z: number;
};
export declare type HSL = {
    h: number;
    s: number;
    l: number;
};
export declare type Obj = {
    [k: string]: unknown;
};
export declare type Coord = XY;
export declare type CoordSet = {
    rel: Coord;
    abs: Coord;
};
export declare type InputArray = Input[];
export declare type LinePreview = {
    inputArray: InputArray;
    param: Param;
    data: Data;
    stage: number;
};
export declare type Data = {
    abs: string;
    rel: string;
};
export declare type Line = {
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
export declare type Position = {
    current: Coord;
    previous: Coord;
};
export declare type Shape = "circle" | "rect";
export declare type Cursor = {
    shape: Shape;
    pos: Coord;
};
export declare type Marker = {
    show: boolean;
};
export declare type Markers = {
    start: Marker;
    mid: Marker;
    end: Marker;
};
export declare type LineCap = "butt" | "round" | "square";
export declare type LineJoin = "miter" | "round" | "bevel";
export declare type Stroke = {
    width?: {
        value?: number;
        operand?: string;
    };
    color?: string;
    lineCap?: "butt" | "round" | "square" | "inherit" | undefined;
    lineJoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
    opacity?: number;
    miterLimit?: number;
    dashArray?: number[];
    dashOffset?: number;
};
export declare type Transform = {
    matrix?: [number, number, number, number, number, number];
    translate?: {
        x: number;
        y?: number;
    };
    scale?: {
        x: number;
        y?: number;
    };
    rotate?: {
        angle: number;
        x: number;
        y: number;
    };
    skewX?: number;
    skewY?: number;
};
export declare type Fill = {
    color?: string;
    opacity?: number;
    rule?: "nonzero" | "evenodd";
};
export declare type PathProps = Pick<React.SVGProps<SVGPathElement>, "display" | "fill" | "opacity" | "stroke" | "strokeWidth" | "strokeOpacity" | "strokeMiterlimit" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "color" | "colorInterpolation" | "fillOpacity" | "fillRule" | "transform">;
export declare type Path = {
    pathIndex: number;
    lines: Line[];
    position: Position;
    data: string;
    previewData: string;
    markers: Markers;
    attr: PathProps;
    title?: string;
};
export declare type Presentation = {
    stroke: Stroke;
    fill: Fill;
    opacity?: number;
    filter?: string[];
    vectorEffect?: "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";
    color?: string;
    colorInterpolation?: "auto" | "sRGB" | "linearRGB";
    display?: string;
    pathLength?: number;
    mask?: string[];
    clip?: Clip;
    transform?: Transform;
};
export declare type Clip = {
    path?: string;
    rule?: string;
};
export declare type ClipPath = {
    id: string;
    rule: string;
};
export declare type Input = {
    id: number;
    relative: number;
    absolute: number;
};
export declare type ViewBox = {
    position: Coord;
    width: number;
    height: number;
};
export declare type Selected = {
    mode: string;
    pathIndex: number;
    lineIndex: number;
    inputIndex: number;
    point: string;
    drag: boolean;
};
export declare type ParamInfo = {
    name: string;
    description: string;
};
export declare type Tool = {
    toolIndex: number;
    short: string;
    description: string;
    text: string;
    param: ParamInfo[];
    rel: boolean;
};
export declare type ToolArray = Tool[];
export declare type ColorVariants = {
    default: string;
    hover: string;
    selected: string;
    inactive: string;
};
export declare type GuideLine = {
    show: boolean;
    stroke: ColorVariants;
    strokeWidth: number;
};
export declare type Guides = {
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
export declare type WidgetButton = {
    title: string;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    description: string;
    action: () => void;
};
export declare type WidgetMenuState = {
    show: "none" | "tool";
};
export declare type WidgetState = {
    show: "none" | "tool";
};
export declare type ColorState = {
    colors: Color[];
    selected: number;
};
export declare type ColorTuple = [number, number, number];
export declare type Color = {
    index: number;
    hex: string;
    hsl: {
        string: string;
        array: ColorTuple;
    };
    rgb: {
        string: string;
        array: ColorTuple;
    };
    opacity: number;
};
export declare type AddColor = {
    type: "rgb" | "hex" | "hsl";
    color: ColorTuple | string;
    opacity?: number;
};
export interface SetColor extends AddColor {
    index: number;
}
export interface DebugPoint {
    pos?: {
        abs: {
            x: number;
            y: number;
        };
        rel: {
            x: number;
            y: number;
        };
    };
    show?: boolean;
    radius?: number;
}
export declare type DebugState = {
    debugPoint: DebugPoint;
};
export declare type GridState = {
    display: boolean;
    smallGrid: {
        display: boolean;
        opacity: number;
        color: string;
    };
    largeGrid: {
        display: boolean;
        opacity: number;
        color: string;
    };
};
export declare type GuidePoint = {
    show: boolean;
    fill: Color;
    stroke: Color;
    radius: number;
    strokeWidth: number;
};
export declare type GuideState = {
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
export declare type MousePos = {
    x: number;
    y: number;
};
export declare type SelectedState = {
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
    vectorEffect?: "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";
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
    transformTranslate?: {
        x: number;
        y?: number;
    };
    transformScale?: {
        x: number;
        y?: number;
    };
    transformRotate?: {
        angle: number;
        x: number;
        y: number;
    };
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
export declare type SvgMousePos = {
    x: number;
    y: number;
};
export declare type ThemeState = {
    themeIndex: number;
    themes: string[][];
};
export interface ChangeTheme {
    themeIndex: number;
}
export interface AddTheme {
    theme: string[];
}
export declare type ToolState = {
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
export declare type ViewBoxState = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type WheelState = {
    outerCenterPos: {
        x: number;
        y: number;
    };
    outerPos: {
        x: number;
        y: number;
    };
    innerPos: {
        x: number;
        y: number;
    };
    innerPosMem: {
        x: number;
        y: number;
    };
    innerPressed: boolean;
    outerPressed: boolean;
    angle: number;
    angleMem: number;
    sat: number;
    light: number;
};

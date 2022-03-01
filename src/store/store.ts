import { createStore, createEvent } from "effector";

import {
  Path,
  InputArray,
  Coord,
  CoordSet,
  PathProps,
} from "./typeDeclarations";
import {
  addLineToPath,
  addPathToList,
  setRel,
  joinPathData,
  removeLineFromPath,
  removePathFromList,
  setLineInput,
  setLineInputArray,
  setLineTool,
  setLineComplete,
  setNumberOfInputs,
  setPathData,
  setPosition,
  setPreviewStage,
  setLineParam,
  setLineData,
  setLinePreview,
  setPathProps,
} from "../index";

//--------------------------------------------------------------

/**
 * Add a new path to "store.paths[]".
 * @see {@link addPathToList}
 */
export const addPath = createEvent();

// --------------------------------------------------------
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

/**
 * Add a line to the lineArray within the selected store.paths[#].
 * @see {@link addLineToPath}
 * @param pathIndex - Index of target path within "store.paths[]".
 */
export const addLine = createEvent<AddLineToPath>();

// --------------------------------------------------------
export interface RemoveLineFromPath {
  pathIndex: number;
  lineIndex: number;
}

/**
 * Add a line to the lineArray within the selected store.paths[#].
 * @see {@link RemoveLineFromPath}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 */
export const removeLine = createEvent<RemoveLineFromPath>();

// --------------------------------------------------------

export interface UpdateInput {
  pathIndex: number;
  lineIndex: number;
  inputIndex: number;
  relative: number;
  absolute: number;
  preview?: boolean;
}

/**
 * Set value of a target input in store.paths[].lines[].inputs[]
 * @see {@link setLineInput}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 * @param inputIndex - ID of target input within
 * "store.paths[].lines[].inputArray".
 * @param relative - relative position to set the state to.
 * @param absolute - absolute position to set the state to.
 * "store.paths[].lines[].inputs[]"
 */
export const updateInput = createEvent<UpdateInput>();

// --------------------------------------------------------

export interface UpdateInputArray {
  pathIndex: number;
  lineIndex: number;
  inputArray: InputArray;
  preview?: boolean;
}

/**
 * Set value of inputs to store.paths[].lines[].inputs[]
 * @see {@link setLineInputArray}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 * @param inputArray - The new array to set the state to.
 * @param preview - wether to target the preview state.
 */
export const updateInputArray = createEvent<UpdateInputArray>();

// --------------------------------------------------------

export interface UpdatePosition {
  pathIndex: number;
  x: number;
  y: number;
}

/**
 * Set the "store.paths[].position" state.
 * @see {@link setPosition}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param x - x position.
 * @param y - y position.
 * @param previous - previous position.
 */
export const updatePosition = createEvent<UpdatePosition>();

// --------------------------------------------------------

export interface UpdatePathData {
  pathIndex: number;
  data: string;
}

/**
 * Change the data of a path.
 * @see {@link setPathData}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param data - New string value, e.g. "M 0 20 L 100 20".
 */
export const updatePathData = createEvent<UpdatePathData>();

// --------------------------------------------------------

export interface UpdateLineTool {
  pathIndex: number;
  lineIndex: number;
  tool: string;
}

/**
 * Change tool for the selected line.
 * @see {@link setLineTool}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 * @param tool - New string value, e.g. "c" or "L" (SVG path "d" functions).
 */
export const updateLineTool = createEvent<UpdateLineTool>();

// --------------------------------------------------------

export interface UpdateLineComplete {
  pathIndex: number;
  lineIndex: number;
  complete: boolean;
}

/**
 * @see {@link setLineComplete}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 * @param complete - boolean.
 */
export const updateLineComplete = createEvent<UpdateLineComplete>();

// --------------------------------------------------------

/**
 * @see {@link setLinePreview}
 */
export const resetLinePreview = createEvent();

// --------------------------------------------------------

export interface LoadPathData {
  pathIndex?: number;
  preview?: boolean;
}

/**
 * Join all data from each line into the paths data state.
 * @see {@link joinPathData}
 * @param pathIndex - Index of target path within "store.paths[]".
 */
export const loadPathData = createEvent<LoadPathData>();

// --------------------------------------------------------

export interface UpdateLineData {
  pathIndex?: number;
  lineIndex?: number;
  preview?: boolean;
}

/**
 * Set value of store.paths[].lines[].data
 * @see {@link joinLineData}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 */
export const updateLineData = createEvent<UpdateLineData>();

// --------------------------------------------------------

export interface RemovePath {
  pathIndex: number;
}

/**
 * Remove a path from store.paths
 * @see {@link removePathFromList}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 */
export const removePath = createEvent<RemovePath>();

// --------------------------------------------------------

/**
 * Set "store.paths[].lines[].rel" state.
 * (relative or absolute path-d functions).
 * @see {@link setRel}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 * @param event - boolean value
 */
export interface UpdateRel {
  pathIndex?: number;
  lineIndex?: number;
  event: boolean;
}

export const updateRel = createEvent<UpdateRel>();

// --------------------------------------------------------

/**
 * Set "store.mousePos.x and .y" state.
 * (relative or absolute path-d functions).
 * @see {@link setMousePos}
 * @param x - x position.
 * @param y - y position.
 */
export interface UpdateMousePos {
  x: number;
  y: number;
}

export const updateMousePos = createEvent<UpdateMousePos>();

// --------------------------------------------------------

/**
 * Set "store.selected" state.
 * (relative or absolute path-d functions).
 * @see {@link setSelected}
 * @param mode - "line" | "point" | "deselected";
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 * @param inputIndex - Index of target input within
 * @param point - target point;
 * "store.paths[].lines[].inputs[]".
 */
export interface UpdateSelected {
  mode?: string;
  pathIndex?: number;
  lineIndex?: number;
  inputIndex?: number;
  point?: string;
  drag?: boolean;
}

export const updateSelected = createEvent<UpdateSelected>();

// --------------------------------------------------------

/**
 * toggle boolean "store.active" state. Enables or disables editing.
 */
export const toggleActive = createEvent();

// --------------------------------------------------------

/**
 * Set "length of store.paths[].lines.[].inputs[]" state.
 * Determines how many inputs to render.
 * @see {@link setNumberOfInputs}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target line within "store.paths[].lines[]".
 */

export interface UpdateNumberOfInputs {
  pathIndex: number;
  lineIndex: number;
  preview?: boolean;
}

export const updateNumberOfInputs = createEvent<UpdateNumberOfInputs>();

// --------------------------------------------------------

/**
 * Set the path[].lines[].preview.stage state,
 * @see {@link setPreviewStage}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target index within "store.paths[].lines[]".
 * @param stage - numberic value to set the state to.
 */
export interface UpdatePreviewStage {
  pathIndex: number;
  lineIndex: number;
  stage: number;
}

export const updatePreviewStage = createEvent<UpdatePreviewStage>();

// --------------------------------------------------------
/**
 * @see {@link setLineParam}
 * @param pathIndex - Index of target path within "store.paths[]".
 * @param lineIndex - Index of target index within "store.paths[].lines[]".
 */
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

export const updateLineParam = createEvent<UpdateLineParam>();
// --------------------------------------------------------

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
export const updatePathAttribute = createEvent<UpdatePathAttribute>();

// --------------------------------------------------------

export interface UpdatePathProps extends PathProps {
  pathIndex: number;
}
// const test: UpdatePathProps = { pathIndex };
export const updatePathProps = createEvent<UpdatePathProps>();

// --------------------------------------------------------
export interface Store {
  paths: Path[];
  active: boolean;
}
export const $store = createStore<Store>({
  active: true,
  paths: [],
})
  .on(addPath, (state) => {
    return {
      ...state,
      paths: addPathToList(state.paths),
    };
  })
  .on(
    addLine,
    (
      state,
      {
        pathIndex,
        tool,
        endPos,
        startControl,
        endControl,
        degree,
        radius,
        largeArcFlag,
        sweepFlag,
      }
    ) => {
      return {
        ...state,
        paths: addLineToPath(
          state.paths,
          pathIndex,
          tool,
          endPos,
          startControl,
          endControl,
          degree,
          radius,
          largeArcFlag,
          sweepFlag
        ),
      };
    }
  )
  .on(removeLine, (state, { pathIndex, lineIndex }) => {
    return {
      ...state,
      paths: removeLineFromPath(state.paths, pathIndex, lineIndex),
    };
  })
  .on(
    updateInput,
    (
      state,
      { pathIndex, lineIndex, inputIndex, relative, absolute, preview }
    ) => {
      return {
        ...state,
        paths: setLineInput(
          state.paths,
          pathIndex,
          lineIndex,
          inputIndex,
          relative,
          absolute,
          preview
        ),
      };
    }
  )
  .on(
    updateInputArray,
    (state, { pathIndex, lineIndex, inputArray, preview }) => {
      return {
        ...state,
        paths: setLineInputArray(
          state.paths,
          pathIndex,
          lineIndex,
          inputArray,
          preview
        ),
      };
    }
  )
  .on(updatePosition, (state, { pathIndex, x, y }) => {
    return {
      ...state,
      paths: setPosition(state.paths, pathIndex, x, y),
    };
  })
  .on(updatePathData, (state, { pathIndex, data }) => {
    return {
      ...state,
      paths: setPathData(state.paths, pathIndex, data),
    };
  })
  .on(updateLineTool, (state, { pathIndex, lineIndex, tool }) => {
    return {
      ...state,
      paths: setLineTool(state.paths, pathIndex, lineIndex, tool),
    };
  })
  .on(updateLineComplete, (state, { pathIndex, lineIndex, complete }) => {
    return {
      ...state,
      paths: setLineComplete(state.paths, pathIndex, lineIndex, complete),
    };
  })
  .on(resetLinePreview, (state) => {
    return {
      ...state,
      paths: setLinePreview(state.paths),
    };
  })
  .on(loadPathData, (state, { pathIndex, preview }) => {
    return {
      ...state,
      paths: joinPathData(state.paths, pathIndex, preview),
    };
  })
  .on(updateLineData, (state, { pathIndex, lineIndex, preview }) => {
    return {
      ...state,
      paths: setLineData(state.paths, pathIndex, lineIndex, preview),
    };
  })
  .on(removePath, (state, { pathIndex }) => {
    return {
      ...state,
      paths: removePathFromList(state.paths, pathIndex),
    };
  })
  .on(updateRel, (state, { pathIndex, lineIndex, event }) => {
    return {
      ...state,
      paths: setRel(state.paths, event, pathIndex, lineIndex),
    };
  })
  .on(toggleActive, (state) => {
    return {
      ...state,
      active: !state.active,
    };
  })
  .on(updateNumberOfInputs, (state, { pathIndex, lineIndex, preview }) => {
    return {
      ...state,
      paths: setNumberOfInputs(state.paths, pathIndex, lineIndex, preview),
    };
  })
  .on(updatePreviewStage, (state, { pathIndex, lineIndex, stage }) => {
    return {
      ...state,
      paths: setPreviewStage(state.paths, pathIndex, lineIndex, stage),
    };
  })
  .on(
    updatePathProps,
    (
      state,
      {
        pathIndex,
        color,
        colorInterpolation,
        display,
        fill,
        fillOpacity,
        fillRule,
        opacity,
        stroke,
        strokeDasharray,
        strokeDashoffset,
        strokeLinecap,
        strokeLinejoin,
        strokeMiterlimit,
        strokeOpacity,
        strokeWidth,
        transform,
      }
    ) => {
      return {
        ...state,
        paths: setPathProps(state.paths, pathIndex, {
          color,
          colorInterpolation,
          display,
          fill,
          fillOpacity,
          fillRule,
          opacity,
          stroke,
          strokeDasharray,
          strokeDashoffset,
          strokeLinecap,
          strokeLinejoin,
          strokeMiterlimit,
          strokeOpacity,
          strokeWidth,
          transform,
        }),
      };
    }
  )
  .on(
    updateLineParam,
    (
      state,
      {
        pathIndex,
        lineIndex,
        endPos,
        startControl,
        endControl,
        degree,
        radius,
        largeArcFlag,
        sweepFlag,
        preview,
        save,
      }
    ) => {
      return {
        ...state,
        paths: setLineParam(
          state.paths,
          pathIndex,
          lineIndex,
          endPos,
          startControl,
          endControl,
          degree,
          radius,
          largeArcFlag,
          sweepFlag,
          preview,
          save
        ),
      };
    }
  );

import { createStore, createEvent } from "effector";

import type {
  Path,
  InputArray,
  Coord,
  CoordSet,
  PathProps,
  AddLineToPath,
  RemoveLineFromPath,
  UpdateInput,
  UpdateInputArray,
  UpdatePosition,
  UpdatePathData,
  UpdateLineTool,
  UpdateLineComplete,
  LoadPathData,
  UpdateLineData,
  RemovePath,
  UpdateRel,
  UpdateMousePos,
  UpdateSelected,
  UpdateNumberOfInputs,
  UpdatePreviewStage,
  UpdateLineParam,
  UpdatePathAttribute,
  UpdatePathProps,
} from "types";
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
} from "index";

export const addPath = createEvent();
export const addLine = createEvent<AddLineToPath>();
export const removeLine = createEvent<RemoveLineFromPath>();
export const updateInput = createEvent<UpdateInput>();
export const updateInputArray = createEvent<UpdateInputArray>();
export const updatePosition = createEvent<UpdatePosition>();
export const updatePathData = createEvent<UpdatePathData>();
export const updateLineTool = createEvent<UpdateLineTool>();
export const updateLineComplete = createEvent<UpdateLineComplete>();
export const resetLinePreview = createEvent();
export const loadPathData = createEvent<LoadPathData>();
export const updateLineData = createEvent<UpdateLineData>();
export const removePath = createEvent<RemovePath>();
export const updateRel = createEvent<UpdateRel>();
export const updateMousePos = createEvent<UpdateMousePos>();
export const updateSelected = createEvent<UpdateSelected>();
export const toggleActive = createEvent();
export const updateNumberOfInputs = createEvent<UpdateNumberOfInputs>();
export const updatePreviewStage = createEvent<UpdatePreviewStage>();
export const updateLineParam = createEvent<UpdateLineParam>();
export const updatePathAttribute = createEvent<UpdatePathAttribute>();
export const updatePathProps = createEvent<UpdatePathProps>();

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

import {
  Store,
  loadPathData,
  updateLineParam,
  updateLineData,
  // updateCursor,
  updateLineComplete,
  $selectedState,
  $svgMousePos,
} from "index";

export const line = (store: Store, preview: boolean = false): void => {
  const { pathIndex, lineIndex } = $selectedState.getState();

  const mousePos = $svgMousePos.getState();
  const startPos =
    store.paths[pathIndex].lines[lineIndex - 1] !== undefined
      ? store.paths[pathIndex].lines[lineIndex - 1].param.endPos.abs
      : { x: 0, y: 0 };

  /* updateCursor({
    pos: {
      x: snap === true ? Math.round(mousePos.x) : mousePos.x,
      y: snap === true ? Math.round(mousePos.y) : mousePos.y,
    },
  }); */

  updateLineParam({
    pathIndex,
    lineIndex,
    endPos: {
      abs: { x: mousePos.x, y: mousePos.y },
      rel: {
        x: mousePos.x - startPos.x,
        y: mousePos.y - startPos.y,
      },
    },
    preview,
  });
  if (preview === false) {
    updateLineComplete({
      pathIndex,
      lineIndex,
      complete: true,
    });
  }

  updateLineData({
    pathIndex,
    lineIndex,
    preview,
  });
  loadPathData({ pathIndex, preview });
};

export default line;

import {
  Store,
  loadPathData,
  updateLineParam,
  updateLineData,
  updateLineComplete,
  $selectedState,
  $svgMousePos,
} from "index";

export const hline = (store: Store, preview: boolean = false): void => {
  const { pathIndex, lineIndex } = $selectedState.getState();
  const mousePos = $svgMousePos.getState();
  const startPos =
    store.paths[pathIndex].lines[lineIndex - 1] !== undefined
      ? store.paths[pathIndex].lines[lineIndex - 1].param.endPos.abs
      : { x: 0, y: 0 };

  updateLineParam({
    pathIndex,
    lineIndex,
    endPos: {
      abs: { x: mousePos.x, y: mousePos.y },
      rel: {
        x: mousePos.x - startPos.x,
        y: 0,
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

export default hline;

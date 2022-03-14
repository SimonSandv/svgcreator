import {
  Store,
  loadPathData,
  updateLineParam,
  updateLineData,
  updateLineComplete,
  $selectedState,
  $svgMousePos,
} from "../index";

const hline = (store: Store, preview: boolean = false): void => {
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
        x: 0,
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

export default hline;

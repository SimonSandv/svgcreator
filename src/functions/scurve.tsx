import {
  Store,
  loadPathData,
  updateLineParam,
  updateLineData,
  updateLineComplete,
  $selectedState,
  setSelectedState,
  $svgMousePos,
} from "../index";

const scurve = (store: Store, preview: boolean = false): void => {
  const { pathIndex, lineIndex, inputIndex } = $selectedState.getState();
  const mousePos = $svgMousePos.getState();
  const startPos =
    store.paths[pathIndex].lines[lineIndex - 1] !== undefined
      ? store.paths[pathIndex].lines[lineIndex - 1].param.endPos.abs
      : { x: 0, y: 0 };

  if (inputIndex === 0) {
    updateLineParam({
      pathIndex,
      lineIndex,
      endPos: {
        abs: { x: mousePos.x, y: mousePos.y },
        rel: {
          x: lineIndex === 0 ? mousePos.x : mousePos.x - startPos.x,
          y: lineIndex === 0 ? mousePos.y : mousePos.y - startPos.y,
        },
      },
      endControl: {
        abs: { x: mousePos.x, y: mousePos.y },
        rel: {
          x: lineIndex === 0 ? mousePos.x : mousePos.x - startPos.x,
          y: lineIndex === 0 ? mousePos.y : mousePos.y - startPos.y,
        },
      },
      preview,
    });
    if (preview === false) {
      setSelectedState({ inputIndex: 1 });
    }
  } else if (inputIndex === 1) {
    updateLineParam({
      pathIndex,
      lineIndex,
      endControl: {
        abs: { x: mousePos.x, y: mousePos.y },
        rel: {
          x: lineIndex === 0 ? mousePos.x : mousePos.x - startPos.x,
          y: lineIndex === 0 ? mousePos.y : mousePos.y - startPos.y,
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
  }
  updateLineData({
    pathIndex,
    lineIndex,
    preview,
  });

  loadPathData({ pathIndex, preview });
};

export default scurve;

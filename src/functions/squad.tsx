import {
  Store,
  loadPathData,
  updateLineParam,
  updateLineData,
  updateLineComplete,
  $selectedState,
  $svgMousePos,
} from "../index";

const squad = (store: Store, preview: boolean = false): void => {
  const { pathIndex, lineIndex } = $selectedState.getState();
  const { paths } = store;
  const mousePos = $svgMousePos.getState();
  // const current = paths[pathIndex].lines[lineIndex];
  const prev = paths[pathIndex].lines[lineIndex - 1];
  const startPos = prev !== undefined ? prev.param.endPos.abs : { x: 0, y: 0 };
  // const prevPrev = store.paths[pathIndex].lines[lineIndex - 2];

  /*   if (prev.tool === "q" || prev.tool === "s" || prev.tool === "c") {
    const distX = prev.param.endPos.abs.x - prevPrev.param.endPos.abs.x;
    const distY = prev.param.endPos.abs.y - prevPrev.param.endPos.abs.y;
    const distance = Math.sqrt(distX * distX + distY * distY);
    const angle = Math.atan2(distY, distX);
    const control = {
      abs: {
        x: startPos.x + Math.cos(angle) * distance,
        y: startPos.x + Math.sin(angle) * distance,
      },
      rel: { x: 0, y: 0 },
    };
    updateLineParam({
      pathIndex,
      lineIndex,
      endControl: control,
      startControl: control,
      preview,
    });
  } */

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

export default squad;

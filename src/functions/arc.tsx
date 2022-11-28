import {
  Store,
  loadPathData,
  updateLineParam,
  updateLineData,
  updateDebugPoint,
  updateLineComplete,
  $selectedState,
  setSelectedState,
  $svgMousePos,
} from "index";

export const arc = (store: Store, preview: boolean = false): void => {
  const { pathIndex, lineIndex, inputIndex } = $selectedState.getState();
  const mousePos = $svgMousePos.getState();
  // const { rel } = store.paths[pathIndex].lines[lineIndex];

  const startPos =
    store.paths[pathIndex].lines[lineIndex - 1] !== undefined
      ? store.paths[pathIndex].lines[lineIndex - 1].param.endPos.abs
      : { x: 0, y: 0 };
  const { endPos } =
    preview === false
      ? store.paths[pathIndex].lines[lineIndex].param
      : store.paths[pathIndex].lines[lineIndex].preview.param;

  const pointDistX = endPos.abs.x - startPos.x;
  const pointDistY = endPos.abs.y - startPos.y;
  const midX = pointDistX / 2 + startPos.x;
  const midY = pointDistY / 2 + startPos.y;
  const mouseDistX = mousePos.x - midX;
  const mouseDistY = mousePos.y - midY;
  const mouseDist = parseFloat(
    Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY).toFixed(2)
  );
  const pointDist = parseFloat(
    Math.sqrt(pointDistX * pointDistX + pointDistY * pointDistY).toFixed(2)
  );
  const mouseDir = parseFloat(
    ((Math.atan2(mouseDistY, mouseDistX) * 180) / Math.PI + 180).toFixed(0)
  );
  const pointDir = parseFloat(
    ((Math.atan2(pointDistY, pointDistX) * 180) / Math.PI + 180).toFixed(0)
  );

  // console.log(`mouseDir: ${mouseDir}`);
  if (inputIndex === 0) {
    updateDebugPoint({
      pos: { abs: { x: midX, y: midY }, rel: { x: midX, y: midY } },
    });
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
    updateLineParam({
      pathIndex,
      lineIndex,
      radius: {
        x: pointDist / 2,
        y: pointDist / 2,
      },
      preview,
    });
    updateLineParam({
      pathIndex,
      lineIndex,
      degree: 0,
      preview,
    });
    if (preview === false) {
      setSelectedState({ inputIndex: 1 });
    }
  } else if (inputIndex === 1) {
    updateLineParam({
      pathIndex,
      lineIndex,
      radius: {
        x: mouseDistX,
        y: mouseDistY,
      },
      preview,
    });

    // console.log(Math.abs(mouseDist) > Math.abs(relDist) / 2);
    // console.log(`distance: ${Math.abs(distance)}`);
    if (mouseDir > 180) {
      updateLineParam({
        pathIndex,
        lineIndex,
        sweepFlag: 0,
        preview,
      });
    } else {
      updateLineParam({
        pathIndex,
        lineIndex,
        sweepFlag: 1,
        preview,
      });
    }
    if (Math.abs(mouseDist) > pointDist / 2) {
      updateLineParam({
        pathIndex,
        lineIndex,
        largeArcFlag: 1,
        preview,
      });
    } else {
      updateLineParam({
        pathIndex,
        lineIndex,
        largeArcFlag: 0,
        preview,
      });
    }
    if (preview === false) {
      setSelectedState({ inputIndex: 2 });
    }
  } else if (inputIndex === 2) {
    if (
      (mouseDir > 180 && mouseDir > pointDir) ||
      (mouseDir < 180 && mouseDir > pointDir)
    ) {
      updateLineParam({
        pathIndex,
        lineIndex,
        sweepFlag: 0,
        preview,
      });
    } else {
      updateLineParam({
        pathIndex,
        lineIndex,
        sweepFlag: 1,
        preview,
      });
    }
    if (Math.abs(mouseDist) > pointDist / 2) {
      updateLineParam({
        pathIndex,
        lineIndex,
        largeArcFlag: 1,
        preview,
      });
    } else {
      updateLineParam({
        pathIndex,
        lineIndex,
        largeArcFlag: 0,
        preview,
      });
    }
    if (preview === false) {
      setSelectedState({ inputIndex: 3 });
    }
  } else if (inputIndex === 3) {
    updateLineParam({
      pathIndex,
      lineIndex,
      degree: mouseDir,
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

export default arc;

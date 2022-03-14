import {
  updateLineParam,
  updateLineData,
  loadPathData,
  resetLinePreview,
  calculateControlPoints,
  $store,
  $selectedState,
  $svgMousePos,
} from "../index";

const handlePointDrag = (): void => {
  const store = $store.getState();
  const selected = $selectedState.getState();
  const mousePos = $svgMousePos.getState();
  const { paths } = store;

  const { point, pathIndex, lineIndex, inputIndex } = selected;

  const current = paths[pathIndex].lines[lineIndex];
  const previous = paths[pathIndex].lines[lineIndex - 1];

  const { startControl, endControl } = current.param;

  const tool = current.tool.toLowerCase();

  const startPos =
    previous !== undefined ? previous.param.endPos.abs : { x: 0, y: 0 };

  // resetLinePreview();

  if (point === "endPos") {
    updateLineParam({
      pathIndex,
      lineIndex,
      endPos: {
        abs: {
          x: mousePos.x,
          y: mousePos.y,
        },
        rel: {
          x: mousePos.x - startPos.x,
          y: mousePos.y - startPos.y,
        },
      },
    });

    if (lineIndex === paths[pathIndex].lines.length - 1) {
      if (inputIndex === 0) {
        updateLineParam({
          pathIndex,
          lineIndex: lineIndex - 1,
          endPos: {
            abs: {
              x: mousePos.x,
              y: mousePos.y,
            },
            rel: {
              x: mousePos.x - startPos.x,
              y: mousePos.y - startPos.y,
            },
          },
        });
      }
      if (
        previous.param.endControl !== undefined &&
        previous.param.endControl.abs === previous.param.endPos.abs
      ) {
        updateLineParam({
          pathIndex,
          lineIndex: lineIndex - 1,
          endControl: {
            abs: {
              x: mousePos.x,
              y: mousePos.y,
            },
            rel: {
              x: mousePos.x - startPos.x,
              y: mousePos.y - startPos.y,
            },
          },
        });
      }
    }
  }

  if (point === "startControl") {
    updateLineParam({
      pathIndex,
      lineIndex,
      startControl: {
        abs: {
          x: mousePos.x,
          y: mousePos.y,
        },
        rel: {
          x: mousePos.x - startPos.x,
          y: mousePos.y - startPos.y,
        },
      },
      endControl:
        tool === "q"
          ? {
              abs: {
                x: mousePos.x,
                y: mousePos.y,
              },
              rel: {
                x: mousePos.x - startPos.x,
                y: mousePos.y - startPos.y,
              },
            }
          : endControl,
    });
  }
  if (point === "endControl") {
    updateLineParam({
      pathIndex,
      lineIndex,
      endControl: {
        abs: {
          x: mousePos.x,
          y: mousePos.y,
        },
        rel: {
          x: mousePos.x - startPos.x,
          y: mousePos.y - startPos.y,
        },
      },
      startControl:
        tool === "q"
          ? {
              abs: {
                x: mousePos.x,
                y: mousePos.y,
              },
              rel: {
                x: mousePos.x - startPos.x,
                y: mousePos.y - startPos.y,
              },
            }
          : startControl,
    });
  }

  if (tool === "q" || tool === "t" || tool === "c" || tool === "s") {
    calculateControlPoints(pathIndex);
  }
  resetLinePreview();
  updateLineData({
    pathIndex,
    lineIndex: lineIndex,
    preview: false,
  });
  updateLineData({
    pathIndex,
    lineIndex: lineIndex - 1,
    preview: false,
  });
  loadPathData({ pathIndex, preview: false });
};
export default handlePointDrag;

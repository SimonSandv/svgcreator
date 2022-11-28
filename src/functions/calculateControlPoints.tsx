import { $store, updateLineParam } from "index";

export const calculateControlPoints = (pathIndex: number): void => {
  const store = $store.getState();
  for (let i = 0; i < store.paths[pathIndex].lines.length - 1; i += 1) {
    if (i !== 0) {
      const { endPos } = store.paths[pathIndex].lines[i - 1].param;
      const endControl =
        store.paths[pathIndex].lines[i - 1].param.endControl !== undefined
          ? store.paths[pathIndex].lines[i - 1].param.endControl
          : store.paths[pathIndex].lines[i - 1].param.endPos;
      const absX = endPos.abs.x + (endControl!.abs.x - endPos.abs.x) / -1;
      const absY = endPos.abs.y + (endControl!.abs.y - endPos.abs.y) / -1;
      const relX = absX - endPos.abs.x;
      const relY = absY - endPos.abs.y;
      const tool = store.paths[pathIndex].lines[i].tool.toLowerCase();
      if (tool === "t" || tool === "s") {
        updateLineParam({
          pathIndex,
          lineIndex: i,
          startControl: {
            abs: {
              x: absX,
              y: absY,
            },
            rel: {
              x: relX,
              y: relY,
            },
          },
        });
      }
      if (tool === "t") {
        updateLineParam({
          pathIndex,
          lineIndex: i,
          endControl: {
            abs: {
              x: absX,
              y: absY,
            },
            rel: {
              x: relX,
              y: relY,
            },
          },
        });
      }
    }
  }
};

export default calculateControlPoints;

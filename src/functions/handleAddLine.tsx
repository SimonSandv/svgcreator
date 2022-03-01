import { Store, addLine } from "../store/store";
import { $selectedState, setSelectedState, updateTool } from "../index";

const handleAddLine = (store: Store, tool: string): void => {
  const { pathIndex, lineIndex } = $selectedState.getState();
  const current = store.paths[pathIndex].lines[lineIndex];
  const { endPos, endControl } = current.param;
  const { rel } = current;

  addLine({
    pathIndex,
    tool: rel === true ? tool.toLowerCase() : tool.toUpperCase(),
    endPos: {
      abs: endPos.abs,
      rel: { x: 0, y: 0 },
    },
    startControl:
      (tool.toLowerCase() === "s" || tool.toLowerCase() === "t") &&
      endControl !== undefined
        ? {
            abs: {
              x: endPos.abs.x + (endControl.abs.x - endPos.abs.x) / -1,
              y: endPos.abs.y + (endControl.abs.y - endPos.abs.y) / -1,
            },
            rel: {
              x: endControl.abs.x - endPos.abs.x,
              y: endControl.abs.y - endPos.abs.y,
            },
          }
        : { abs: { x: endPos.abs.x, y: endPos.abs.y }, rel: { x: 0, y: 0 } },
    endControl:
      tool.toLowerCase() === "t" && endControl !== undefined
        ? {
            abs: {
              x: endPos.abs.x + (endControl.abs.x - endPos.abs.x) / -1,
              y: endPos.abs.y + (endControl.abs.y - endPos.abs.y) / -1,
            },
            rel: {
              x: endControl.abs.x - endPos.abs.x,
              y: endControl.abs.y - endPos.abs.y,
            },
          }
        : {
            abs: { x: endPos.abs.x, y: endPos.abs.y },
            rel: { x: 0, y: 0 },
          },
  });
  updateTool({
    tool: rel === true ? tool.toLowerCase() : tool.toUpperCase(),
  });
  setSelectedState({ lineIndex: lineIndex + 1, inputIndex: 0 });
};

export default handleAddLine;

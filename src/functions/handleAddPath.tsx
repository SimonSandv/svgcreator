import {
  setSelectedState,
  $selectedState,
  $toolState,
  addPath,
  addLine,
  updateInput,
  updateLineTool,
  Store
} from "index";

const handleAddPath = (store: Store): void => {
  const { pathIndex } = $selectedState.getState();
  const { tool } = $toolState.getState();
  addPath();
  addLine({
    pathIndex: store.paths.length,
    tool: tool.short,
    endPos: { abs: { x: 0, y: 0 }, rel: { x: 0, y: 0 } },
    startControl: { abs: { x: 0, y: 0 }, rel: { x: 0, y: 0 } },
    endControl: { abs: { x: 0, y: 0 }, rel: { x: 0, y: 0 } },
  });
  updateInput({
    pathIndex: store.paths.length,
    lineIndex: 0,
    inputIndex: 0,
    relative: 0,
    absolute: 0,
  });
  updateInput({
    pathIndex: store.paths.length,
    lineIndex: 0,
    inputIndex: 0,
    relative: 0,
    absolute: 0,
    preview: true,
  });
  updateLineTool({
    pathIndex: store.paths.length,
    lineIndex: 0,
    tool: tool.short,
  });
  setSelectedState({
    pathIndex: pathIndex + 1,
    lineIndex: 0,
    inputIndex: 0,
  });
};

export default handleAddPath;

import {
  move,
  line,
  hline,
  vline,
  curve,
  scurve,
  quad,
  squad,
  arc,
  updateLineTool,
  updateTool,
  resetLinePreview,
  handleAddLine,
  updateLineData,
  loadPathData,
  $store,
  $selectedState,
  $toolState,
} from "index";

export const handleLeftClick = (): void => {
  let store = $store.getState();
  const { pathIndex, lineIndex, mode } = $selectedState.getState();
  let toolState = $toolState.getState();
  let tool = toolState.tool.short.toLowerCase();
  const prevTool = tool;
  if (mode === "line") {
    if (tool === "m" && lineIndex !== 0) {
      move(store);
      move(store, true);
    } else if (tool === "l" && lineIndex !== 0) {
      line(store);
      line(store, true);
    } else if (tool === "h" && lineIndex !== 0) {
      hline(store);
      hline(store, true);
    } else if (tool === "v" && lineIndex !== 0) {
      vline(store);
      vline(store, true);
    } else if (tool === "c" && lineIndex !== 0) {
      curve(store);
      curve(store, true);
    } else if (tool === "s" && lineIndex !== 0) {
      scurve(store);
      scurve(store, true);
    } else if (tool === "q" && lineIndex !== 0) {
      quad(store);
      quad(store, true);
    } else if (tool === "t" && lineIndex !== 0) {
      squad(store);
      squad(store, true);
    } else if (tool === "a" && lineIndex !== 0) {
      arc(store);
      arc(store, true);
    } else if (lineIndex === 0) {
      move(store);
      move(store, true);
      tool = "m";
    }
    updateLineData({
      pathIndex,
      lineIndex,
      preview: false,
    });
    loadPathData({ pathIndex });
    updateLineData({
      pathIndex,
      lineIndex: lineIndex + 1,
      preview: true,
    });
    loadPathData({ preview: true });
  }
  store = $store.getState();
  let selected = $selectedState.getState();
  if (
    selected.mode === "line" &&
    store.paths[pathIndex].lines[lineIndex].complete === true
  ) {
    handleAddLine(
      store,
      tool === "c" || tool === "s"
        ? "s"
        : tool === "q" || tool === "t"
        ? "t"
        : "l"
    );
    updateLineTool({
      pathIndex,
      lineIndex,
      tool,
    });
    resetLinePreview();
  }
    store = $store.getState(); //eslint-disable-line
  selected = $selectedState.getState();
  updateLineData({
    pathIndex,
    lineIndex: lineIndex,
    preview: false,
  });
  updateLineData({
    pathIndex,
    lineIndex: lineIndex,
    preview: true,
  });
  loadPathData({ pathIndex });
  loadPathData({ pathIndex, preview: true });
  if (lineIndex === 0 && tool !== prevTool) {
    toolState = $toolState.getState();
    tool = toolState.tool.short.toLowerCase();
    updateTool({ tool: prevTool });
    updateLineTool({
      pathIndex,
      lineIndex: lineIndex + 1,
      tool: prevTool,
    });
  }
};
export default handleLeftClick;

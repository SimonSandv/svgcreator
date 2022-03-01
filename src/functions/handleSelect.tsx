import React from "react";
import {
  updateLineTool,
  // updatePathData,
  // updatePosition,
  updateLineData,
  loadPathData,
} from "../index";

const handleSelect = (
  event: React.ChangeEvent<HTMLSelectElement>,
  pathIndex: number,
  lineIndex: number
): void => {
  updateLineTool({
    pathIndex,
    lineIndex,
    tool: event.target.value,
  });
  updateLineData({ pathIndex, lineIndex });
  loadPathData({ pathIndex });
};

export default handleSelect;

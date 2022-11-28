import React from "react";
import { updateInput, updateLineData, loadPathData } from "index";

const handleInput = (
  event: React.ChangeEvent<HTMLInputElement>,
  pathIndex: number,
  lineIndex: number,
  inputIndex: number
): void => {
  updateInput({
    pathIndex,
    lineIndex,
    inputIndex,
    relative: parseFloat(event.target.value),
    absolute: parseFloat(event.target.value),
  });
  updateLineData({
    pathIndex,
    lineIndex,
  });
  loadPathData({ pathIndex });
};

export default handleInput;

import {
  Store,
  // updateInput,
  updateInputArray,
  updateTool,
  updateLineTool,
  // loadPathData,
  $selectedState,
} from "index";

export const handleToolChange = (store: Store, tool: string): void => {
  const { pathIndex, lineIndex } = $selectedState.getState();
  updateTool({ tool });
  updateLineTool({
    pathIndex,
    lineIndex,
    tool: tool,
  });

  const current = store.paths[pathIndex].lines[lineIndex];
  const previous = store.paths[pathIndex].lines[lineIndex - 1];

  if (current.rel === false) {
    if (previous !== undefined) {
      if (tool.toLowerCase() === "c") {
        if (
          previous.tool.toLowerCase() === "m" ||
          previous.tool.toLowerCase() === "l"
        ) {
          updateInputArray({
            pathIndex,
            lineIndex,
            inputArray: [
              {
                id: 0,
                relative: 0,
                absolute:
                  previous.inputArray[previous.inputArray.length - 2].absolute,
              },
              {
                id: 1,
                relative: 0,
                absolute:
                  previous.inputArray[previous.inputArray.length - 1].absolute,
              },
              {
                id: 2,
                relative: 0,
                absolute:
                  previous.inputArray[previous.inputArray.length - 2].absolute,
              },
              {
                id: 3,
                relative: 0,
                absolute:
                  previous.inputArray[previous.inputArray.length - 1].absolute,
              },
              {
                id: 4,
                relative: 0,
                absolute:
                  previous.inputArray[previous.inputArray.length - 2].absolute,
              },
              {
                id: 5,
                relative: 0,
                absolute:
                  previous.inputArray[previous.inputArray.length - 1].absolute,
              },
            ],
          });
        }
      }
    }
  }

  /*   for (let p = 0; p < store.paths.length; p += 1) {
    for (let l = 0; l < store.paths[p].lines.length; l += 1) {
      updateNumberOfInputs({ pathIndex: p, lineIndex: l });
      updateNumberOfInputs({
        pathIndex: p,
        lineIndex: l,
        preview: true,
      });
      loadLineData({ pathIndex: p, lineIndex: l });
    }
    loadPathData({ pathIndex: p });
  } */
};

export default handleToolChange;

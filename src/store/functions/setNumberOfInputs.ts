import type { Path } from "types";
import { getInputArray } from "index";

export const setNumberOfInputs = (
  paths: Path[],
  pathIndex: number,
  lineIndex: number,
  preview: boolean = false
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      lines:
        pathMapIndex === pathIndex
          ? path.lines.map((line, lineMapIndex) => {
              if (preview === false) {
                return {
                  ...line,
                  inputArray:
                    lineIndex === lineMapIndex
                      ? getInputArray(line.tool.toLowerCase(), line.inputArray)
                      : line.inputArray,
                };
              }
              return {
                ...line,
                preview: {
                  ...line.preview,
                  inputArray:
                    lineIndex === lineMapIndex
                      ? getInputArray(
                          line.tool.toLowerCase(),
                          line.preview.inputArray
                        )
                      : line.preview.inputArray,
                },
              };
            })
          : path.lines,
    };
  });
};
export default setNumberOfInputs;

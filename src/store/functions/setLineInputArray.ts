import type { Path, InputArray } from "types";

export const setLineInputArray = (
  paths: Path[],
  pathIndex: number,
  lineIndex: number,
  inputArray: InputArray,
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
                    lineMapIndex === lineIndex ? inputArray : line.inputArray,
                };
              }
              return {
                ...line,
                preview: {
                  ...line.preview,
                  inputArray:
                    lineMapIndex === lineIndex
                      ? inputArray
                      : line.preview.inputArray,
                },
              };
            })
          : path.lines,
    };
  });
};
export default setLineInputArray;

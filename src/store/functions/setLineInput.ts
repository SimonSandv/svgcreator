import { Path } from "../../index";

export const setLineInput = (
  paths: Path[],
  pathIndex: number,
  lineIndex: number,
  inputIndex: number,
  relative: number,
  absolute: number,
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
                    lineMapIndex === lineIndex
                      ? line.inputArray.map((input) => {
                          return {
                            ...input,
                            relative:
                              input.id === inputIndex
                                ? relative
                                : input.relative,
                            absolute:
                              input.id === inputIndex
                                ? absolute
                                : input.absolute,
                          };
                        })
                      : line.inputArray,
                };
              }
              return {
                ...line,
                preview: {
                  ...line.preview,
                  inputArray:
                    lineMapIndex === lineIndex
                      ? line.preview.inputArray.map((input) => {
                          return {
                            ...input,
                            relative:
                              input.id === inputIndex
                                ? relative
                                : input.relative,
                            absolute:
                              input.id === inputIndex
                                ? absolute
                                : input.absolute,
                          };
                        })
                      : line.preview.inputArray,
                },
              };
            })
          : path.lines,
    };
  });
};
export default setLineInput;

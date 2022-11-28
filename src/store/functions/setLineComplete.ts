import type { Path } from "types";

export const setLineComplete = (
  paths: Path[],
  pathIndex: number,
  lineIndex: number,
  complete: boolean
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      lines:
        pathMapIndex === pathIndex
          ? path.lines.map((line, lineMapIndex) => {
              return {
                ...line,
                complete: lineIndex === lineMapIndex ? complete : line.complete,
              };
            })
          : path.lines,
    };
  });
};

export default setLineComplete;

import type { Path } from "types";

export const removeLineFromPath = (
  paths: Path[],
  pathIndex: number,
  lineIndex: number
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      lines:
        pathIndex === pathMapIndex
          ? path.lines.filter((line, lineMapIndex) => {
              return lineIndex !== lineMapIndex;
            })
          : path.lines,
    };
  });
};
export default removeLineFromPath;

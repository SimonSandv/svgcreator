import type { Path } from "types";

export const setPreviewStage = (
  paths: Path[],
  pathIndex: number,
  lineIndex: number,
  stage: number
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      lines:
        pathIndex === pathMapIndex
          ? path.lines.map((line, lineMapIndex) => {
              return {
                ...line,
                preview:
                  lineIndex === lineMapIndex
                    ? {
                        ...line.preview,
                        stage,
                      }
                    : line.preview,
              };
            })
          : path.lines,
    };
  });
};
export default setPreviewStage;

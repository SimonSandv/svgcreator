import type { Path } from "types";

export const setLineTool = (
  paths: Path[],
  pathIndex: number,
  lineIndex: number,
  tool: string
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      lines:
        pathMapIndex === pathIndex
          ? path.lines.map((line, lineMapIndex) => {
              return {
                ...line,
                tool:
                  lineMapIndex === lineIndex
                    ? line.rel
                      ? tool.toLowerCase()
                      : tool.toUpperCase()
                    : line.tool,
              };
            })
          : path.lines,
    };
  });
};
export default setLineTool;

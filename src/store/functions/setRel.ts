import type { Path } from "types";

//--------------------------------------------------------------
export const setRel = (
  paths: Path[],
  event: boolean,
  pathIndex?: number,
  lineIndex?: number
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      lines:
        pathIndex !== undefined
          ? pathMapIndex === pathIndex
            ? path.lines.map((line, lineMapIndex) => {
                return {
                  ...line,
                  tool:
                    lineIndex !== undefined
                      ? lineMapIndex === lineIndex
                        ? line.tool === line.tool.toLowerCase()
                          ? line.tool.toUpperCase()
                          : line.tool.toLowerCase()
                        : line.tool
                      : event === true
                      ? line.tool.toLowerCase()
                      : line.tool.toUpperCase(),
                  rel:
                    lineIndex !== undefined
                      ? lineMapIndex === lineIndex
                        ? event
                        : line.rel
                      : event,
                };
              })
            : path.lines
          : path.lines.map((line, lineMapIndex) => {
              return {
                ...line,
                tool:
                  lineIndex !== undefined
                    ? lineMapIndex === lineIndex
                      ? line.tool === line.tool.toLowerCase()
                        ? line.tool.toUpperCase()
                        : line.tool.toLowerCase()
                      : line.tool
                    : event === true
                    ? line.tool.toLowerCase()
                    : line.tool.toUpperCase(),
                rel:
                  lineIndex !== undefined
                    ? lineMapIndex === lineIndex
                      ? event
                      : line.rel
                    : event,
              };
            }),
    };
  });
};
export default setRel;

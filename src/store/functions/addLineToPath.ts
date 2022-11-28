import type { Path, CoordSet, Coord } from "types";

export const addLineToPath = (
  paths: Path[],
  pathIndex: number,
  tool: string,
  endPos: CoordSet,
  startControl: CoordSet,
  endControl: CoordSet,
  degree: number = 0,
  radius: Coord = { x: 0, y: 0 },
  largeArcFlag: 0 | 1 = 0,
  sweepFlag: 0 | 1 = 0
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      lines:
        pathMapIndex === pathIndex
          ? [
              ...path.lines,
              {
                lineIndex:
                  Math.max(
                    -1,
                    Math.max(
                      ...path.lines.map(({ lineIndex }) => {
                        return lineIndex;
                      })
                    )
                  ) + 1,
                inputArray: [
                  { id: 0, value: 0, relative: 0, absolute: 0 },
                  { id: 1, value: 0, relative: 0, absolute: 0 },
                ],
                param: {
                  endPos,
                  startControl,
                  endControl,
                  degree,
                  radius,
                  largeArcFlag,
                  sweepFlag,
                },
                tool,
                data: { abs: "", rel: "" },
                rel:
                  path.lines[paths.length - 1] !== undefined
                    ? path.lines[paths.length - 1].rel
                    : false,
                preview: {
                  data: { abs: "", rel: "" },
                  inputArray: [
                    { id: 0, value: 0, relative: 0, absolute: 0 },
                    { id: 1, value: 0, relative: 0, absolute: 0 },
                  ],
                  stage: 0,
                  param: {
                    endPos,
                    startControl,
                    endControl,
                    degree,
                    radius,
                    largeArcFlag,
                    sweepFlag,
                  },
                },
                complete: false,
              },
            ]
          : path.lines,
    };
  });
};
export default addLineToPath;

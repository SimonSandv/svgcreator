import type { Path } from "types";

export const setStrokeWidthValue = (
  paths: Path[],
  pathIndex: number,
  value: number
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      stroke: {
        ...path.stroke,
        width: {
          ...path.stroke.width,
          value: pathMapIndex === pathIndex ? value : path.stroke.width.value,
          joined:
            pathMapIndex === pathIndex
              ? value.toString() + path.stroke.width.operand
              : path.stroke.width.joined,
        },
      },
    };
  });
};
export default setStrokeWidthValue;

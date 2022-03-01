import { Path } from "../../index";

export const setStrokeColor = (
  paths: Path[],
  pathIndex: number,
  color: string
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      stroke: {
        ...path.attr.stroke,
        color:
          pathMapIndex === pathIndex
            ? color
            : path.attr.stroke !== undefined
            ? path.attr.stroke.color
            : undefined,
      },
    };
  });
};
export default setStrokeColor;

import { Path } from "../../index";

export const setStrokeWidthOperand = (
  paths: Path[],
  pathIndex: number,
  operand: string
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      stroke: {
        ...path.stroke,
        width: {
          ...path.stroke.width,
          operand:
            pathMapIndex === pathIndex ? operand : path.stroke.width.operand,
          joined:
            pathMapIndex === pathIndex
              ? path.stroke.width.value.toString() + operand
              : path.stroke.width.joined,
        },
      },
    };
  });
};
export default setStrokeWidthOperand;

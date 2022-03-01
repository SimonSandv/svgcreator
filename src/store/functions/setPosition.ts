import { Path } from "../../index";

export const setPosition = (
  paths: Path[],
  pathIndex: number,
  x: number,
  y: number
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      position: {
        current: {
          x: pathMapIndex === pathIndex ? x : path.position.current.x,
          y: pathMapIndex === pathIndex ? y : path.position.current.y,
        },
        previous: { x: path.position.current.x, y: path.position.current.y },
      },
    };
  });
};
export default setPosition;

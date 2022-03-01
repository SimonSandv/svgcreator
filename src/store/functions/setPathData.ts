import { Path } from "../../index";

export const setPathData = (
  paths: Path[],
  pathIndex: number,
  data: string
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      data: pathMapIndex === pathIndex ? data : path.data,
    };
  });
};
export default setPathData;

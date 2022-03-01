import { Path } from "../../index";

export const removePathFromList = (
  paths: Path[],
  pathIndex: number
): Path[] => {
  return paths.filter((path, pathMapIndex) => {
    return pathMapIndex !== pathIndex;
  });
};
export default removePathFromList;

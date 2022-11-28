import type { Path } from "types";

export const removePathFromList = (
  paths: Path[],
  pathIndex: number
): Path[] => {
  return paths.filter((path, pathMapIndex) => {
    return pathMapIndex !== pathIndex;
  });
};
export default removePathFromList;

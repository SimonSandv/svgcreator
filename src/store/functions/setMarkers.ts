import type { Path } from "types";

//--------------------------------------------------------------
export const setMarkers = (
  paths: Path[],
  pathIndex?: number,
  showStart?: boolean,
  showMid?: boolean,
  showEnd?: boolean
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      markers:
        pathMapIndex === pathIndex
          ? {
              start: {
                show:
                  showStart !== undefined ? showStart : path.markers.start.show,
              },
              mid: {
                show: showMid !== undefined ? showMid : path.markers.mid.show,
              },
              end: {
                show: showEnd !== undefined ? showEnd : path.markers.end.show,
              },
            }
          : path.markers,
    };
  });
};
export default setMarkers;

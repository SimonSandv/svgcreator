import type { Path } from "types";

export const joinPathData = (
  paths: Path[],
  pathIndex?: number,
  preview: boolean = false
): Path[] => {
  return paths.map((path, pathMapIndex) => {
    if (preview === false) {
      return {
        ...path,
        data:
          pathIndex !== undefined
            ? pathMapIndex === pathIndex
              ? path.lines
                  .map((line) => {
                    return line.complete === true
                      ? line.rel === true
                        ? line.data.rel
                        : line.data.abs
                      : null;
                  })
                  .join(" ")
              : path.data
            : path.lines
                .map((line) => {
                  return line.rel === true ? line.data.rel : line.data.abs;
                })
                .join(" "),
      };
    }
    return {
      ...path,
      previewData:
        pathIndex !== undefined
          ? pathMapIndex === pathIndex
            ? path.lines
                .map((line) => {
                  return line.rel === true
                    ? line.preview.data.rel
                    : line.preview.data.abs;
                })
                .join(" ")
            : path.previewData
          : path.lines
              .map((line) => {
                return line.rel === true
                  ? line.preview.data.rel
                  : line.preview.data.abs;
              })
              .join(" "),
    };
  });
};
export default joinPathData;

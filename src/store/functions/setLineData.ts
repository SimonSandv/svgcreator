import { Path, Line } from "../../index";

export const setLineData = (
  paths: Path[],
  pathIndex: number | undefined,
  lineIndex: number | undefined,
  preview: boolean = false
): Path[] => {
  const getData = (line: Line, rel: boolean): string => {
    const tool = line.tool.toLowerCase();
    const {
      endPos,
      startControl,
      endControl,
      radius,
      degree,
      largeArcFlag,
      sweepFlag,
    } = preview === false ? line.param : line.preview.param;
    if (rel === true) {
      if (tool === "m" || tool === "l" || tool === "t") {
        return [line.tool, endPos.rel.x, endPos.rel.y].join(" ");
      }
      if (tool === "h") {
        return [line.tool, endPos.rel.x].join(" ");
      }
      if (tool === "v") {
        return [line.tool, endPos.rel.y].join(" ");
      }
      if (tool === "c") {
        return [
          line.tool,
          startControl !== undefined ? startControl.rel.x : endPos.rel.x,
          startControl !== undefined ? startControl.rel.y : endPos.rel.y,
          endControl !== undefined ? endControl.rel.x : endPos.rel.x,
          endControl !== undefined ? endControl.rel.y : endPos.rel.y,
          endPos.rel.x,
          endPos.rel.y,
        ].join(" ");
      }
      if (tool === "s") {
        return [
          line.tool,
          endControl !== undefined ? endControl.rel.x : endPos.rel.x,
          endControl !== undefined ? endControl.rel.y : endPos.rel.y,
          endPos.rel.x,
          endPos.rel.y,
        ].join(" ");
      }
      if (tool === "q") {
        return [
          line.tool,
          endControl !== undefined ? endControl.rel.x : endPos.rel.x / 2,
          endControl !== undefined ? endControl.rel.y : endPos.rel.y / 2,
          endPos.rel.x,
          endPos.rel.y,
        ].join(" ");
      }
      if (tool === "a") {
        return [
          line.tool,
          radius !== undefined ? radius.x : 0,
          radius !== undefined ? radius.y : 0,
          degree !== undefined ? degree : 145,
          largeArcFlag !== undefined ? largeArcFlag : 1,
          sweepFlag !== undefined ? sweepFlag : 1,
          endPos.rel.x,
          endPos.rel.y,
        ].join(" ");
      }
      return `${line.tool}`;
    }
    if (line.rel === false) {
      if (tool === "m" || tool === "l" || tool === "t") {
        return [line.tool, endPos.abs.x, endPos.abs.y].join(" ");
      }
      if (tool === "h") {
        return [line.tool, endPos.abs.x].join(" ");
      }
      if (tool === "v") {
        return [line.tool, endPos.abs.y].join(" ");
      }
      if (tool === "c") {
        return [
          line.tool,
          startControl !== undefined ? startControl.abs.x : endPos.abs.x,
          startControl !== undefined ? startControl.abs.y : endPos.abs.y,
          endControl !== undefined ? endControl.abs.x : endPos.abs.x,
          endControl !== undefined ? endControl.abs.y : endPos.abs.y,
          endPos.abs.x,
          endPos.abs.y,
        ].join(" ");
      }
      if (tool === "s") {
        return [
          line.tool,
          endControl !== undefined ? endControl.abs.x : endPos.abs.x,
          endControl !== undefined ? endControl.abs.y : endPos.abs.y,
          endPos.abs.x,
          endPos.abs.y,
        ].join(" ");
      }
      if (tool === "q") {
        return [
          line.tool,
          endControl !== undefined ? endControl.abs.x : endPos.abs.x,
          endControl !== undefined ? endControl.abs.y : endPos.abs.y,
          endPos.abs.x,
          endPos.abs.y,
        ].join(" ");
      }
      if (tool === "a") {
        return [
          line.tool,
          radius !== undefined ? radius.x : 0,
          radius !== undefined ? radius.y : 0,
          degree !== undefined ? degree : 145,
          largeArcFlag !== undefined ? largeArcFlag : 1,
          sweepFlag !== undefined ? sweepFlag : 1,
          endPos.abs.x,
          endPos.abs.y,
        ].join(" ");
      }
      return `${line.tool}`;
    }
    return "";
  };

  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      lines:
        pathIndex !== undefined
          ? pathMapIndex === pathIndex
            ? path.lines.map((line, lineMapIndex) => {
                if (preview === false) {
                  return {
                    ...line,
                    data:
                      lineIndex !== undefined
                        ? lineMapIndex === lineIndex
                          ? {
                              abs: getData(line, false),
                              rel: getData(line, true),
                            }
                          : line.data
                        : {
                            abs: getData(line, false),
                            rel: getData(line, true),
                          },
                  };
                }
                return {
                  ...line,
                  preview: {
                    ...line.preview,
                    data:
                      lineIndex !== undefined
                        ? lineMapIndex === lineIndex
                          ? {
                              abs: getData(line, false),
                              rel: getData(line, true),
                            }
                          : line.preview.data
                        : {
                            abs: getData(line, false),
                            rel: getData(line, true),
                          },
                  },
                };
              })
            : path.lines
          : path.lines.map((line, lineMapIndex) => {
              if (preview === false) {
                return {
                  ...line,
                  data:
                    lineIndex !== undefined
                      ? lineMapIndex === lineIndex
                        ? {
                            abs: getData(line, false),
                            rel: getData(line, true),
                          }
                        : line.data
                      : {
                          abs: getData(line, false),
                          rel: getData(line, true),
                        },
                };
              }
              return {
                ...line,
                preview: {
                  ...line.preview,
                  data:
                    lineIndex !== undefined
                      ? lineMapIndex === lineIndex
                        ? {
                            abs: getData(line, false),
                            rel: getData(line, true),
                          }
                        : line.preview.data
                      : { abs: getData(line, false), rel: getData(line, true) },
                },
              };
            }),
    };
  });
};
export default setLineData;

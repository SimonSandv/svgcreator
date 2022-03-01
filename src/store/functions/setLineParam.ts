import { CoordSet, Coord, Path } from "../../index";

function setLineParam(
  paths: Path[],
  pathIndex: number,
  lineIndex: number,
  endPos?: CoordSet,
  startControl?: CoordSet | undefined,
  endControl?: CoordSet | undefined,
  degree?: number | undefined,
  radius?: Coord | undefined,
  largeArcFlag?: 0 | 1 | undefined,
  sweepFlag?: 0 | 1 | undefined,
  preview: boolean = false,
  save: boolean = true
): Path[] {
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      lines:
        pathMapIndex === pathIndex
          ? path.lines.map((line, lineMapIndex) => {
              if (preview === false) {
                return {
                  ...line,
                  param:
                    lineMapIndex === lineIndex
                      ? {
                          ...line.param,
                          endPos:
                            endPos !== undefined
                              ? endPos
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.param,
                                  "endPos"
                                )
                              ? line.param.endPos
                              : { abs: { x: 0, y: 0 }, rel: { x: 0, y: 0 } },
                          startControl:
                            startControl !== undefined
                              ? startControl
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.param,
                                  "startControl"
                                )
                              ? line.param.startControl
                              : undefined,
                          endControl:
                            endControl !== undefined
                              ? endControl
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.param,
                                  "endControl"
                                )
                              ? line.param.endControl
                              : undefined,
                          degree:
                            degree !== undefined
                              ? degree
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.param,
                                  "degree"
                                )
                              ? line.param.degree
                              : undefined,
                          radius:
                            radius !== undefined
                              ? radius
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.param,
                                  "radius"
                                )
                              ? line.param.radius
                              : undefined,
                          largeArcFlag:
                            largeArcFlag !== undefined
                              ? largeArcFlag
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.param,
                                  "largeArcFlag"
                                )
                              ? line.param.largeArcFlag
                              : undefined,
                          sweepFlag:
                            sweepFlag !== undefined
                              ? sweepFlag
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.param,
                                  "sweepFlag"
                                )
                              ? line.param.sweepFlag
                              : undefined,
                        }
                      : line.param,
                };
              }
              return {
                ...line,
                preview: {
                  ...line.preview,
                  param:
                    lineMapIndex === lineIndex
                      ? {
                          ...line.preview.param,
                          endPos:
                            endPos !== undefined
                              ? endPos
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.preview.param,
                                  "endPos"
                                )
                              ? line.preview.param.endPos
                              : { abs: { x: 0, y: 0 }, rel: { x: 0, y: 0 } },
                          startControl:
                            startControl !== undefined
                              ? startControl
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.preview.param,
                                  "startControl"
                                )
                              ? line.preview.param.startControl
                              : undefined,
                          endControl:
                            endControl !== undefined
                              ? endControl
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.preview.param,
                                  "endControl"
                                )
                              ? line.preview.param.endControl
                              : undefined,
                          degree:
                            degree !== undefined
                              ? degree
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.preview.param,
                                  "degree"
                                )
                              ? line.preview.param.degree
                              : undefined,
                          radius:
                            radius !== undefined
                              ? radius
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.preview.param,
                                  "radius"
                                )
                              ? line.preview.param.radius
                              : undefined,
                          largeArcFlag:
                            largeArcFlag !== undefined
                              ? largeArcFlag
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.preview.param,
                                  "largeArcFlag"
                                )
                              ? line.preview.param.largeArcFlag
                              : undefined,
                          sweepFlag:
                            sweepFlag !== undefined
                              ? sweepFlag
                              : save === true &&
                                Object.prototype.hasOwnProperty.call(
                                  line.preview.param,
                                  "sweepFlag"
                                )
                              ? line.preview.param.sweepFlag
                              : undefined,
                        }
                      : line.preview.param,
                },
              };
            })
          : path.lines,
    };
  });
}

export default setLineParam;

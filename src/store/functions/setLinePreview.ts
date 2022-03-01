import { Path } from "../../index";

export const setLinePreview = (paths: Path[]): Path[] => {
  return paths.map((path) => {
    return {
      ...path,
      lines: path.lines.map((line) => {
        return {
          ...line,
          preview: { ...line.preview, param: line.param, data: line.data },
        };
      }),
    };
  });
};

export default setLinePreview;

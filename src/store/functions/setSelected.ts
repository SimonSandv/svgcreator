import { Selected } from "../../index";

export const setSelected = (
  selected: Selected,
  mode?: string,
  pathIndex?: number,
  lineIndex?: number,
  inputIndex?: number,
  point?: string,
  drag?: boolean
): Selected => {
  return {
    mode: mode !== undefined ? mode : selected.mode,
    pathIndex: pathIndex !== undefined ? pathIndex : selected.pathIndex,
    lineIndex: lineIndex !== undefined ? lineIndex : selected.lineIndex,
    inputIndex: inputIndex !== undefined ? inputIndex : selected.inputIndex,
    point: point !== undefined ? point : selected.point,
    drag: drag !== undefined ? drag : selected.drag,
  };
};
export default setSelected;

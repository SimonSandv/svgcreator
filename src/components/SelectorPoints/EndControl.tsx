import { useStore } from "effector-react";
import React, { useState, MouseEvent } from "react";
import { $selectedState, $store, setSelectedState, $viewBoxState, $guideState } from "index";

interface LineProps {
  pathIndex: number;
  lineIndex: number;
  stroke: string;
}
const EndControlLine = React.memo((props: LineProps): JSX.Element | null => {
  const store = useStore($store);
  const guideState = useStore($guideState);
  const viewBox = useStore($viewBoxState);

  const { pathIndex, lineIndex, stroke } = props;
  const current = store.paths[pathIndex].lines[lineIndex];
  const { endControl, endPos } = current.preview.param;
  const strokeWidth =
    ((viewBox.height / 100 + viewBox.width / 100) / 2) *
    guideState.endControl.line.strokeWidth;

  if (store.paths[pathIndex] !== undefined && endControl !== undefined) {
    return React.createElement("line", {
      id: `guide-${pathIndex}-${lineIndex}-endControlLine`,
      key: `guide-${pathIndex}-${lineIndex}-endControlLine`,
      className: "controlLine endControlLine",
      x1: endPos.abs.x,
      y1: endPos.abs.y,
      x2: endControl.abs.x,
      y2: endControl.abs.y,
      strokeWidth,
      stroke,
      pointerEvents: "none",
    });
  }
  return null;
});

interface PointProps {
  pathIndex: number;
  lineIndex: number;
  fill: string;
}
const EndControlPoint = React.memo((props: PointProps): JSX.Element | null => {
  const store = useStore($store);
  const guideState = useStore($guideState);
  const viewBox = useStore($viewBoxState);
  const { pathIndex, lineIndex, fill } = props;
  const current = store.paths[pathIndex].lines[lineIndex];
  const { endControl } = current.preview.param;
  const r =
    ((viewBox.height / 100 + viewBox.width / 100) / 2) *
    guideState.endControl.point.radius;

  if (store.paths[pathIndex] !== undefined && endControl !== undefined) {
    return React.createElement("circle", {
      id: `guidePoint-${pathIndex}-${lineIndex}-endControlPoint`,
      key: `guidePoint-${pathIndex}-${lineIndex}-endControlPoint`,
      className: "guidePoint controlPoint endControlPoint",
      cx: endControl.abs.x,
      cy: endControl.abs.y,
      r,
      fill,
      pointerEvents: "none",
    });
  }
  return null;
});

interface MoveProps {
  pathIndex: number;
  lineIndex: number;
  fill: string;
  colorInSet: (arg0: string) => void;
  colorOutSet: (arg0: string) => void;
  colorLineSet: (arg0: string) => void;
}
const EndControlMove = React.memo((props: MoveProps): JSX.Element | null => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const guideState = useStore($guideState);
  const viewBox = useStore($viewBoxState);
  const { pathIndex, lineIndex, colorInSet, colorOutSet, colorLineSet } = props;
  const { mode } = selected;
  const current = store.paths[pathIndex].lines[lineIndex];
  const { endControl, endPos } = current.preview.param;
  const { fill, radius, stroke, strokeWidth } = guideState.endControl.point;
  const { line } = guideState.endControl;
  const tool = current.tool.toLowerCase();
  const r =
    ((viewBox.height / 100 + viewBox.width / 100) / 2) * (radius + strokeWidth);

  const onMouseEnter = (): void => {
    colorInSet(fill.default);
    colorOutSet(stroke.hover);
    colorLineSet(line.stroke.default);
  };

  const onMouseLeave = (): void => {
    colorInSet(fill.default);
    colorOutSet(stroke.default);
  };

  const onMouseDown = (
    e: MouseEvent<SVGElement, globalThis.MouseEvent>
  ): void => {
    console.log("pathIndex: ", pathIndex, "lineIndex: ", lineIndex);
    if (
      e.type === "mousedown" &&
      e.button === 0 &&
      (mode === "deselected" || mode === "point") &&
      tool !== "t"
    ) {
      setSelectedState({
        mode: "point",
        pathIndex: pathIndex,
        lineIndex:
          lineIndex !== selected.lineIndex ? lineIndex : selected.lineIndex,
        point: "endControl",
        drag: true,
      });
    }
  };

  if (store.paths[pathIndex] !== undefined && endControl !== undefined) {
    return React.createElement("circle", {
      id: `guidePoint-${pathIndex}-${lineIndex}-endControlPoint`,
      key: `guidePoint-${pathIndex}-${lineIndex}-endControlPoint`,
      className: "movePoint endControlMove",
      cx: endControl.abs.x,
      cy: endControl.abs.y,
      r,
      fill: props.fill,
      pointerEvents: endControl.abs === endPos.abs ? "none" : "all",
      onMouseEnter,
      onMouseLeave,
      onMouseDown: (event) => {
        onMouseDown(event);
      },
    });
  }
  return null;
});

interface Props {
  pathIndex: number;
  lineIndex: number;
}
export const EndControl = React.memo((props: Props): JSX.Element | null => {
  const { pathIndex, lineIndex } = props;
  const store = useStore($store);
  const selected = useStore($selectedState);
  const guideState = useStore($guideState);
  const { fill, stroke } = guideState.endControl.point;
  const lineCol = guideState.endControl.line.stroke;
  const current = store.paths[pathIndex].lines[lineIndex];
  const tool = current.tool.toLowerCase();
  const { inputIndex } = selected;

  const [colorIn, colorInSet] = useState(
    tool === "t" ? fill.inactive : fill.default
  );
  const [colorOut, colorOutSet] = useState(
    tool === "t" ? stroke.inactive : lineCol.default
  );
  const [colorLine, colorLineSet] = useState(
    tool === "t" ? lineCol.inactive : lineCol.default
  );

  if (
    (tool === "c" && inputIndex !== 0) ||
    (tool === "c" && current.complete === true) ||
    (tool === "s" && inputIndex !== 0) ||
    (tool === "s" && current.complete === true) ||
    (tool === "q" && inputIndex !== 0) ||
    (tool === "q" && current.complete === true) ||
    tool === "t"
  ) {
    return (
      <g>
        <EndControlLine
          pathIndex={pathIndex}
          lineIndex={lineIndex}
          stroke={colorLine}
        />
        <EndControlMove
          pathIndex={pathIndex}
          lineIndex={lineIndex}
          fill={colorOut}
          colorInSet={colorInSet}
          colorOutSet={colorOutSet}
          colorLineSet={colorLineSet}
        />
        <EndControlPoint
          pathIndex={pathIndex}
          lineIndex={lineIndex}
          fill={colorIn}
        />
      </g>
    );
  }
  return null;
});

export default EndControl;

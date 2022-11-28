import { useStore } from "effector-react";
import type { MouseEvent } from "react";
import React, { useState } from "react";
import {
  $store,
  $selectedState,
  $guideState,
  $viewBoxState,
  updateLineTool,
  updateLineParam,
  updateLineData,
  loadPathData,
  updateTool,
  setSelectedState,
} from "index";

interface LineProps {
  pathIndex: number;
  lineIndex: number;
  stroke: string;
}
const StartControlLine = React.memo((props: LineProps): JSX.Element | null => {
  const store = useStore($store);
  const guideState = useStore($guideState);
  const viewBox = useStore($viewBoxState);
  const { pathIndex, lineIndex, stroke } = props;
  const current = store.paths[pathIndex].lines[lineIndex];
  const { height, width } = viewBox;
  const { paths } = store;
  const { startControl } = current.preview.param;
  const startPos =
    paths[pathIndex].lines[lineIndex - 1] !== undefined
      ? paths[pathIndex].lines[lineIndex - 1].param.endPos.abs
      : { x: 0, y: 0 };
  const strokeWidth =
    ((height / 100 + width / 100) / 2) *
    guideState.startControl.line.strokeWidth;

  if (paths[pathIndex] !== undefined && startControl !== undefined) {
    return React.createElement("line", {
      id: `guide-${pathIndex}-${lineIndex}-startControlLine`,
      key: `guide-${pathIndex}-${lineIndex}-startControlLine`,
      className: "guideLine",
      x1: startPos.x,
      y1: startPos.y,
      x2: startControl.abs.x,
      y2: startControl.abs.y,
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
const StartControlPoint = React.memo(
  (props: PointProps): JSX.Element | null => {
    const store = useStore($store);
    const guideState = useStore($guideState);
    const viewBox = useStore($viewBoxState);
    const { pathIndex, lineIndex } = props;
    const current = store.paths[pathIndex].lines[lineIndex];
    const { paths } = store;
    const { width, height } = viewBox;
    const { startControl } = current.preview.param;
    const r =
      ((height / 100 + width / 100) / 2) * guideState.endControl.point.radius;

    if (paths[pathIndex] !== undefined && startControl !== undefined) {
      return React.createElement("circle", {
        id: `guidePoint-${pathIndex}-${lineIndex}-startControlPoint`,
        key: `guidePoint-${pathIndex}-${lineIndex}-startControlPoint`,
        className: "guidePoint",
        cx: startControl.abs.x,
        cy: startControl.abs.y,
        r,
        fill: props.fill,
        pointerEvents: "none",
      });
    }
    return null;
  }
);

interface MoveProps {
  pathIndex: number;
  lineIndex: number;
  fill: string;
  colorInSet: (arg0: string) => void;
  colorOutSet: (arg0: string) => void;
  colorLineSet: (arg0: string) => void;
}
const StartControlMove = React.memo((props: MoveProps): JSX.Element | null => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const guideState = useStore($guideState);
  const viewBox = useStore($viewBoxState);
  const { pathIndex, lineIndex, colorInSet, colorOutSet, colorLineSet } = props;
  const current = store.paths[pathIndex].lines[lineIndex];
  const { paths } = store;
  const { mode } = selected;
  const { startControl, endPos } = current.preview.param;
  const { fill, radius, stroke, strokeWidth } = guideState.startControl.point;
  const { line } = guideState.startControl;
  const tool = current.tool.toLowerCase();
  const { height, width } = viewBox;
  const r = ((height / 100 + width / 100) / 2) * (radius + strokeWidth);

  const onMouseEnter = (): void => {
    colorInSet(tool === "s" ? fill.inactive : fill.default);
    colorOutSet(stroke.hover);
    colorLineSet(tool === "s" ? line.stroke.inactive : line.stroke.hover);
  };

  const onMouseLeave = (): void => {
    colorInSet(tool === "s" ? fill.inactive : fill.default);
    colorOutSet(tool === "s" ? stroke.inactive : stroke.default);
  };

  const onMouseDown = (
    e: MouseEvent<SVGElement, globalThis.MouseEvent>
  ): void => {
    console.log("pathIndex: ", pathIndex, "lineIndex: ", lineIndex);
    if (
      (mode === "deselected" || mode === "point") &&
      tool !== "s" &&
      tool !== "t"
    ) {
      setSelectedState({
        mode: "point",
        pathIndex: pathIndex,
        lineIndex:
          lineIndex !== selected.lineIndex ? lineIndex : selected.lineIndex,
        point: "startControl",
        drag: true,
      });
    }
    if (
      e.type === "mousedown" &&
      e.button === 2 &&
      (mode === "deselected" || mode === "point") &&
      (tool === "s" || tool === "S")
    ) {
      updateLineTool({ pathIndex, lineIndex, tool: current.rel ? "c" : "C" });
      updateTool({ tool: current.rel ? "c" : "C" });
      setSelectedState({
        mode: "point",
        pathIndex: pathIndex,
        lineIndex:
          lineIndex !== selected.lineIndex ? lineIndex : selected.lineIndex,
        point: "startControl",
        drag: false,
      });
      updateLineParam({
        pathIndex,
        lineIndex,
        startControl: store.paths[pathIndex].lines[lineIndex - 1].param.endPos,
      });
      updateLineData({
        pathIndex,
        lineIndex: lineIndex,
        preview: false,
      });
      loadPathData({ pathIndex });
    }
  };

  if (paths[pathIndex] !== undefined && startControl !== undefined) {
    return React.createElement("circle", {
      id: `guidePoint-${pathIndex}-${lineIndex}-startControlPoint`,
      key: `guidePoint-${pathIndex}-${lineIndex}-startControlPoint`,
      className: "guidePoint",
      cx: startControl.abs.x,
      cy: startControl.abs.y,
      r,
      fill: props.fill,
      pointerEvents: startControl.abs === endPos.abs ? "none" : "all",
      onMouseEnter,
      onMouseLeave,
      onMouseDown: (e) => {
        onMouseDown(e);
      },
    });
  }
  return null;
});

interface Props {
  pathIndex: number;
  lineIndex: number;
}
export const StartControl = React.memo((props: Props): JSX.Element | null => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const guideState = useStore($guideState);
  const { pathIndex, lineIndex } = props;
  const current = store.paths[pathIndex].lines[lineIndex];
  const { inputIndex } = selected;
  const tool = current.tool.toLowerCase();

  const { fill, stroke } = guideState.startControl.point;
  const lineCol = guideState.startControl.line.stroke;
  const [colorIn, colorInSet] = useState(
    tool === "s" || tool === "t" ? fill.inactive : fill.default
  );
  const [colorOut, colorOutSet] = useState(
    tool === "s" || tool === "t" ? stroke.inactive : lineCol.default
  );
  const [colorLine, colorLineSet] = useState(
    tool === "s" || tool === "t" ? lineCol.inactive : lineCol.default
  );

  if (
    (tool === "c" && inputIndex !== 0) ||
    (tool === "c" && current.complete === true) ||
    tool === "s" ||
    (tool === "q" && inputIndex !== 0) ||
    (tool === "q" && current.complete === true) ||
    tool === "t"
  ) {
    return (
      <g>
        <StartControlLine
          pathIndex={pathIndex}
          lineIndex={lineIndex}
          stroke={colorLine}
        />
        <StartControlMove
          pathIndex={pathIndex}
          lineIndex={lineIndex}
          fill={colorOut}
          colorInSet={colorInSet}
          colorOutSet={colorOutSet}
          colorLineSet={colorLineSet}
        />
        <StartControlPoint
          pathIndex={pathIndex}
          lineIndex={lineIndex}
          fill={colorIn}
        />
      </g>
    );
  }
  return null;
});

export default StartControl;

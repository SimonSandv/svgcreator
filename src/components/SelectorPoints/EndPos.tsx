import { useStore } from "effector-react";
import React, { useState } from "react";
import {
  $store,
  $selectedState,
  setSelectedState,
  $viewBoxState,
  $guideState,
} from "index";

interface PointProps {
  pathIndex: number;
  lineIndex: number;
  fill: string;
}
const EndPosPoint = React.memo((props: PointProps): JSX.Element | null => {
  const store = useStore($store);
  const guideState = useStore($guideState);
  const viewBox = useStore($viewBoxState);
  const { pathIndex, lineIndex, fill } = props;
  const { endPos } = store.paths[pathIndex].lines[lineIndex].param;
  const { radius } = guideState.endPos.point;
  const r = ((viewBox.height / 100 + viewBox.width / 100) / 2) * radius;

  if (store.paths[pathIndex] !== undefined) {
    return React.createElement("circle", {
      id: `guidePoint-${pathIndex}-${lineIndex}-endPosPoint`,
      key: `guidePoint-${pathIndex}-${lineIndex}-endPosPoint`,
      className: "endPosPoint",
      cx: endPos.abs.x,
      cy: endPos.abs.y,
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
}
const EndPosMove = React.memo((props: MoveProps): JSX.Element | null => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const viewBox = useStore($viewBoxState);
  const guideState = useStore($guideState);
  const { pathIndex, lineIndex, colorInSet, colorOutSet } = props;
  const { endPos } = store.paths[pathIndex].lines[lineIndex].param;
  const { mode } = selected;
  const { fill, radius, stroke, strokeWidth } = guideState.endPos.point;
  const r =
    ((viewBox.height / 100 + viewBox.width / 100) / 2) * (radius + strokeWidth);

  const onMouseEnter = (): void => {
    colorInSet(fill.default);
    colorOutSet(stroke.hover);
  };

  const onMouseLeave = (): void => {
    colorInSet(fill.default);
    colorOutSet(stroke.default);
  };

  const onMouseDown = (): void => {
    if (mode === "deselected" || mode === "point") {
      setSelectedState({
        mode: "point",
        pathIndex: pathIndex,
        lineIndex:
          lineIndex !== selected.lineIndex ? lineIndex : selected.lineIndex,
        point: "endPos",
        drag: true,
      });
    }
  };

  if (store.paths[pathIndex] !== undefined) {
    return React.createElement("circle", {
      id: `guidePoint-${pathIndex}-${lineIndex}-endPosPoint`,
      key: `guidePoint-${pathIndex}-${lineIndex}-endPosPoint`,
      className: "movePoint",
      cx: endPos.abs.x,
      cy: endPos.abs.y,
      r,
      fill: props.fill,
      pointerEvents: "all",
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
    });
  }
  return null;
});

interface Props {
  pathIndex: number;
  lineIndex: number;
}
export const EndPos = React.memo((props: Props): JSX.Element | null => {
  const { pathIndex, lineIndex } = props;
  const guideState = useStore($guideState);
  const { fill, stroke } = guideState.endPos.point;

  const [colorIn, colorInSet] = useState(fill.default);
  const [colorOut, colorOutSet] = useState(stroke.default);

  return (
    <g>
      <EndPosMove
        pathIndex={pathIndex}
        lineIndex={lineIndex}
        fill={colorOut}
        colorInSet={colorInSet}
        colorOutSet={colorOutSet}
      />
      <EndPosPoint pathIndex={pathIndex} lineIndex={lineIndex} fill={colorIn} />
    </g>
  );
});

export default EndPos;

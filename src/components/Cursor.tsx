import { useStore } from "effector-react";
import React from "react";
import styled from "@emotion/styled";
import { $viewBoxState, $svgMousePos, $cursorState } from "../index";

const Cursor = (): JSX.Element => {
  const viewBox = useStore($viewBoxState);
  const { x, y } = useStore($svgMousePos);
  const { shape, snap } = useStore($cursorState);

  const CursorRect = (): JSX.Element => {
    const width = 1;
    const height = 1;
    return (
      <Rect
        key="cursor"
        x={snap === true ? Math.round(x) - width / 2 : x - width / 2}
        y={snap === true ? Math.round(y) - height / 2 : y - height / 2}
        width={width}
        height={height}
      />
    );
  };

  const CursorDot = (): JSX.Element => {
    return (
      <Circle
        key="cursor"
        cx={snap === true ? Math.round(x) : x}
        cy={snap === true ? Math.round(y) : y}
        r={(viewBox.height / 100 + viewBox.width / 100) / 2}
      />
    );
  };

  return (
    <g>
      {(x === 0 || y === 0 || x === viewBox.width || y === viewBox.height) ===
      true ? null : shape === "circle" ? (
        <CursorDot />
      ) : (
        <CursorRect />
      )}
    </g>
  );
};
export default React.memo(Cursor);

const Rect = styled.rect`
  fill: lightBlue;
`;

const Circle = styled.circle`
  fill: lightBlue;
`;

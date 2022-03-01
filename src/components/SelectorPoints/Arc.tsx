import { useStore } from "effector-react";
import React from "react";
import { $selectedState, $store, $viewBoxState, $mousePos } from "../../index";

interface Props {
  pathIndex: number;
  lineIndex: number;
}
const Arc = (props: Props): JSX.Element | null => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const viewBox = useStore($viewBoxState);
  const mousePos = useStore($mousePos);
  const { pathIndex, lineIndex } = props;
  const { paths } = store;
  const { inputIndex } = selected;
  const current = paths[pathIndex].lines[lineIndex];
  const { endPos, radius, degree } = current.preview.param;
  const startPos =
    paths[pathIndex].lines[lineIndex - 1] !== undefined
      ? paths[pathIndex].lines[lineIndex - 1].param.endPos.abs
      : { x: 0, y: 0 };
  const dotSize = 0.5;
  const lineSize = 0.2;
  const tool = current.tool.toLowerCase();
  const r = ((viewBox.height / 100 + viewBox.width / 100) / 2) * dotSize;
  const strokeWidth =
    ((viewBox.height / 100 + viewBox.width / 100) / 2) * lineSize;

  const ArcCenterPoint = (): JSX.Element | null => {
    if (paths[pathIndex] !== undefined) {
      return React.createElement("circle", {
        id: `guide-${pathIndex}-${lineIndex}-ArcCenter`,
        key: `guide-${pathIndex}-${lineIndex}-ArcCenter`,
        className: "guideLine",
        cx: (endPos.abs.x - startPos.x) / 2 + startPos.x,
        cy: (endPos.abs.y - startPos.y) / 2 + startPos.y,
        r,
      });
    }
    return null;
  };

  const ArcGuide = (): JSX.Element | null => {
    if (paths[pathIndex] !== undefined) {
      const pointDistX = endPos.abs.x - startPos.x;
      const pointDistY = endPos.abs.y - startPos.y;
      /* const midX = pointDistX / 2 + startPos.x;
      const midY = pointDistY / 2 + startPos.y;
      const mouseDistX = mousePos.x - midX;
      const mouseDistY = mousePos.y - midY;
      const mouseDist = parseFloat(
        Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY).toFixed(2)
      );
      const pointDist = parseFloat(
        Math.sqrt(pointDistX * pointDistX + pointDistY * pointDistY).toFixed(2)
      );
      const mouseDir = parseFloat(
        ((Math.atan2(mouseDistY, mouseDistX) * 180) / Math.PI + 180).toFixed(0)
      ); */

      return (
        <g>
          {React.createElement("path", {
            id: `guide-${pathIndex}-${lineIndex}-ArcInnerA`,
            key: `guide-${pathIndex}-${lineIndex}-ArcInnerA`,
            className: "ArcGuide",
              d: `M ${startPos.x} ${startPos.y} A ${radius !== undefined ? radius.x : pointDistX} ${radius !== undefined ? radius.y : pointDistY} ${degree} 0 0 ${endPos.abs.x} ${endPos.abs.y}`, //eslint-disable-line
            fill: "transparent",
            stroke: "black",
            strokeWidth,
          })}
          {React.createElement("path", {
            id: `guide-${pathIndex}-${lineIndex}-ArcOuterA`,
            key: `guide-${pathIndex}-${lineIndex}-ArcOuterA`,
            className: "ArcGuide",
              d: `M ${startPos.x} ${startPos.y} A ${radius !== undefined ? radius.x : pointDistX} ${radius !== undefined ? radius.y : pointDistY} ${degree} 1 1 ${endPos.abs.x} ${endPos.abs.y}`, //eslint-disable-line
            fill: "transparent",
            stroke: "black",
            strokeWidth,
          })}
          {React.createElement("path", {
            id: `guide-${pathIndex}-${lineIndex}-ArcInnerB`,
            key: `guide-${pathIndex}-${lineIndex}-ArcInnerB`,
            className: "ArcGuide",
              d: `M ${endPos.abs.x} ${endPos.abs.y} A ${radius !== undefined ? radius.x : pointDistX} ${radius !== undefined ? radius.y : pointDistY} ${degree} 0 0 ${startPos.x} ${startPos.y}`, //eslint-disable-line
            fill: "transparent",
            stroke: "black",
            strokeWidth,
          })}
          {React.createElement("path", {
            id: `guide-${pathIndex}-${lineIndex}-ArcOuterB`,
            key: `guide-${pathIndex}-${lineIndex}-ArcOuterB`,
            className: "ArcGuide",
              d: `M ${endPos.abs.x} ${endPos.abs.y} A ${radius !== undefined ? radius.x : pointDistX} ${radius !== undefined ? radius.y : pointDistY} ${degree} 1 1 ${startPos.x} ${startPos.y}`, //eslint-disable-line
            fill: "transparent",
            stroke: "black",
            strokeWidth,
          })}
        </g>
      );
    }
    return null;
  };
  if (tool === "a" && inputIndex !== 0) {
    return (
      <g>
        <ArcCenterPoint />
        <ArcGuide />
      </g>
    );
  }
  return null;
};

export default Arc;

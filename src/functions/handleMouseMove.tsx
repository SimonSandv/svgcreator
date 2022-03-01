import React from "react";
import {
  range,
  Store,
  line,
  move,
  hline,
  vline,
  curve,
  scurve,
  quad,
  squad,
  arc,
  $selectedState,
  $viewBoxState,
  setMousePos,
} from "../index";
import handlePointDrag from "./handlePointDrag";

const handleMouseMove = (
  store: Store,
  event: React.MouseEvent<SVGSVGElement, globalThis.MouseEvent>
): void => {
  const { pathIndex, lineIndex, mode, drag } = $selectedState.getState();
  const viewBox = $viewBoxState.getState();
  const tool = store.paths[pathIndex].lines[lineIndex].tool.toLowerCase();
  const svgElement = document.getElementById("editor");
  if (svgElement !== null) {
    const bounds = svgElement.getBoundingClientRect();
    const interpolatedX = range(
      bounds.left,
      svgElement.clientWidth + bounds.left,
      0,
      viewBox.width,
      event.pageX
    );
    const interpolatedY = range(
      bounds.top,
      svgElement.clientHeight + bounds.top,
      0,
      viewBox.height,
      event.pageY
    );
    if (
      tool === "h" &&
      store.paths[pathIndex].lines[lineIndex - 1] !== undefined
    ) {
      setMousePos({
        x: Math.round(interpolatedX),
        y: store.paths[pathIndex].lines[lineIndex - 1].param.endPos.abs.y,
      });
    } else if (
      tool === "v" &&
      store.paths[pathIndex].lines[lineIndex - 1] !== undefined
    ) {
      setMousePos({
        x: store.paths[pathIndex].lines[lineIndex - 1].param.endPos.abs.x,
        y: Math.round(interpolatedY),
      });
    } else {
      setMousePos({
        x: Math.round(interpolatedX),
        y: Math.round(interpolatedY),
      });
    }
  }

  // resetLinePreview();
  if (drag === true) {
    handlePointDrag();
  }

  if (mode === "line") {
    if (tool === "m") {
      move(store, true);
    } else if (tool === "l") {
      line(store, true);
    } else if (tool === "h") {
      hline(store, true);
    } else if (tool === "v") {
      vline(store, true);
    } else if (tool === "c") {
      curve(store, true);
    } else if (tool === "s") {
      scurve(store, true);
    } else if (tool === "q") {
      quad(store, true);
    } else if (tool === "t") {
      squad(store, true);
    } else if (tool === "a") {
      arc(store, true);
    }
  }
};
export default handleMouseMove;

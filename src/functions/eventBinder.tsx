import { MouseEvent, KeyboardEvent } from "react";
import {
  Store,
  handleLeftClick,
  handleRightClick,
  // toggleActive,
  setSelectedState,
  $selectedState,
} from "../index";

interface props {
  store: Store;
  mouseEvent?: MouseEvent<SVGSVGElement, globalThis.MouseEvent>;
  keyboardEvent?: KeyboardEvent<SVGSVGElement>;
}

function eventBinder({ store, mouseEvent, keyboardEvent }: props): void {
  const selected = $selectedState.getState();
  if (arguments.length === 0) {
    throw new Error("eventBinder recieved no arguments");
  }
  if (mouseEvent !== undefined && store.paths[0] !== undefined) {
    // console.log(`${mouseEvent.type} ${mouseEvent.button}`);
    // console.log(mouseEvent);

    //-----------------------------------------------------------------

    // Left MouseDown
    if (
      mouseEvent.type === "mousedown" &&
      mouseEvent.button === 0 &&
      mouseEvent.shiftKey === false &&
      mouseEvent.ctrlKey === false &&
      mouseEvent.altKey === false
    ) {
      // console.log("Left MouseDown");
      handleLeftClick();
    }

    // Left MouseUp
    if (
      mouseEvent.type === "mouseup" &&
      mouseEvent.button === 0 &&
      mouseEvent.shiftKey === false &&
      mouseEvent.ctrlKey === false &&
      mouseEvent.altKey === false
    ) {
      // console.log("Left MouseUp");
      setSelectedState({ drag: false });
      if (
        selected.lineIndex ===
        store.paths[selected.pathIndex].lines.length - 1
      ) {
        setSelectedState({ mode: "line" });
      }
    }

    // Left MouseUp + Shift
    if (
      mouseEvent.type === "mouseup" &&
      mouseEvent.button === 0 &&
      mouseEvent.shiftKey === true &&
      mouseEvent.ctrlKey === false &&
      mouseEvent.altKey === false
    ) {
      // console.log("Left MouseUp + Shift");
    }

    // Left MouseUp + CTRL
    if (
      mouseEvent.type === "mouseup" &&
      mouseEvent.button === 0 &&
      mouseEvent.shiftKey === false &&
      mouseEvent.ctrlKey === true &&
      mouseEvent.altKey === false
    ) {
      // console.log("Left MouseUp + CTRL");
    }

    // Left MouseUp + ALT
    if (
      mouseEvent.type === "mouseup" &&
      mouseEvent.button === 0 &&
      mouseEvent.shiftKey === false &&
      mouseEvent.ctrlKey === false &&
      mouseEvent.altKey === true
    ) {
      // console.log("Left MouseUp + ALT");
    }

    //-----------------------------------------------------------------

    // Right MouseDown
    if (mouseEvent.type === "mousedown" && mouseEvent.button === 2) {
      // console.log("Right MouseDown");
      handleRightClick(store);
    }

    // Right MouseUp
    if (mouseEvent.type === "mouseup" && mouseEvent.button === 2) {
      // console.log("Right MouseUp");
    }

    //-----------------------------------------------------------------

    // Middle MouseDown
    if (mouseEvent.type === "mousedown" && mouseEvent.button === 1) {
      mouseEvent.preventDefault();
      // console.log("Middle MouseDown");
    }

    // Middle MouseUp
    if (mouseEvent.type === "mouseup" && mouseEvent.button === 1) {
      // console.log("Middle MouseUp");
    }
  }

  if (keyboardEvent !== undefined) {
    // console.log(keyboardEvent.key);

    // Space
    if (keyboardEvent.key === " ") {
      // console.log("Space");
    }

    // Enter
    if (keyboardEvent.key === "Enter") {
      // console.log("Enter");
    }

    // ArrowUp
    if (keyboardEvent.key === "ArrowUp") {
      // console.log("ArrowUp");
    }
    // ArrowDown
    if (keyboardEvent.key === "ArrowDown") {
      // console.log("ArrowDown");
    }
    // ArrowLeft
    if (keyboardEvent.key === "ArrowLeft") {
      // console.log("ArrowLeft");
    }
    // ArrowRight
    if (keyboardEvent.key === "ArrowRight") {
      // console.log("ArrowRight");
    }
  }
}
export default eventBinder;

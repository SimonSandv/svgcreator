import React from "react";
import { setCursorState } from "../index";

type Shape = "circle" | "rect";

const CursorSelector = (): JSX.Element => {
  // const store = useStore($store);
  return (
    <label htmlFor="CursorSelector">
      Cursor
      <select
        defaultValue="circle"
        id="CursorSelector"
        onChange={(event) => {
          return setCursorState({
            shape: event.target.value as Shape,
          });
        }}
      >
        <option value="circle">Circle</option>
        <option value="rect">Rect</option>
      </select>
    </label>
  );
};
export default CursorSelector;

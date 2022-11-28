import React from "react";
import { setCursorState } from "index";
import type { Shape } from "types";

export const CursorSelector = React.memo((): JSX.Element => {
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
});
export default CursorSelector;

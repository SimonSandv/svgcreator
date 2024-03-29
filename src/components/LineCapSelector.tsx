import React from "react";
import type { LineCap } from "index";
import { updatePathProps } from "index";

interface props {
  pathIndex: number;
}
export const LineCapSelector = React.memo(
  ({ pathIndex }: props): JSX.Element => {
    return (
      <div>
        <label htmlFor={`linecapSelector ${pathIndex}`}>
          Line Cap
          <select
            id={`linecapSelector ${pathIndex}`}
            defaultValue="round"
            onChange={(event) => {
              return updatePathProps({
                pathIndex,
                strokeLinecap: event.target.value as LineCap,
              });
            }}
          >
            <option value="round">Round</option>
            <option value="butt">Butt</option>
            <option value="square">Square</option>
          </select>
        </label>
      </div>
    );
  }
);
export default LineCapSelector;

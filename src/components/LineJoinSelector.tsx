import React from "react";
import type { LineJoin } from "index";
import { updatePathProps } from "index";

export const LineJoinSelector = ({
  pathIndex,
}: {
  pathIndex: number;
}): JSX.Element => {
  return (
    <div>
      <label htmlFor={`linejoinSelector ${pathIndex}`}>
        Line Join
        <select
          id={`linejoinSelector ${pathIndex}`}
          defaultValue="round"
          onChange={(event) => {
            return updatePathProps({
              pathIndex,
              strokeLinejoin: event.target.value as LineJoin,
            });
          }}
        >
          <option value="round">Round</option>
          <option value="miter">Miter</option>
          <option value="bevel">Bevel</option>
        </select>
      </label>
    </div>
  );
};
export default React.memo(LineJoinSelector);

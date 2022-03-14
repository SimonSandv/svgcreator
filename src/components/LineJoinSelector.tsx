import React from "react";
import { updatePathProps, LineJoin } from "../index";

interface props {
  pathIndex: number;
}
const LineJoinSelector = ({ pathIndex }: props): JSX.Element => {
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
              strokeLinejoin: event.target.value as string as LineJoin,
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

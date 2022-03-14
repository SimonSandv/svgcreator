import React from "react";
import { useStore } from "effector-react";
import {
  // UTILS
  numOnly,
  handleInput,
  $store,
} from "../index";

interface props {
  pathIndex: number;
  lineIndex: number;
}
const LineInputs = ({ pathIndex, lineIndex }: props): JSX.Element => {
  const store = useStore($store);
  return (
    <div>
      {store.paths[pathIndex].lines[lineIndex].inputArray.map(
        (input, inputIndex) => {
          return (
            <input
              value={
                store.paths[pathIndex].lines[lineIndex].rel === true
                  ? input.relative
                  : input.absolute
              }
              key={`select
              ${pathIndex.toString()}
              ${lineIndex.toString()}
              ${inputIndex.toString()}`}
              onKeyPress={(e) => {
                return numOnly(e);
              }}
              onChange={(e) => {
                return handleInput(e, pathIndex, lineIndex, inputIndex);
              }}
            />
          );
        }
      )}
    </div>
  );
};

export default React.memo(LineInputs);

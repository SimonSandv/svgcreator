import React from "react";
import { useStore } from "effector-react";
import {
  // UTILS
  numOnly,
  handleInput,
  $store,
} from "index";

export const LineInputs = React.memo(
  ({
    pathIndex,
    lineIndex,
  }: {
    pathIndex: number;
    lineIndex: number;
  }): JSX.Element => {
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
  }
);

export default LineInputs;

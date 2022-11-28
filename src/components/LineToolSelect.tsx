import React from "react";
import type { Line } from "index";
import { handleSelect, toolArray } from "index";

export const LineToolSelect = React.memo(
  ({
    line,
    pathIndex,
    lineIndex,
  }: {
    line: Line;
    pathIndex: number;
    lineIndex: number;
  }): JSX.Element => {
    const getOptions = (): JSX.Element[] => {
      const elements = [];
      for (let i = 0; i < toolArray.length; i += 1) {
        if (i === 1 && lineIndex !== 0) {
          elements.push(
            <option
              key={`option${pathIndex}${lineIndex}${i}`}
              value={toolArray[0].short}
            >
              {toolArray[0].text}
            </option>
          );
        } else {
          elements.push(
            <option
              key={`option${pathIndex}${lineIndex}${i}`}
              value={toolArray[i].short}
            >
              {toolArray[i].text}
            </option>
          );
        }
      }
      return elements;
    };
    return (
      <select
        value={line.tool}
        key={`select
                ${pathIndex.toString()}
                ${lineIndex.toString()}`}
        onChange={(event) => {
          return handleSelect(event, pathIndex, lineIndex);
        }}
      >
        {getOptions()}
      </select>
    );
  }
);

export default LineToolSelect;

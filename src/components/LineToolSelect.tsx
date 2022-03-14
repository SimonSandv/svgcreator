import React from "react";
import { Line, handleSelect } from "../index";
import { toolArray } from "../store/toolArray";

interface props {
  line: Line;
  pathIndex: number;
  lineIndex: number;
}
const LineToolSelect = ({ line, pathIndex, lineIndex }: props): JSX.Element => {
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
};

export default React.memo(LineToolSelect);

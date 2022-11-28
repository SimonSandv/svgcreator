import { useStore } from "effector-react";
import React from "react";
import {
  addLine,
  // updatePathData,
  // updatePosition,
  loadPathData,
  updateRel,
  LineToolSelect,
  $store,
  LineInputs,
  $toolState,
} from "index";

interface props {
  pathIndex: number;
}
export const LineElements = React.memo(({ pathIndex }: props): JSX.Element => {
  const store = useStore($store);
  const { tool } = useStore($toolState);
  const elementArray = store.paths[pathIndex].lines.map((line, lineIndex) => {
    return (
      <div key={`list${pathIndex.toString()}${lineIndex.toString()}`}>
        {/*         <pre>
                  pathIndex: {pathIndex},
                  <br />
                  lineIndex: {lineIndex}
                </pre> */}
        <input
          key={`checkButton${pathIndex}${lineIndex.toString()}`}
          id={`checkButton${pathIndex}${lineIndex.toString()}`}
          type="checkbox"
          onChange={(event) => {
            updateRel({
              pathIndex: pathIndex,
              lineIndex: lineIndex,
              event: event.target.checked,
            });
            loadPathData({ pathIndex });
          }}
        />
        <LineToolSelect
          line={line}
          pathIndex={pathIndex}
          lineIndex={lineIndex}
        />
        <LineInputs pathIndex={pathIndex} lineIndex={lineIndex} />
        <button
          key={`button
                ${pathIndex.toString()}
                ${lineIndex.toString()}`}
          onClick={() => {
            return addLine({
              pathIndex: pathIndex,
              tool: tool.short,
              endPos:
                store.paths[pathIndex].lines[
                  store.paths[pathIndex].lines.length
                ].param.endPos,
              startControl:
                store.paths[pathIndex].lines[
                  store.paths[pathIndex].lines.length
                ].param.endPos,
              endControl:
                store.paths[pathIndex].lines[
                  store.paths[pathIndex].lines.length
                ].param.endPos,
            });
          }}
          type="button"
        >
          Add Line
        </button>
      </div>
    );
  });
  return <div>{elementArray}</div>;
});

export default LineElements;

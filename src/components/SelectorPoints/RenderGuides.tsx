import React, { useState } from "react";
import { useStore } from "effector-react";
import { $store, EndPos, StartControl, EndControl, Arc } from "../../index";

const RenderGuides = (): JSX.Element | null => {
  const store = useStore($store);
  return (
    <g>
      {store.paths.map((path, pathMapIndex) => {
        return path.lines.map((line, lineMapIndex) => {
          return (
            <g key={`point-${pathMapIndex}-${lineMapIndex}-container`!}>
              <EndPos
                pathIndex={pathMapIndex}
                lineIndex={lineMapIndex}
                key={`point-${pathMapIndex}-${lineMapIndex}-endPos`!}
              />
              <StartControl
                pathIndex={pathMapIndex}
                lineIndex={lineMapIndex}
                key={`point-${pathMapIndex}-${lineMapIndex}-StartControl`!}
              />
              <EndControl
                pathIndex={pathMapIndex}
                lineIndex={lineMapIndex}
                key={`point-${pathMapIndex}-${lineMapIndex}-EndControl`!}
              />
              <Arc
                pathIndex={pathMapIndex}
                lineIndex={lineMapIndex}
                key={`point-${pathMapIndex}-${lineMapIndex}-Arc`!}
              />
            </g>
          );
        });
      })}
    </g>
  );
};

export default RenderGuides;

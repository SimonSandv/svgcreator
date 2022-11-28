import React from "react";
import { useStore } from "effector-react";
import { $store, $toolState } from "index";

export const ParamGrid = React.memo((): JSX.Element => {
  const store = useStore($store);
  const { tool } = useStore($toolState);
  return (
    <div className="paramGrid-container">
      {store.paths.map((path, pathMapIndex) => {
        return (
          <div
            className="paramGrid-pathContainer"
            key={`paramGrid-${pathMapIndex}`!}
          >
            <div
              className="paramGrid-endPos"
              key={`paramGrid-${pathMapIndex}-endPos`!}
            >
              <h1 key={`paramGrid-${pathMapIndex}-endPos-label`!}>EndPos</h1>
              {path.lines
                .slice(0)
                .reverse()
                .map((line, lineMapIndex) => {
                  /* const target =
                  store.paths[pathMapIndex].lines[
                    store.paths[pathMapIndex].lines.length - 1 - lineMapIndex
                  ].param; */
                  return (
                    <div
                      className="paramGrid-lineContainer"
                      key={`paramGrid-${pathMapIndex}-${lineMapIndex}-endPos`!}
                    >
                      <div
                        className="paramGrid-x"
                        key={
                          `paramGrid-${pathMapIndex}-${lineMapIndex}-endPos-x`!
                        }
                      >
                        {tool.rel === true
                          ? line.param.endPos.rel.x
                          : line.param.endPos.abs.x}
                      </div>
                      <div
                        className="paramGrid-y"
                        key={
                          `paramGrid-${pathMapIndex}-${lineMapIndex}-endPos-y`!
                        }
                      >
                        {tool.rel === true
                          ? line.param.endPos.rel.y
                          : line.param.endPos.abs.y}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              className="paramGrid-startControl"
              key={`paramGrid-${pathMapIndex}-startControl`!}
            >
              <h1
                key={
                  `paramGrid-
              ${pathMapIndex}-
              startControl-
              label`!
                }
              >
                StartControl
              </h1>
              {path.lines
                .slice(0)
                .reverse()
                .map((line, lineMapIndex) => {
                  return (
                    <div
                      className="paramGrid-lineContainer"
                      key={
                        `paramGrid-
                        ${pathMapIndex}-
                        ${lineMapIndex}-
                        startControl`!
                      }
                    >
                      <div
                        className="paramGrid-x"
                        key={
                          `paramGrid-
                        ${pathMapIndex}-
                        ${lineMapIndex}-
                        startControl-x`!
                        }
                      >
                        {line.param.startControl !== undefined
                          ? tool.rel === true
                            ? line.param.startControl.rel.x
                            : line.param.startControl.abs.x
                          : "N/A"}
                      </div>
                      <div
                        className="paramGrid-y"
                        key={
                          `paramGrid-
                        ${pathMapIndex}-
                        ${lineMapIndex}-
                        startControl-y`!
                        }
                      >
                        {line.param.startControl !== undefined
                          ? tool.rel === true
                            ? line.param.startControl.rel.y
                            : line.param.startControl.abs.y
                          : "N/A"}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              className="paramGrid-endControl"
              key={`paramGrid-${pathMapIndex}-endControl`!}
            >
              <h1 key={`paramGrid-${pathMapIndex}-endControl-label`!}>
                EndControl
              </h1>
              {path.lines
                .slice(0)
                .reverse()
                .map((line, lineMapIndex) => {
                  return (
                    <div
                      className="paramGrid-lineContainer"
                      key={
                        `paramGrid-
                      ${pathMapIndex}-
                      endControl-
                      ${lineMapIndex}-
                      container`!
                      }
                    >
                      <div
                        className="paramGrid-x"
                        key={
                          `paramGrid-
                        ${pathMapIndex}-
                        endControl-
                        ${lineMapIndex}
                        -x`!
                        }
                      >
                        {line.param.endControl !== undefined
                          ? tool.rel === true
                            ? line.param.endControl.rel.x
                            : line.param.endControl.abs.x
                          : "N/A"}
                      </div>
                      <div
                        className="paramGrid-y"
                        key={
                          `paramGrid-
                        ${pathMapIndex}-
                        endControl-
                        ${lineMapIndex}
                        -y`!
                        }
                      >
                        {line.param.endControl !== undefined
                          ? tool.rel === true
                            ? line.param.endControl.rel.y
                            : line.param.endControl.abs.y
                          : "N/A"}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default ParamGrid;

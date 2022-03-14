import React, { useState } from "react";
import { useStore } from "effector-react";
import { $selectedState, $store } from "../index";

const Info = (): JSX.Element => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const { pathIndex, lineIndex } = selected;
  const [line, setLine] = useState(0);
  const [btn, btnSet] = useState<JSX.Element[]>([]);
  const [value, valueSet] = useState<any>();
  const [toggle, toggleSet] = useState<string>("value");
  $store.watch(() => {
    if (store.paths[pathIndex] !== undefined) {
      // paramSet(store.paths[pathIndex].lines[lineIndex].param);
      // previewSet(store.paths[pathIndex].lines[lineIndex].preview.param);
    }
  });

  const getBtn = (obj: any): JSX.Element[] => {
    const buttonArray: JSX.Element[] = [];
    Object.entries(obj).forEach((v) => {
      buttonArray.push(
        <button
          key={v[0]}
          type="button"
          onClick={() => {
            valueSet(v[1]);
            btnSet(getBtn(v[1]));
          }}
        >
          {v[0]}
        </button>
      );
    });
    return buttonArray;
  };
  return (
    <div className="infoContainer">
      <pre>
        Selected:
        {JSON.stringify(
          store.paths[pathIndex] !== undefined ? selected : "undefined",
          null,
          2
        )}
      </pre>
      <pre>
        Active:
        {JSON.stringify(store.active, null, 2)}
      </pre>
      <pre>
        mousePos:
        {JSON.stringify(store.mousePos, null, 2)}
      </pre>
      <pre>
        largeArcFlag:
        {JSON.stringify(
          store.paths[pathIndex] !== undefined
            ? store.paths[pathIndex].lines[lineIndex].preview.param.largeArcFlag
            : "undefined",
          null,
          2
        )}
      </pre>
      <pre>
        sweepFlag:
        {JSON.stringify(
          store.paths[pathIndex] !== undefined
            ? store.paths[pathIndex].lines[lineIndex].preview.param.sweepFlag
            : "undefined",
          null,
          2
        )}
      </pre>
      <pre>
        endPos:
        {JSON.stringify(
          store.paths[pathIndex] !== undefined
            ? store.paths[pathIndex].lines[lineIndex].preview.param.endPos
            : "undefined",
          null,
          2
        )}
      </pre>
      <pre>
        startControl:
        {JSON.stringify(
          store.paths[pathIndex] !== undefined
            ? store.paths[pathIndex].lines[lineIndex].preview.param.startControl
            : "undefined",
          null,
          2
        )}
      </pre>
      <pre>
        endControl:
        {JSON.stringify(
          store.paths[pathIndex] !== undefined
            ? store.paths[pathIndex].lines[lineIndex].param.endControl
            : "",
          null,
          2
        )}
      </pre>
      {/* <pre>{JSON.stringify(store.debugPoint.pos.abs, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(store.debugPoint.pos.abs, null, 2)}</pre> */}
      <pre>
        {JSON.stringify(
          store.paths[pathIndex] !== undefined
            ? store.paths[pathIndex].lines[lineIndex].tool
            : "",
          null,
          2
        )}
      </pre>
      <pre>{JSON.stringify(selected, null, 2)}</pre>
      <pre>
        {JSON.stringify(
          store.paths[pathIndex] !== undefined
            ? store.paths[pathIndex].previewData
            : "",
          null,
          2
        )}
      </pre>
      <pre>
        {JSON.stringify(
          store.paths[pathIndex] !== undefined
            ? store.paths[pathIndex].data
            : "",
          null,
          2
        )}
      </pre>
      <input
        type="number"
        defaultValue={
          store.paths[pathIndex] !== undefined
            ? store.paths[pathIndex].lines.length
            : line
        }
        onChange={(e) => {
          setLine(parseInt(e.target.value, 10));
        }}
      />
      <button
        type="button"
        onClick={() => {
          toggleSet("param");
        }}
      >
        param
      </button>
      <button
        type="button"
        onClick={() => {
          toggleSet("preview");
        }}
      >
        preview
      </button>
      <button
        type="button"
        onClick={() => {
          valueSet(store);
          btnSet(getBtn(store));
        }}
      >
        Store
      </button>
      <p> </p>
      {btn}
      <div className="infoText">
        <pre>
          {JSON.stringify(
            toggle === "value"
              ? value
              : toggle === "param" && store.paths[pathIndex] !== undefined
              ? store.paths[pathIndex].lines[line]
              : toggle === "preview" && store.paths[pathIndex] !== undefined
              ? store.paths[pathIndex].lines[line].preview
              : "",
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};
export default React.memo(Info);

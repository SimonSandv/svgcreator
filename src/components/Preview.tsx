import React from "react";
import { useStore } from "effector-react";
import { $store, $selectedState, $cursorState } from "../index";

const Preview = (): JSX.Element => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const { hover } = useStore($cursorState);
  const { pathIndex } = selected;
  if (store.paths[pathIndex] !== undefined) {
    const { strokeLinecap, strokeWidth, strokeLinejoin } =
      store.paths[pathIndex].attr;
    if (hover === true) {
      return (
        <path
          d={store.paths[selected.pathIndex].previewData}
          className="previewPath"
          fill="transparent"
          stroke="black"
          opacity="10%"
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
        />
      );
    }
  }
  return <g />;
};
export default React.memo(Preview);

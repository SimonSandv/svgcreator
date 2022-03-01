import React from "react";
import { useStore } from "effector-react";
import { $selectedState, $store, $toolState, InfoBlock } from "../index";

const ToolInfo = (): JSX.Element => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const { tool } = useStore($toolState);
  const { pathIndex, lineIndex } = selected;
  return (
    <InfoBlock
      label="Tool"
      className="mousePosition"
      items={[
        {
          label: "selected",
          value:
            store.paths[0] !== undefined
              ? store.paths[pathIndex].lines[lineIndex].tool
              : 0,
          className: "toolSel",
        },
        {
          label: "global",
          value: tool.short,
          className: "toolShort",
        },
      ]}
    />
  );
};
export default ToolInfo;

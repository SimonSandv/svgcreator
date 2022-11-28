import { useStore } from "effector-react";
import React from "react";
import { $selectedState, $store, updateLineTool, updateTool } from "index";

export const ToolButtons = React.memo((): JSX.Element => {
  const store = useStore($store);
  const selected = useStore($selectedState);

  const createToolButtons = (): JSX.Element[] => {
    return store.toolArray.map((tool, i) => {
      return (
        <button
          key={store.toolArray[i].short}
          type="button"
          onClick={() => {
            updateLineTool({
              pathIndex: selected.pathIndex,
              lineIndex: selected.lineIndex,
              tool: tool.short,
            });
            updateTool({ tool: tool.short });
          }}
        >
          {tool.text}
        </button>
      );
    });
  };
  return <div>{createToolButtons()}</div>;
});

export default ToolButtons;

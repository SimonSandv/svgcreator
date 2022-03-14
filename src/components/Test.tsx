import React from "react";
import { useStore } from "effector-react";
import { $selectedState, $store, updateTool } from "../index";

const Test = (): JSX.Element => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const { pathIndex, lineIndex } = selected;
  const [test, testSet] = React.useState<any>("something");
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          testSet(JSON.stringify(store.tool, null, 2));
        }}
      >
        Test
      </button>
      <pre>{test}</pre>
    </div>
  );
};
export default React.memo(Test);

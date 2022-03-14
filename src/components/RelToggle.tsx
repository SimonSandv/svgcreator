import React from "react";
import { updateRel, loadPathData, updateLineData } from "../index";

const RelToggle = (): JSX.Element => {
  return (
    <div>
      <label>
        RelToggle
        <input
          type="checkbox"
          onChange={(e) => {
            updateRel({ event: e.target.checked });
            updateLineData({});
            updateLineData({ preview: true });
            loadPathData({ preview: false });
            loadPathData({ preview: true });
          }}
        />
      </label>
    </div>
  );
};

export default React.memo(RelToggle);

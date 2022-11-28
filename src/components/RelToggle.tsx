import React from "react";
import { updateRel, loadPathData, updateLineData } from "index";

export const RelToggle = React.memo((): JSX.Element => {
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
});

export default RelToggle;

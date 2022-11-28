import React from "react";
import { useStore } from "effector-react";
import { InfoBlock, $svgMousePos } from "index";

export const MousePosition = React.memo((): JSX.Element => {
  const { x, y } = useStore($svgMousePos);
  return (
    <InfoBlock
      label="Position"
      className="mousePosition"
      items={[
        { label: "x", value: x, className: "mouseX" },
        { label: "y", value: y, className: "mouseY" },
      ]}
    />
  );
});
export default MousePosition;

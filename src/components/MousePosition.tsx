import React from "react";
import { useStore } from "effector-react";
import { InfoBlock, $svgMousePos } from "../index";

const MousePosition = (): JSX.Element => {
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
};
export default React.memo(MousePosition);

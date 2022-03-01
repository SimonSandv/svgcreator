import React from "react";
import { useStore } from "effector-react";
import { InfoBlock } from "../index";
import { $mousePos } from "../store/mousePos";

const MousePosition = (): JSX.Element => {
  const { x, y } = useStore($mousePos);
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
export default MousePosition;

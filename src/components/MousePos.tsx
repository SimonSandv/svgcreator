import React, { useEffect } from "react";
import { useMousePosition } from "../hooks/useMousePosition";
import { setMousePos } from "../store/mousePos";

const MousePos = (): JSX.Element => {
  const pos = useMousePosition({ mode: "client" });
  useEffect(() => {
    setMousePos(pos);
  });
  return <></>;
};

export default React.memo(MousePos);

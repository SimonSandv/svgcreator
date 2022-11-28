import React, { useEffect } from "react";
import { setMousePos, useMousePosition } from "index";

export const MousePos = React.memo((): JSX.Element => {
  const pos = useMousePosition({ mode: "client" });
  useEffect(() => {
    setMousePos(pos);
  });
  return <></>;
});

export default MousePos;

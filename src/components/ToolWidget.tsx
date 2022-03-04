import React from "react";
import { useStore } from "effector-react";
import {
  updateTool,
  WidgetButton,
  WidgetMenu,
  updateLineTool,
  $selectedState,
  $widgetState,
} from "../index";
import { ReactComponent as IconMove } from "../svg/move.svg";
import { ReactComponent as IconLine } from "../svg/line.svg";
import { ReactComponent as IconHLine } from "../svg/hLine.svg";
import { ReactComponent as IconVLine } from "../svg/vLine.svg";
import { ReactComponent as IconCurve } from "../svg/curve.svg";
import { ReactComponent as IconSCurve } from "../svg/sCurve.svg";
import { ReactComponent as IconArc } from "../svg/arc.svg";
import { ReactComponent as IconQuad } from "../svg/quad.svg";
import { ReactComponent as IconSQuad } from "../svg/sQuad.svg";
import { ReactComponent as IconClose } from "../svg/close.svg";

/* import IconMove from "../svg/move.svg?component";
import IconLine from "../svg/line.svg?component";
import IconHLine from "../svg/hLine.svg?component";
import IconVLine from "../svg/vLine.svg?component";
import IconCurve from "../svg/curve.svg?component";
import IconSCurve from "../svg/sCurve.svg?component";
import IconArc from "../svg/arc.svg?component";
import IconQuad from "../svg/quad.svg?component";
import IconSQuad from "../svg/sQuad.svg?component";
import IconClose from "../svg/close.svg?component";
 */
import { useMousePosition } from "../hooks/UseMousePosition";

const Widget = (): JSX.Element | null => {
  const selected = useStore($selectedState);
  const { show } = useStore($widgetState);
  const { pathIndex, lineIndex } = selected;
  const toolSet = (tool: string): void => {
    updateTool({ tool });
    updateLineTool({
      pathIndex,
      lineIndex,
      tool,
    });
  };
  const buttonProps: WidgetButton[] = [
    {
      title: "Move",
      action: (tool = "m"): void => {
        toolSet(tool);
      },
      description: "Move current position",
      icon: IconMove,
    },
    {
      title: "Line",
      action: (tool = "l"): void => {
        toolSet(tool);
      },
      description: "Create a line",
      icon: IconLine,
    },
    {
      title: "Horizontal Line",
      action: (tool = "h"): void => {
        toolSet(tool);
      },
      description: "Create a horizontal line",
      icon: IconHLine,
    },
    {
      title: "Vertical Line",
      action: (tool = "v"): void => {
        toolSet(tool);
      },
      description: "Create a vertical line",
      icon: IconVLine,
    },
    {
      title: "Curve",
      action: (tool = "c"): void => {
        toolSet(tool);
      },
      description: "Create a curve with two controlpoints",
      icon: IconCurve,
    },
    {
      title: "Smooth Curve",
      action: (tool = "s"): void => {
        toolSet(tool);
      },
      description: "Create a smooth curve",
      icon: IconSCurve,
    },
    {
      title: "Quadratic Curve",
      action: (tool = "q"): void => {
        toolSet(tool);
      },
      description: "create a quadratic qurve",
      icon: IconQuad,
    },
    {
      title: "Smooth Quadratic Curve",
      action: (tool = "t"): void => {
        toolSet(tool);
      },
      description: "Create a smooth quadratic curve",
      icon: IconSQuad,
    },
    {
      title: "Elliptical Arc",
      action: (tool = "a"): void => {
        toolSet(tool);
      },
      description: "Create an elliptical arc",
      icon: IconArc,
    },
    {
      title: "Close Path",
      action: (tool = "z"): void => {
        toolSet(tool);
      },
      description: "Close current path",
      icon: IconClose,
    },
  ];
  // const parent = document.getElementById("svgContainer");
  const mousePos = useMousePosition({ mode: "page" });

  return show === "tool" ? (
    <WidgetMenu
      buttonProps={buttonProps}
      mousePos={{ x: mousePos.x, y: mousePos.y }}
      size={{ width: 200, height: 200 }}
      iconSize={{ width: 100, height: 100 }}
      radius={{ inner: 30, outer: 70 }}
      iconScale={0.2}
      iconRadius={50}
      iconOffset={{ x: 0, y: 0 }}
      rotation={0}
      iconDebug={{ border: false, origin: false }}
    />
  ) : null;
};

export default Widget;

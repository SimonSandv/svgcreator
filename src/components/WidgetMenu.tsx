import React, { useEffect, useState } from "react";
import { getPointsOnCircumference } from "../util/mathUtils";
import { ReactComponent as IconClose } from "../svg/close.svg";
import { setSelectedState, setWidgetState } from "../index";

type Button = {
  corners: { x: number; y: number }[];
  data: string;
};

export type ButtonProps = {
  title: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  description: string;
  action: () => void;
};

const WidgetMenu = ({
  buttonProps,
  mousePos,
  size = { width: 100, height: 100 },
  center = { x: 0, y: 0 },
  radius = { inner: 15, outer: 35 },
  caving = { inner: 3, outer: 1 },
  totalDegree = 360,
  widthMultiplier = { inner: 0.8, outer: 0.9 },
  rotation = 0,
  skew = {
    inner1: 0,
    inner2: 0,
    outer1: 0,
    outer2: 0,
  },
  iconRadius = 25,
  iconScale = 0.1,
  iconRotation = 0,
  iconOffset = { x: 0, y: 0 },
  iconSize = { width: 100, height: 100 },
  iconDebug = { border: false, origin: false },
  displayPoints = false,
  displayLines = false,
}: {
  buttonProps: ButtonProps[];
  mousePos: { x: number; y: number };
  displayPoints?: boolean;
  displayLines?: boolean;
  size?: { width: number; height: number };
  center?: { x: number; y: number };
  radius?: { inner: number; outer: number };
  caving?: { inner: number; outer: number };
  totalDegree?: number;
  widthMultiplier?: { inner: number; outer: number };
  rotation?: number;
  skew?: { inner1: number; inner2: number; outer1: number; outer2: number };
  iconRadius?: number;
  iconScale?: number;
  iconRotation?: number;
  iconOffset?: { x: number; y: number };
  iconSize?: { width: number; height: number };
  iconDebug?: { border: boolean; origin: boolean };
}): JSX.Element | null => {
  const [hover] = useState<boolean[]>([]);
  const [pos, posSet] = useState({ x: 0, y: 0 });

  useEffect(() => {
    posSet(mousePos);
  }, []);

  const numBtn = buttonProps.length;
  const innerWidth = (totalDegree / numBtn) * widthMultiplier.inner;
  const outerWidth = (totalDegree / numBtn) * widthMultiplier.outer;

  for (let i = 0; i < numBtn; i += 1) {
    hover.push(false);
  }

  /*   const parent = document.getElementById(parentID);
  if (parent !== null) {
    parent.onmousemove = (e) => {
      if (parent !== null && render !== false) {
        const mouseOffsetX =
          parentOnMouseMoveEvent.pageX - window.pageXOffset - size.width / 2;
        const mouseOffsetY =
          parentOnMouseMoveEvent.pageY - window.pageYOffset - size.height / 2;
        posSet({ x: mouseOffsetX, y: mouseOffsetY });
      }
    };
  } */

  const btnArr: Button[] = [];

  const inner1 = getPointsOnCircumference(
    numBtn,
    totalDegree,
    radius.inner,
    { x: center.x, y: center.y },
    rotation - innerWidth / 2,
    skew.inner1
  );
  const inner2 = getPointsOnCircumference(
    numBtn,
    totalDegree,
    radius.inner,
    { x: center.x, y: center.y },
    rotation + innerWidth / 2,
    skew.inner2
  );
  const outer1 = getPointsOnCircumference(
    numBtn,
    totalDegree,
    radius.outer,
    { x: center.x, y: center.y },
    rotation - outerWidth / 2,
    skew.outer1
  );
  const outer2 = getPointsOnCircumference(
    numBtn,
    totalDegree,
    radius.outer,
    { x: center.x, y: center.y },
    rotation + outerWidth / 2,
    skew.outer2
  );
  const iconPos = getPointsOnCircumference(
    numBtn,
    totalDegree,
    iconRadius,
    {
      x: iconOffset.x - (iconSize.width * iconScale) / 2,
      y: iconOffset.y - (iconSize.height * iconScale) / 2,
    },
    iconRotation
  );

  const iconArray = buttonProps.map((btn) => {
    return btn.icon({ className: `widgetIcon${btn.title}` });
  }) as React.ReactElement<SVGSVGElement>[];

  // console.log(iconArray[iconArray.length - 1].props.children);

  for (let b = 0; b < numBtn; b += 1) {
    btnArr.push({
      corners: [inner1[b], inner2[b], outer1[b], outer2[b]],
      data: `
    M ${inner1[b].x} ${inner1[b].y} 
    L ${outer1[b].x} ${outer1[b].y} 
    A ${radius.outer * caving.outer} ${radius.outer * caving.outer} 0 0 1 ${
        outer2[b].x
      } ${outer2[b].y} 
    L ${inner2[b].x} ${inner2[b].y}
    A ${radius.inner * caving.inner} ${radius.inner * caving.inner} 0 0 0 ${
        inner1[b].x
      } ${inner1[b].y} 
    Z`,
    });
  }

  const elementArray: JSX.Element[] = [];

  if (displayLines === true) {
    elementArray.push(
      React.createElement("circle", {
        cy: center.y,
        cx: center.x,
        r: radius.inner,
        fill: "transparent",
        stroke: "gray",
        strokeWidth: 1,
        key: `innerCircle`,
      })
    );
    elementArray.push(
      React.createElement("circle", {
        cy: center.y,
        cx: center.x,
        r: radius.outer,
        fill: "transparent",
        stroke: "gray",
        strokeWidth: 1,
        key: `outerCircle`,
      })
    );
    elementArray.push(
      React.createElement("line", {
        x1: center.x,
        y1: center.y + radius.outer,
        x2: center.x,
        y2: center.y - radius.outer,
        stroke: "gray",
        strokeWidth: 1,
        key: `vLine`,
      })
    );
    elementArray.push(
      React.createElement("line", {
        x1: center.x + radius.outer,
        y1: center.y,
        x2: center.x - radius.outer,
        y2: center.y,
        stroke: "gray",
        strokeWidth: 1,
        key: `hLine`,
      })
    );
  }
  for (let b = 0; b < numBtn; b += 1) {
    if (displayPoints === true) {
      const colors = ["red", "blue", "green", "purple"];
      for (let i = 0; i < 4; i += 1) {
        elementArray.push(
          React.createElement("circle", {
            cx: btnArr[b].corners[i].x,
            cy: btnArr[b].corners[i].y,
            r: 2,
            fill: colors[i],
            key: ` btn${b} ${
              (i < 2 ? `inner` : `outer`) + (i % 2 ? `1` : `2`)
            }`,
          })
        );
      }
    }
    elementArray.push(
      React.createElement("path", {
        d: btnArr[b].data,
        fill: hover[b] ? "lightBlue" : "lightGray",
        key: ` btn${b}`,
        // stroke: "black",
        // strokeWidth: 1,
        pointerEvents: "auto",
        onMouseDown: () => {
          buttonProps[b].action();
          setSelectedState({ mode: "line" });
          setWidgetState({ show: "none" });
        },
        onMouseEnter: () => {
          hover[b] = true;
        },
        onMouseOut: () => {
          hover[b] = false;
        },
        onContextMenu: (e) => {
          e.preventDefault();
        },
      })
    );
    elementArray.push(
      <g
        className="widgetIcons"
        key={`widgetIcon${b}`}
        transform={`
        translate(${iconPos[b].x} ${iconPos[b].y}) 
        scale(${iconScale})
        `}
      >
        {iconDebug.border ? (
          <rect
            width={iconSize.width}
            height={iconSize.height}
            fill="transparent"
            stroke="black"
            strokeWidth="1px"
          />
        ) : null}
        {iconDebug.origin ? <rect width={1} height={1} fill="red" /> : null}
        {iconArray[b].props.children}
      </g>
    );
  }

  const group = React.createElement(
    "g",
    {
      id: "btnGroup",
      key: "btnGroup",
      x: 0,
      y: 0,
    },
    elementArray
  );
  const widgetSVG = React.createElement(
    "svg",
    {
      id: `widgetMenu`,
      key: `widgetMenu`,
      className: "widgetMenu",
      viewBox: `-${size.width / 2} -${size.height / 2} ${size.width} ${
        size.height
      }`,
      pointerEvents: "none",
      style: {
        width: size.width,
        height: size.height,
        left: pos.x - size.width / 2,
        top: pos.y - size.height / 2,
        margin: 0,
        display: "relative",
        position: "absolute",
        backgroundColor: "transparent",
      },
    },
    group
  );
  return pos.x !== 0 && pos.y !== 0 ? widgetSVG : null;
};

/* WidgetMenu.defaultProps = {
  size: { width: 100, height: 100 },
  center: { x: 0, y: 0 },
  radius: { inner: 15, outer: 35 },
  caving: { inner: 3, outer: 1 },
  totalDegree: 360,
  btnWidthMultiplier: 0.9,
  rotation: 90,
  skew: {
    inner1: 0,
    inner2: 0,
    outer1: 0,
    outer2: 0,
  },
  icon: {
    radius: 25,
    scale: 0.1,
    rotation: 90,
    xOffset: 0,
    yOffset: 0,
    width: 100,
    height: 100,
    showBorder: false,
    showOrigin: false,
  },
}; */

export default React.memo(WidgetMenu);

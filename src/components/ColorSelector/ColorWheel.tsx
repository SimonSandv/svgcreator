import React, { useState, useEffect } from "react";
import { useStore } from "effector-react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  $colorState,
  setColor,
  setSelectedColor,
  $wheelState,
  setWheelState,
} from "../../index";
import { resolveToPoint, range } from "../../util/mathUtils";
import Clip from "./Clip";
import Clip75 from "./Clip75";

const Wrapper = styled.div`
  height: 200px;
  //flex-grow: 0;
`;
const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  // flex-grow: 0;
  // flex-shrink: 0;
  // flex-basis: 0;
  height: 200px;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  padding: 1em;
  margin: 0 auto;
`;

const Inner = styled.div(({ deg }: { deg: number }) => {
  return css`
    position: absolute;
    justify-self: center;
    margin: 0 auto;
    height: 40%;
    aspect-ratio: 1;
    background-color: hsl(${deg}, 100%, 50%);
    background: linear-gradient(
        to top,
        hsla(${deg}, 0%, 0%, 100%),
        hsla(${deg}, 0%, 50%, 0%) 50%
      ),
      linear-gradient(
        to bottom,
        hsla(${deg}, 0%, 100%, 100%),
        hsla(${deg}, 0%, 50%, 0%) 50%
      ),
      linear-gradient(
        to right,
        hsla(${deg}, 0%, 50%, 100%),
        hsla(${deg}, 0%, 50%, 0%) 50%
      ),
      hsl(${deg}, 100%, 50%);
  `;
});

const Outer = styled.div(({ light, sat }: { light: number; sat: number }) => {
  return css`
    //position: absolute;
    //height: calc(100% - 2em);
    height: 99%;
    aspect-ratio: 1;
    clip-path: url(#clip);
    overflow: visible;
    background: radial-gradient(
        white 0%,
        transparent 25%,
        black 50%,
        gray 51%,
        transparent 55%,
        transparent 60%,
        white 90%
      ),
      conic-gradient(
        from 180deg,
        hsl(360, 100%, 50%),
        hsl(315, 100%, 50%),
        hsl(270, 100%, 50%),
        hsl(225, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(135, 100%, 50%),
        hsl(90, 100%, 50%),
        hsl(45, 100%, 50%),
        hsl(0, 100%, 50%)
      );
    /* conic-gradient(
        from 180deg,
        hsl(360, ${sat}%, ${light}%),
        hsl(315, ${sat}%, ${light}%),
        hsl(270, ${sat}%, ${light}%),
        hsl(225, ${sat}%, ${light}%),
        hsl(180, ${sat}%, ${light}%),
        hsl(135, ${sat}%, ${light}%),
        hsl(90, ${sat}%, ${light}%),
        hsl(45, ${sat}%, ${light}%),
        hsl(0, ${sat}%, ${light}%)
      ); */
    justify-self: center;
  `;
});
const OuterIn = styled.div(({ light, sat }: { light: number; sat: number }) => {
  return css`
    position: absolute;
    height: calc(100% - 2em);
    aspect-ratio: 1;
    clip-path: url(#clip);
    overflow: visible;
    background: conic-gradient(
      from 180deg,
      hsl(360, ${sat}%, ${light}%),
      hsl(315, ${sat}%, ${light}%),
      hsl(270, ${sat}%, ${light}%),
      hsl(225, ${sat}%, ${light}%),
      hsl(180, ${sat}%, ${light}%),
      hsl(135, ${sat}%, ${light}%),
      hsl(90, ${sat}%, ${light}%),
      hsl(45, ${sat}%, ${light}%),
      hsl(0, ${sat}%, ${light}%)
    );
    justify-self: center;
  `;
});

const Svg = styled.svg`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const OuterClickBounds = styled.circle`
  r: 50px;
  fill: transparent;
  // stroke: white;
  // stroke-width: 1px;
`;
const InnerClickBounds = styled.rect`
  fill: transparent;
  width: 40px;
  height: 40px;
  x: -20px;
  y: -20px;
  /* stroke: white;
  stroke-width: 1px; */
`;
const Dot = styled.circle(
  ({ hsl, angle }: { hsl: [number, number, number]; angle: number }) => {
    return css`
      fill: ${`hsl(${angle}, ${hsl[1]}%, ${hsl[2]}%)`};
      stroke: white;
      stroke-width: 1px;
      pointer-events: none;
      r: 5px;
    `;
  }
);
const InnerDot = styled.circle(
  ({ hsl, angle }: { hsl: [number, number, number]; angle: number }) => {
    return css`
      fill: ${`hsl(${angle}, ${hsl[1]}%, ${hsl[2]}%)`};
      stroke: white;
      stroke-width: 0.75px;
      pointer-events: none;
      r: 2px;
    `;
  }
);

const ColorWheel = (): JSX.Element => {
  const colorState = useStore($colorState);
  const {
    outerPressed,
    innerPressed,
    angle,
    angleMem,
    cord,
    pos,
    posMem,
    sat,
    light,
  } = useStore($wheelState);
  const ref = React.useRef<SVGSVGElement>(null);
  const innerRef = React.useRef<SVGRectElement>(null);
  const outerRef = React.useRef<SVGCircleElement>(null);
  const innerDot = React.useRef<SVGCircleElement>(null);
  const [bounds, boundsSet] = useState<DOMRect>();
  const [innerBounds, innerBoundsSet] = useState<DOMRect>();
  const [mousePos, mousePosSet] = useState<{ x: number; y: number }>();

  type circleEvent = React.MouseEvent<SVGCircleElement, MouseEvent>;
  type rectEvent = React.MouseEvent<SVGRectElement, MouseEvent>;

  const findDegree = (x: number, y: number): number => {
    let val = (Math.atan2(x, y) / Math.PI) * 180;
    if (val < 0) {
      val += 360;
    }
    return val;
  };

  const setNewAngle = (): void => {
    if (mousePos !== undefined) {
      const newAngle = parseInt(
        findDegree(mousePos.x, mousePos.y).toFixed(2),
        10
      );
      setWheelState({
        angle: newAngle,
        cord: resolveToPoint(newAngle, 73, true),
      });
      setColor({
        type: "hsl",
        index: colorState.selected,
        color: [
          newAngle,
          colorState.colors[colorState.selected].hsl[1],
          colorState.colors[colorState.selected].hsl[2],
        ],
      });
    }
  };

  const setNewPos = (e: rectEvent): void => {
    if (innerBounds !== undefined) {
      const newPos = {
        x: range(0, innerBounds.width, -20, 20, e.clientX - innerBounds.left),
        y: range(0, innerBounds.height, -20, 20, e.clientY - innerBounds.top),
      };
      const newL = range(-20, 20, 100, 0, newPos.y);
      const newS = range(-20, 20, 0, 100, newPos.x);
      setWheelState({
        pos: newPos,
        light: newL,
        sat: newS,
      });
      setColor({
        type: "hsl",
        index: colorState.selected,
        color: [colorState.colors[colorState.selected].hsl[0], newS, newL],
      });
    }
  };

  const handleInnerMouseDown = (e: rectEvent): void => {
    if (innerBounds !== undefined) {
      setWheelState({
        innerPressed: true,
        posMem: pos,
      });
      setNewPos(e);
    }
  };
  const handleInnerMouseMove = (e: rectEvent): void => {
    if (innerPressed) {
      setNewPos(e);
    }
  };
  const handleInnerMouseUp = (e: rectEvent): void => {
    setWheelState({ innerPressed: false });
  };
  const handleInnerMouseLeave = (e: rectEvent): void => {
    setWheelState({ innerPressed: false });
    if (outerPressed === true) {
      setWheelState({
        pos: posMem,
      });
    }
  };

  const handleOuterMouseDown = (e: circleEvent): void => {
    setWheelState({ outerPressed: true, angleMem: angle });
    setNewAngle();
  };
  const handleOuterMouseMove = (e: circleEvent): void => {
    if (bounds !== undefined) {
      mousePosSet({
        x: range(0, bounds.width, -100, 100, e.clientX - bounds.left),
        y: range(0, bounds.height, -100, 100, e.clientY - bounds.top),
      });
    }
    if (outerPressed) {
      setNewAngle();
    }
  };
  const handleOuterMouseUp = (e: circleEvent): void => {
    setWheelState({ outerPressed: false });
  };
  const handleOuterMouseLeave = (e: circleEvent): void => {
    setWheelState({ outerPressed: false });
    if (outerPressed === true) {
      setWheelState({
        angle: angleMem,
        cord: resolveToPoint(angleMem, 73, true),
      });
    }
  };

  useEffect(() => {
    boundsSet(outerRef.current?.getBoundingClientRect());
    innerBoundsSet(innerRef.current?.getBoundingClientRect());
    setWheelState({
      cord: resolveToPoint(
        colorState.colors[colorState.selected].hsl[0],
        73,
        true
      ),
    });
  }, []);

  return (
    <Wrapper>
      <Container>
        <Clip />
        <Clip75 />
        <Inner deg={angle} />
        <Outer light={light} sat={sat} />
        {/* <OuterIn light={light} sat={sat} /> */}
        <Svg
          viewBox="-50 -50 100 100"
          /* ref={ref}
          onMouseMove={(e) => {
            if (bounds !== undefined) {
              mousePosSet({
                x: range(0, bounds.width, -100, 100, e.clientX - bounds.left),
                y: range(0, bounds.height, -100, 100, e.clientY - bounds.top),
              });
            }
          }} */
        >
          <OuterClickBounds
            onMouseDown={(e) => {
              handleOuterMouseDown(e);
            }}
            onMouseUp={(e) => {
              handleOuterMouseUp(e);
            }}
            onMouseMove={(e) => {
              handleOuterMouseMove(e);
            }}
            onMouseLeave={(e) => {
              handleOuterMouseLeave(e);
            }}
            ref={outerRef}
          />
          {bounds !== undefined ? (
            <Dot
              hsl={colorState.colors[colorState.selected].hsl}
              angle={angle}
              cx={cord.x}
              cy={cord.y}
            />
          ) : null}
          <InnerClickBounds
            ref={innerRef}
            onMouseDown={(e) => {
              console.log("clicked");
              handleInnerMouseDown(e);
            }}
            onMouseUp={(e) => {
              handleInnerMouseUp(e);
            }}
            onMouseMove={(e) => {
              handleInnerMouseMove(e);
            }}
            onMouseLeave={(e) => {
              handleInnerMouseLeave(e);
            }}
            pointerEvents={outerPressed ? "none" : "auto"}
          />
          {bounds !== undefined ? (
            <InnerDot
              ref={innerDot}
              hsl={colorState.colors[colorState.selected].hsl}
              angle={angle}
              cx={pos.x}
              cy={pos.y}
            />
          ) : null}
        </Svg>
      </Container>
    </Wrapper>
  );
};

export default ColorWheel;

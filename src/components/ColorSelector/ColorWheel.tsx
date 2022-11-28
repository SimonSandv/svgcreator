import React, { useState, useEffect } from "react";
import { useStore } from "effector-react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  $colorState,
  setColor,
  ColorState,
  $wheelState,
  setWheelState,
  resolveToPoint,
  range,
  $mousePos,
  findDegree
} from "index";
import DonutClipPath from "./DonutClipPath";
import DonutClipPath75 from "./DonutClipPath75";

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
    height: calc(100% - 1em);
    aspect-ratio: 1;
    clip-path: url(#clip75);
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

const setNewAngle = ({
  outerBounds,
  colorState,
}: {
  outerBounds: DOMRect | undefined;
  colorState: ColorState;
}): void => {
  const mousePos = $mousePos.getState();
  if (mousePos !== undefined && outerBounds !== undefined) {
    const newAngle = parseInt(
      findDegree(
        mousePos.x - (outerBounds?.left + outerBounds.width / 2),
        mousePos.y - (outerBounds?.top + outerBounds.height / 2)
      ).toFixed(2),
      10
    );
    setWheelState({
      angle: newAngle,
      outerPos: resolveToPoint(newAngle, 73, true),
    });
    setColor({
      type: "hsl",
      index: colorState.selected,
      color: [
        newAngle,
        colorState.colors[colorState.selected].hsl.array[1],
        colorState.colors[colorState.selected].hsl.array[2],
      ],
    });
  }
};

const setNewPos = ({
  innerBounds,
  colorState,
}: {
  innerBounds: DOMRect | undefined;
  colorState: ColorState;
}): void => {
  if (innerBounds !== undefined) {
    const mousePos = $mousePos.getState();
    const x = range(innerBounds.left, innerBounds.right, -20, 20, mousePos.x);
    const y = range(innerBounds.top, innerBounds.bottom, -20, 20, mousePos.y);
    const h = colorState.colors[colorState.selected].hsl.array[0];
    const s = Math.floor(range(-20, 20, 0, 100, x));
    const l = Math.floor(range(-20, 20, 100, 0, y));
    const hsl = [h, s, l];
    setWheelState({
      innerPos: {
        x,
        y,
      },
      sat: s,
      light: l,
    });
    if (hsl !== colorState.colors[colorState.selected].hsl.array) {
      setColor({
        type: "hsl",
        index: colorState.selected,
        color: [h, s, l],
      });
    }
  }
};

export const ColorWheel = React.memo((): JSX.Element => {
  const colorState = useStore($colorState);
  const { angle, outerPos, innerPos, sat, light } = useStore($wheelState);
  const ref = React.useRef<SVGSVGElement>(null);
  const innerRef = React.useRef<SVGRectElement>(null);
  const outerRef = React.useRef<SVGCircleElement>(null);
  const innerDot = React.useRef<SVGCircleElement>(null);
  const [outerBounds, outerBoundsSet] = useState<DOMRect>();
  const [innerBounds, innerBoundsSet] = useState<DOMRect>();

  useEffect(() => {
    const oBounds = outerRef.current?.getBoundingClientRect();
    const iBounds = innerRef.current?.getBoundingClientRect();
    outerBoundsSet(oBounds);
    innerBoundsSet(iBounds);
  }, []);

  useEffect(() => {
    setWheelState({
      angle: colorState.colors[colorState.selected].hsl.array[0],
      innerPos: {
        x: range(
          0,
          100,
          -20,
          20,
          colorState.colors[colorState.selected].hsl.array[1]
        ),
        y: range(
          0,
          100,
          20,
          -20,
          colorState.colors[colorState.selected].hsl.array[2]
        ),
      },
      outerPos: resolveToPoint(
        colorState.colors[colorState.selected].hsl.array[0],
        73,
        true
      ),
    });
  }, [colorState.colors, colorState.selected]);

  const handleInnerMouseMove = (): void => {
    setNewPos({ colorState, innerBounds });
  };
  const handleInnerMouseUp = (): void => {
    document.removeEventListener("mousemove", handleInnerMouseMove);
  };
  const handleInnerMouseDown = (): void => {
    console.log("mouseDown");
    setNewPos({
      colorState,
      innerBounds,
    });

    document.addEventListener("mousemove", handleInnerMouseMove);
    document.addEventListener("mouseup", handleInnerMouseUp, { once: true });
  };
  const handleOuterMouseMove = (): void => {
    setNewAngle({ colorState, outerBounds });
  };
  const handleOuterMouseUp = (): void => {
    document.removeEventListener("mousemove", handleOuterMouseMove);
  };
  const handleOuterMouseDown = (): void => {
    setWheelState({ outerPressed: true, angleMem: angle });
    setNewAngle({ colorState, outerBounds });
    document.addEventListener("mousemove", handleOuterMouseMove);
    document.addEventListener("mouseup", handleOuterMouseUp, { once: true });
  };

  return (
    <Wrapper>
      <Container>
        <DonutClipPath />
        <DonutClipPath75 />
        <Inner deg={angle} />
        <Outer light={light} sat={sat} />
        {/* <OuterIn light={light} sat={sat} /> */}
        <Svg viewBox="-50 -50 100 100">
          <OuterClickBounds
            onMouseDown={() => {
              handleOuterMouseDown();
            }}
            ref={outerRef}
          />
          {outerBounds !== undefined ? (
            <Dot
              hsl={[angle, 100, 50]}
              angle={angle}
              cx={outerPos.x}
              cy={outerPos.y}
            />
          ) : null}
          <InnerClickBounds
            ref={innerRef}
            onMouseDown={() => {
              handleInnerMouseDown();
            }}
          />
          {outerBounds !== undefined ? (
            <InnerDot
              ref={innerDot}
              hsl={colorState.colors[colorState.selected].hsl.array}
              angle={angle}
              cx={innerPos.x}
              cy={innerPos.y}
            />
          ) : null}
        </Svg>
      </Container>
    </Wrapper>
  );
});
export default ColorWheel;
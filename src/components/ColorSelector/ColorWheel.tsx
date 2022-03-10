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
import {
  AngleFromPoints,
  angleInRadians,
  pointToDegree,
  resolveToPoint,
  range,
} from "../../util/mathUtils";
import Clip from "./Clip";

const Container = styled.div`
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;

const Inner = styled.div(({ deg }: { deg: number }) => {
  return css`
    position: absolute;
    justify-self: center;
    margin: 0 auto;
    height: 28%;
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

const Outer = styled.div(() => {
  return css`
    display: flex;
    margin: auto;
    height: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    clip-path: url(#clip);
    overflow: visible;
    justify-content: center;
    align-items: center;
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
          hsl(0, 100%, 50%),
          hsl(45, 100%, 50%),
          hsl(90, 100%, 50%),
          hsl(135, 100%, 50%),
          hsl(180, 100%, 50%),
          hsl(225, 100%, 50%),
          hsl(270, 100%, 50%),
          hsl(315, 100%, 50%),
          hsl(360, 100%, 50%)
        ); */
    justify-self: center;
  `;
});

const DotContainer = styled.svg`
  position: absolute;
  //border: 3px solid white;
  height: 100%;
  aspect-ratio: 1;
  justify-self: center;
  align-self: center;
`;
const ClickBounds = styled.circle`
  r: 70px;
  fill: transparent;
  //stroke: white;
  //stroke-width: 1px;
`;

const Dot = styled.circle(
  ({ hsl, angle }: { hsl: [number, number, number]; angle: number }) => {
    return css`
      fill: ${`hsl(${angle}, ${hsl[1]}%, ${hsl[2]}%)`};
      stroke: white;
      stroke-width: 1px;
      pointer-events: none;
    `;
  }
);

const ColorWheel = (): JSX.Element => {
  const colorState = useStore($colorState);
  // const { pressed, angle } = useStore($wheelState);
  const ref = React.useRef<SVGSVGElement>(null);
  // const mousePos = useStore($mousePos);
  const [bounds, boundsSet] = useState<DOMRect>();
  const [mem, memSet] = useState<number>(0);
  const [width, widthSet] = useState(200);
  const [height, heightSet] = useState(200);
  const [radius, radiusSet] = useState(100);
  const [angle, angleSet] = useState(0);
  const [pressed, pressedSet] = useState(false);
  const [dotRadius, dotRadiusSet] = useState(5);
  const [dotCord, dotCordSet] = useState({ x: 0, y: 52 });
  const [mousePos, mousePosSet] = useState({ x: 0, y: 0 });

  type E = React.MouseEvent<SVGCircleElement, MouseEvent>;

  const findDegree = (x: number, y: number): number => {
    let val = (Math.atan2(x, y) / Math.PI) * 180;
    if (val < 0) val += 360;
    return val;
  };

  const setNewAngle = (): void => {
    const newAngle = parseInt(
      findDegree(mousePos.x, mousePos.y).toFixed(2),
      10
    );
    angleSet(newAngle);
    dotCordSet(resolveToPoint(newAngle, 105, true));
  };

  const handleMouseDown = (e: E): void => {
    if (ref !== null) {
      console.log(
        "ref",
        "width:",
        ref.current?.clientWidth,
        "height:",
        ref.current?.clientHeight
      );
    }
    pressedSet(true);
    memSet(angle);
    setNewAngle();
  };
  const handleMouseMove = (e: E): void => {
    const i = 0;
    if (pressed) {
      setNewAngle();
      /* setColor({
        type: "hsl",
        index: i,
        color: [
          angle,
          colorState.colors[i].hsl[1],
          colorState.colors[i].hsl[2],
        ],
      }); */
    }
  };
  const handleMouseUp = (e: E): void => {
    pressedSet(false);
  };
  const handleMouseLeave = (e: E): void => {
    pressedSet(false);
    angleSet(mem);
    dotCordSet(resolveToPoint(mem, 105, true));
  };

  useEffect(() => {
    boundsSet(ref.current?.getBoundingClientRect());
  }, []);

  return (
    <Container>
      <Clip />
      <Inner deg={angle} />
      <Outer />
      <DotContainer
        ref={ref}
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        onMouseMove={(e) => {
          if (bounds !== undefined) {
            // console.log(bounds);
            mousePosSet({
              x: range(0, bounds.width, -100, 100, e.clientX - bounds.left),
              y: range(0, bounds.height, -100, 100, e.clientY - bounds.top),
            });
            // console.log(mousePos);
          }
        }}
      >
        <ClickBounds
          onMouseDown={(e) => {
            handleMouseDown(e);
          }}
          onMouseUp={(e) => {
            handleMouseUp(e);
          }}
          onMouseMove={(e) => {
            handleMouseMove(e);
          }}
          onMouseLeave={(e) => {
            handleMouseLeave(e);
          }}
        />
        {bounds !== undefined ? (
          <Dot
            hsl={colorState.colors[colorState.selected].hsl}
            angle={angle}
            cx={dotCord.x}
            cy={dotCord.y}
            r={dotRadius}
          />
        ) : null}
      </DotContainer>
    </Container>
  );
};

export default ColorWheel;

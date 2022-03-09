import React, { useState, useRef } from "react";
import { useStore, useStoreMap } from "effector-react";
import { createEvent, createEffect, createStore, sample } from "effector";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  numOnly,
  $store,
  updatePathAttribute,
  updatePathProps,
  $selectedState,
} from "../index";

const ColorWheel = (): JSX.Element => {
  const Clip = (): JSX.Element => {
    return (
      <svg
        height="0"
        width="0"
        className="clip"
        style={{ position: "absolute" }}
      >
        <defs>
          <clipPath id="clip" clipPathUnits="objectBoundingBox">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.501221 1.00468C0.777374 1.00468 1.00122 0.780823 
              1.00122 0.504684C1.00122 0.228546 0.777374 0.00468445 0.501221 
              0.00468445C0.225067 0.00468445 0.0012207 0.228546 0.0012207 
              0.504684C0.0012207 0.780823 0.225067 1.00468 0.501221 
              1.00468ZM0.501221 0.879684C0.708313 0.879684 0.876221 
              0.711792 0.876221 0.504684C0.876221 0.297577 0.708313 
              0.129684 0.501221 0.129684C0.294128 0.129684 0.126221 
              0.297577 0.126221 0.504684C0.126221 0.711792 0.294128 
              0.879684 0.501221 0.879684Z"
            />
          </clipPath>
        </defs>
      </svg>
    );
  };

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
      height: 30%;
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

  const Outer = styled.div`
    // position: absolute;
    margin: auto;
    height: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    clip-path: url(#clip);
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
    justify-self: center;
  `;
  return (
    <Container>
      <Clip />
      <Inner deg={270} />
      <Outer />
    </Container>
  );
};

const ColorSelector = (): JSX.Element => {
  const { pathIndex } = useStore($selectedState);
  const { paths } = useStore($store);
  const [focus, focusSet] = useState<boolean>(false);

  const Container = styled.div``;
  const Input = styled.input`
    max-width: 75px;
  `;

  return (
    <Container>
      <ColorWheel />
      <label htmlFor="hex">
        <Input name="hex" />
      </label>
      <label htmlFor="hex">
        <Input name="hex" />
      </label>
      <label htmlFor="hex">
        <Input name="hex" />
      </label>
      <label htmlFor="hex">
        <Input name="hex" />
      </label>
    </Container>
  );
};

export default ColorSelector;

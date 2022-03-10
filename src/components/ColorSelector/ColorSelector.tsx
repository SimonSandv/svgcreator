import React, { useState } from "react";
import { useStore } from "effector-react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { $store, $selectedState, $colorState, setColor } from "../../index";
import ColorWheel from "./ColorWheel";

const ColorSelector = (): JSX.Element => {
  const colorState = useStore($colorState);

  const Container = styled.div``;
  const Input = styled.input`
    max-width: 75px;
  `;
  const ColorsContainer = styled.div``;
  const ColorTile = styled.div`
    width: 50px;
    height: 50px;
  `;

  return (
    <Container>
      <ColorWheel />
      {/* <input
        type="range"
        min={0}
        max={360}
        step={0.1}
        value={colorState.colors[colorState.selected].hsl[0]}
        onChange={(e) => {
          return setColor({
            type: "hsl",
            index: colorState.selected,
            color: [
              parseInt(e.target.value, 10),
              colorState.colors[colorState.selected].hsl[1],
              colorState.colors[colorState.selected].hsl[2],
            ],
          });
        }}
      /> */}
      {`${colorState.colors[colorState.selected].hsl[0]}`}
      <ColorsContainer></ColorsContainer>
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

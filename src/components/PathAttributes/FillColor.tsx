import React from "react";
import { useStore } from "effector-react";
import styled from "@emotion/styled";
import { $selectedState, $store, updatePathProps } from "../../index";

const FillColor = (): JSX.Element => {
  const { paths } = useStore($store);
  const { pathIndex } = useStore($selectedState);
  const Container = styled.div``;
  const Color = styled.div`
    display: inline-block;
    justify-self: center;
    align-self: center;
    height: 25px;
    aspect-ratio: 1;
    background-color: ${(props) => {
      return props.color;
    }};
  `;
  const Input = styled.input`
    max-width: 75px;
  `;
  return (
    <Container>
      <label htmlFor="input">
        FillColor:
        <Input
          // defaultValue="transparent"
          name="input"
          onChange={(e) => {
            updatePathProps({ pathIndex, fill: e.target.value });
          }}
        />
      </label>
      <Color
        color={
          paths[pathIndex] !== undefined
            ? paths[pathIndex].attr.fill
            : "transparent"
        }
      />
    </Container>
  );
};
export default FillColor;

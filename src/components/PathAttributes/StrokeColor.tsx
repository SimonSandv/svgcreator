import React from "react";
import { useStore } from "effector-react";
import styled from "@emotion/styled";
import {
  $selectedState,
  $store,
  updatePathAttribute,
  updatePathProps,
} from "../../index";
import { Stroke } from "../../store/typeDeclarations";

const StrokeColor = (): JSX.Element => {
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
        StrokeColor:
        <Input
          name="input"
          defaultValue="#00ff"
          onChange={(e) => {
            updatePathProps({ pathIndex, stroke: e.target.value });
            /* updatePathAttribute({
              pathIndex,
              strokeColor: e.target.value.toString(),
            }); */
          }}
        />
      </label>
      <Color
        color={
          paths[pathIndex] !== undefined
            ? paths[pathIndex].attr.stroke
            : "white"
        }
      />
    </Container>
  );
};
export default StrokeColor;

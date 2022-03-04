import React, { useState } from "react";
import { useStore, useStoreMap } from "effector-react";
import { createEvent, createEffect, createStore, sample } from "effector";
import styled from "@emotion/styled";
import {
  numOnly,
  $store,
  updatePathAttribute,
  updatePathProps,
  $selectedState,
} from "../../index";

const StrokeWidth = (): JSX.Element => {
  // const [state, stateSet] = useState(0);
  const { pathIndex } = useStore($selectedState);
  const { paths } = useStore($store);

  const Container = styled.div``;
  const Inputt = styled.input`
    max-width: 75px;
  `;

  const Input = (): JSX.Element => {
    return (
      <Inputt
        key="strokeWidthInput"
        defaultValue={
          paths[pathIndex] !== undefined ? paths[pathIndex].attr.strokeWidth : 1
        }
        onChange={(e) => {
          updatePathProps({ pathIndex, strokeWidth: e.target.value });
        }}
      />
    );
  };

  return (
    <Container>
      <label>
        StrokeWidth:
        <Input />
        <select
          key="strokeWidthSelect"
          defaultValue="%"
          onChange={(e) => {
            updatePathAttribute({
              pathIndex,
              strokeWidthOperand: e.target.value,
            });
          }}
        >
          <option value="px">px</option>
          <option value="%">%</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
        </select>
      </label>
    </Container>
  );
};

export default StrokeWidth;

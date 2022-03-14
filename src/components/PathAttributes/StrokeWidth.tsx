import React, { useState, useRef } from "react";
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
  const { pathIndex } = useStore($selectedState);
  const { paths } = useStore($store);
  const [focus, focusSet] = useState<boolean>(false);

  const Container = styled.div``;
  const Input = styled.input`
    max-width: 75px;
  `;

  return (
    <Container>
      <label htmlFor="strokeWidthInput">
        StrokeWidth:
        <Input
          name="strokeWidthInput"
          key="strokeWidthInput"
          value={paths[pathIndex].attr.strokeWidth}
          onKeyPress={(e) => {
            return numOnly(e);
          }}
          onChange={(e) => {
            updatePathProps({ pathIndex, strokeWidth: e.target.value });
          }}
          onFocus={() => {
            return focusSet(true);
          }}
          onBlur={() => {
            return focusSet(false);
          }}
          autoFocus={focus}
        />
        {/* <select
          key="strokeWidthSelect"
          defaultValue="px"
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
        </select> */}
      </label>
    </Container>
  );
};

export default React.memo(StrokeWidth);

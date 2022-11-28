import React from "react";
import styled from "@emotion/styled";
import { numOnly, setViewBoxState } from "index";

const ViewBox = React.memo((): JSX.Element => {
  const Container = styled.div`
    width: 100%;
  `;
  const Line = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 1fr;
  `;
  const Input = styled.input`
    width: 75px;
    right: 0px;
  `;
  const Label = styled.label`
    margin-right: 0.5em;
    justify-self: end;
  `;
  return (
    <Container>
      <Line>
        <Label htmlFor="viewBox-x">X</Label>
        <Input
          defaultValue={0}
          id="viewBox-x"
          type="number"
          onKeyPress={(e) => {
            return numOnly(e);
          }}
          onChange={(e) => {
            return setViewBoxState({ x: parseFloat(e.target.value) });
          }}
        />
      </Line>
      <Line>
        <Label htmlFor="viewBox-y">Y</Label>
        <Input
          defaultValue={0}
          id="viewBox-y"
          type="number"
          onKeyPress={(e) => {
            return numOnly(e);
          }}
          onChange={(e) => {
            return setViewBoxState({ y: parseFloat(e.target.value) });
          }}
        />
      </Line>
      <Line>
        <Label htmlFor="viewBox-width">Width</Label>
        <Input
          defaultValue={100}
          id="viewBox-width"
          type="number"
          onKeyPress={(e) => {
            return numOnly(e);
          }}
          onBlur={(e) => {
            return setViewBoxState({ width: parseFloat(e.target.value) });
          }}
        />
      </Line>
      <Line>
        <Label htmlFor="viewBox-height">Height</Label>
        <Input
          defaultValue={25}
          id="viewBox-height"
          type="number"
          onKeyPress={(e) => {
            return numOnly(e);
          }}
          onBlur={(e) => {
            return setViewBoxState({ height: parseFloat(e.target.value) });
          }}
        />
      </Line>
    </Container>
  );
});
export default ViewBox;

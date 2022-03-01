import React from "react";

import { numOnly, setViewBoxState } from "../index";

const ViewBox = (): JSX.Element => {
  return (
    <div>
      <label htmlFor="viewBox-x">X</label>
      <input
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

      <label htmlFor="viewBox-y">Y</label>
      <input
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

      <label htmlFor="viewBox-width">Width</label>
      <input
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

      <label htmlFor="viewBox-height">Height</label>
      <input
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
    </div>
  );
};
export default ViewBox;

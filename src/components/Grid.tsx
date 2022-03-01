import React from "react";
import styled from "@emotion/styled";
import { useStore } from "effector-react";
import { $gridState } from "../store/gridState";

const Grid = (): JSX.Element => {
  const gridState = useStore($gridState);

  const LargeGrid = styled.pattern`
    path {
      opacity: ${gridState.largeGrid.opacity}%;
    }
  `;
  const SmallGrid = styled.pattern`
    path {
      opacity: ${gridState.smallGrid.opacity}%;
    }
  `;

  return (
    <g>
      <defs>
        <SmallGrid
          className="grid"
          id="pixelGrid"
          width="1"
          height="1"
          x="0"
          y="0"
          patternUnits="userSpaceOnUse"
        >
          <path
            className="grid"
            id="grid1"
            d="M 0 0 L 0 1 1 1 1 0 0 0"
            fill="none"
            stroke="silver"
            strokeWidth="0.1"
          />
        </SmallGrid>
        <LargeGrid
          id="tenthGrid"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width="10" height="10" fill="url(#pixelGrid)" />
          <path
            className="grid"
            id="grid2"
            d="M 0 0 L 0 10 10 10 10 0 0 0"
            fill="none"
            stroke="silver"
            strokeWidth="0.25"
          />
        </LargeGrid>
        <pattern
          id="grid"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100" height="100" fill="url(#tenthGrid)" />
          <path
            className="grid"
            id="grid3"
            d="M 0 0 L 0 100 100 100 100 0 0 0"
            fill="none"
            stroke="gray"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
    </g>
  );
};

export default Grid;

import React from "react";
import styled from "@emotion/styled";
import {
  MenuCard,
  ColorTest,
  StrokeWidth,
  StrokeColor,
  FillColor,
  ColorSelector,
} from "index";
import { gradientFrame } from "../styles/styles";

export const RightMenu = React.memo((): JSX.Element => {
  const Container = styled.div`
    min-width: 100px;
    width: 100%;
    height: 100%;
    max-width: 300px;
    background-color: var(--color1);
    grid-area: r;
    padding: 2em;
    background: linear-gradient(145deg, var(--color1) 0%, var(--color2) 73%);
    background-attachment: fixed;
  `;

  return (
    <Container>
      <MenuCard title="Colors">
        <ColorTest />
      </MenuCard>
      <MenuCard title="Attributes">
        <StrokeWidth />
        <StrokeColor />
        {/* <FillColor /> */}
      </MenuCard>
      <MenuCard title="Color">
        <ColorSelector />
      </MenuCard>
    </Container>
  );
});

export default RightMenu;

import React from "react";
import styled from "@emotion/styled";
import { MousePosition, ToolInfo } from "../index";
import { gradientFrame } from "../styles/styles";

const TopMenu = (): JSX.Element => {
  const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--color2);
    display: flex;
    grid-area: t;
    background: linear-gradient(145deg, var(--color1) 0%, var(--color2) 73%);
    background-attachment: fixed;
  `;

  return (
    <Container>
      <MousePosition />
      <ToolInfo />
    </Container>
  );
};

export default TopMenu;

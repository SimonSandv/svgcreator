import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  ViewBoxInput,
  RelToggle,
  IndicatorSelector,
  Layers,
  MenuCard,
  StrokeWidth,
  PathAttributes,
} from "../index";
import { gradientFrame } from "../styles/styles";

const LeftMenu = (): JSX.Element => {
  /* const color = getComputedStyle(document.documentElement).getPropertyValue(
    "--color1"
  ); */
  const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 2em;
    max-width: 300px;
    grid-area: l;
    display: relative;
    overflow: hidden;
    background: linear-gradient(145deg, var(--color1) 0%, var(--color2) 73%);
    background-attachment: fixed;
  `;

  const items: [title: string, item: JSX.Element][] = [
    ["ViewBox", <ViewBoxInput />],
    ["RelToggle", <RelToggle />],
    ["CursorShape", <IndicatorSelector />],
    ["Layers", <Layers />],
    // <StrokeWidth />,
    // <PathAttributes />,
  ];

  return (
    <Container>
      {items.map((item) => {
        return (
          <MenuCard title={item[0]} key={`LeftMenu-${item[0]}`}>
            {item[1]}
          </MenuCard>
        );
      })}
    </Container>
  );
};

export default React.memo(LeftMenu);

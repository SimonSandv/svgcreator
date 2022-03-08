import React from "react";
import styled from "@emotion/styled";
import { useStore } from "effector-react";
import { $themeState, nextTheme } from "../store/themeState";
import { getColorShades } from "../util/utilityFunctions";

const ColorTest = (): JSX.Element => {
  const themeState = useStore($themeState);

  const Container = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid white;
  `;
  const Color = styled.div`
    display: inline-block;
  `;
  const Shade = styled.div`
    width: 25px;
    height: 25px;
    margin: 0.25em;
    background-color: ${(props) => {
      return props.color;
    }};
  `;

  const Button = styled.button`
    margin: 1em;
  `;

  const colors = getColorShades(
    themeState.themes[themeState.themeIndex],
    [0.1, 0.3, 0.5],
    "both",
    true,
    true,
    "hsl"
  );

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          nextTheme();
        }}
      >
        Next Theme
      </Button>
      <Container>
        {colors.map((color) => {
          console.log(color.lighter);
          return (
            <Color key={`Colors-${color.base}`}>
              {color.lighter
                ?.slice(0)
                .reverse()
                .map((v, i) => {
                  return (
                    <Shade color={v} key={`Colors-${color.lighter![i]}`} />
                  );
                })}
              <Shade color={color.base} />
              {color.darker?.map((v, i) => {
                return <Shade color={v} key={`Colors-${color.darker![i]}`} />;
              })}
            </Color>
          );
        })}
      </Container>
    </>
  );
};
export default ColorTest;

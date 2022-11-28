import React, { useState } from "react";
import { useStore } from "effector-react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  $colorState,
  setColor,
  ColorWheel,
  hslToArray,
  getColorShades,
} from "index";

export const ColorSelector = React.memo((): JSX.Element => {
  const { colors, selected } = useStore($colorState);
  type Focus = "hex" | "h" | "s" | "l" | "r" | "g" | "b" | undefined;
  const [focus, focusSet] = useState<Focus>();

  const Container = styled.div``;

  const TileContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1em;
    align-items: center;
    justify-content: center;
  `;
  const ColorTile = styled.div(
    ({
      color,
      size,
    }: {
      color: string;
      size: number;
      borderColor?: string;
    }) => {
      return css`
        width: ${size}px;
        height: ${size}px;
        aspect-ratio: 1;
        //border: 1.5px solid black;
        border-radius: 50%;
        margin: 0.25em;
        background-color: ${color};
      `;
    }
  );
  const InputContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(1/3fr, 3);
    grid-template-columns: 1fr;
    grid-gap: 1em;
    margin: 1em auto;
    width: 100%;
    // border: 1px solid white;
    justify-content: center;
    label {
      text-align: center;
      justify-self: center;
    }
  `;
  const Line = styled.div`
    margin: 0 auto;
    width: 100%;
    //border: 1px solid yellow;
  `;
  const InputWrapper = styled.div(({ c }: { c: string }) => {
    return css`
      display: inline-block;
      position: relative;
      &:hover {
        &:after {
          position: absolute;
          content: "${c === "hex" ? ".........." : "...."}";
          width: 100%;
          height: 100%;
          letter-spacing: 2px;
          top: 0.4em;
          left: 0;
          color: white;
          pointer-events: none;
        }
      }
    `;
  });

  const StyledInput = styled.input`
    border: 0px solid white;
    background: transparent;
    width: auto;
    margin: 0;
    padding: 0;
    text-align: center;
    &:focus {
      outline: none;
      box-shadow: none;
      border-color: inherit;
    }

    width: auto;
    size: 3;
    max-width: 75px;
  `;

  type T = [number[] | string, "hsl" | "rgb" | "hex", number];
  const Input = ({ arr }: { arr: Array<string | T> }): JSX.Element => {
    return (
      <Line>
        {arr.map((item) => {
          if (typeof item !== "string") {
            return (
              <InputWrapper
                className="inputWrapper"
                key={`wrapper-${item[1]}${item[2]}`}
                c={item[1]}
              >
                <StyledInput
                  key={item[1] + item[2]}
                  value={
                    item[1] !== "hex" ? item[0][item[2]] : (item[0] as string)
                  }
                  size={item[1] !== "hex" ? 1 : 4}
                  draggable="false"
                  onChange={(e) => {
                    let str = e.target.value;
                    if (str.length > 3 && item[1] !== "hex") {
                      str = str.slice(0, -1);
                    }
                    if (str.length > 6 && item[1] === "hex") {
                      str = str[0] === "#" ? str.slice(1) : str.slice(0, -1);
                    }
                    let val = parseInt(str, 10);
                    if (item[1] === "hsl" && item[2] === 0) {
                      val = val > 360 ? 360 : val < 0 ? 0 : val;
                    }
                    if (item[1] === "hsl" && item[2] !== 0) {
                      val = val > 100 ? 100 : val < 0 ? 0 : val;
                    }
                    if (item[1] === "rgb") {
                      val = val > 255 ? 255 : val < 0 ? 0 : val;
                    }
                    setColor({
                      type: item[1],
                      index: selected,
                      color:
                        item[1] !== "hex"
                          ? [
                              item[2] === 0
                                ? str !== ""
                                  ? val
                                  : 0
                                : (item[0][0] as unknown as number),
                              item[2] === 1
                                ? str !== ""
                                  ? val
                                  : 0
                                : (item[0][1] as unknown as number),
                              item[2] === 2
                                ? str !== ""
                                  ? val
                                  : 0
                                : (item[0][2] as unknown as number),
                            ]
                          : str,
                    });
                  }}
                  onFocus={() => {
                    return focusSet(item[1][item[2]] as Focus);
                  }}
                  onBlur={() => {
                    return focusSet(undefined);
                  }}
                  autoFocus={focus === (item[1][item[2]] as Focus)}
                />
              </InputWrapper>
            );
          }
          return item;
        })}
      </Line>
    );
  };

  const Shades = (): JSX.Element => {
    const shades = getColorShades(
      [colors[selected].hex],
      [0.1, 0.3, 0.5],
      "both",
      true,
      false,
      "hsl"
    );
    return (
      <TileContainer>
        {shades !== undefined
          ? shades.map((color): JSX.Element => {
              return (
                <TileContainer key="TileContainer">
                  {color.lighter
                    ?.slice(0)
                    .reverse()
                    .map((v, i) => {
                      return (
                        <ColorTile
                          color={v}
                          size={20}
                            key={`Tile-L-${color.lighter![i]}${i}`} //eslint-disable-line
                          onClick={() => {
                            return setColor({
                              color: hslToArray(v),
                              index: selected,
                              type: "hsl",
                            });
                          }}
                        />
                      );
                    })}
                  <ColorTile color={color.base} size={35} />
                  {color.darker?.map((v, i) => {
                    return (
                      <ColorTile
                        color={v}
                        size={20}
                          key={`Tile-D-${color.darker![i]}${i}`} //eslint-disable-line
                        onClick={() => {
                          return setColor({
                            color: `${v};`,
                            index: selected,
                            type: "hsl",
                          });
                        }}
                      />
                    );
                  })}
                </TileContainer>
              );
            })
          : null}
      </TileContainer>
    );
  };
  return (
    <Container>
      <ColorWheel />
      <div>
        <Shades />
        <InputContainer>
          <Input
            arr={[
              "hsl(",
              [colors[selected].hsl.array, "hsl", 0],
              ", ",
              [colors[selected].hsl.array, "hsl", 1],
              "%, ",
              [colors[selected].hsl.array, "hsl", 2],
              "%)",
            ]}
          />
          <Input
            arr={[
              "rgb(",
              [colors[selected].rgb.array, "rgb", 0],
              ", ",
              [colors[selected].rgb.array, "rgb", 1],
              ", ",
              [colors[selected].rgb.array, "rgb", 2],
              ")",
            ]}
          />
          <Input arr={["#", [colors[selected].hex, "hex", 0]]} />
        </InputContainer>
        <TileContainer>
          <ColorTile color={colors[selected].hsl.string} size={35} />
          <ColorTile color={colors[selected].rgb.string} size={35} />
          <ColorTile color={`#${colors[selected].hex}`} size={35} />
        </TileContainer>
        <TileContainer>
          <ColorTile color={colors[selected].hsl.string} size={35} />
        </TileContainer>
      </div>
    </Container>
  );
});

export default ColorSelector;

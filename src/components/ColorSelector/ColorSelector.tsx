import React, { useState, useRef } from "react";
import { useStore } from "effector-react";
// import styled from "@emotion/styled";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { $store, $selectedState, $colorState, setColor } from "../../index";
import ColorWheel from "./ColorWheel";
import { setSelectedColor } from "../../store/colorState";
import { setWheelState } from "../../store/wheelState";

const ColorSelector = (): JSX.Element => {
  const { colors, selected } = useStore($colorState);
  type Focus = "hex" | "h" | "s" | "l" | "r" | "g" | "b" | undefined;
  const [focus, focusSet] = useState<Focus>();
  const hslRef = useRef<HTMLInputElement>(null);

  const Container = styled.div``;

  const TileContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 1em;
    justify-content: center;
  `;
  const ColorTile = styled.div(({ color }: { color: string }) => {
    return css`
      width: 50px;
      height: 50px;
      border: 1px solid white;
      background-color: ${color};
    `;
  });
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
                                : (item[0][0] as any as number),
                              item[2] === 1
                                ? str !== ""
                                  ? val
                                  : 0
                                : (item[0][1] as any as number),
                              item[2] === 2
                                ? str !== ""
                                  ? val
                                  : 0
                                : (item[0][2] as any as number),
                            ]
                          : str,
                    });
                  }}
                  onFocus={() => {
                    return focusSet(item[1][item[2] as number] as Focus);
                  }}
                  onBlur={() => {
                    return focusSet(undefined);
                  }}
                  autoFocus={focus === (item[1][item[2] as number] as Focus)}
                />
              </InputWrapper>
            );
          }
          return item;
        })}
      </Line>
    );
  };
  return (
    <Container>
      <ColorWheel />
      <div>
        <TileContainer>
          <ColorTile
            color={`hsl(${colors[selected].hsl[0]}, ${colors[selected].hsl[1]}%, ${colors[selected].hsl[2]}%)`}
          />
        </TileContainer>
        <InputContainer>
          <Input
            arr={[
              "hsl(",
              [colors[selected].hsl, "hsl", 0],
              ", ",
              [colors[selected].hsl, "hsl", 1],
              "%, ",
              [colors[selected].hsl, "hsl", 2],
              "%)",
            ]}
          />
          <Input
            arr={[
              "rgb(",
              [colors[selected].rgb, "rgb", 0],
              ", ",
              [colors[selected].rgb, "rgb", 1],
              ", ",
              [colors[selected].rgb, "rgb", 2],
              ")",
            ]}
          />
          <Input arr={["#", [colors[selected].hex, "hex", 0]]} />
        </InputContainer>
      </div>
    </Container>
  );
};

export default React.memo(ColorSelector);

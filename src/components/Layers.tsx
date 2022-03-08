import React from "react";
import styled from "@emotion/styled";
import { useStore } from "effector-react";
import { $store } from "../index";

const Layers = (): JSX.Element => {
  const store = useStore($store);
  const Wrapper = styled.div`
    width: 100%;
  `;
  const PathHead = styled.div`
    width: 100%;
    display: grid;
    background-color: var(--color4);
    grid-template-columns: 50% 50%;
    grid-template-rows: 1fr;
    border: 1px solid var(--color3);
  `;
  const Path = styled.div`
    width: 100%;
  `;
  const Title = styled.h4`
    color: black;
    justify-self: start;
    align-self: center;
    margin-left: 0.5em;
  `;
  const ThumbNail = styled.div`
    background-color: red;
    justify-self: end;
    aspect-ratio: 1;
    width: 50px;
  `;
  const LineContainer = styled.div`
    min-height: 150px;
    max-height: 150px;
    overflow-y: scroll;
  `;
  const Line = styled.div`
    width: 100%;
    justify-content: start;
    background-color: var(--color2);
    border-bottom: 1px solid var(--color3);
  `;

  const handlePathClick = (pathIndex: number): void => {};
  const handleLineClick = (lineIndex: number): void => {};
  return (
    <Wrapper>
      {store.paths.map((path, pathIndex) => {
        return (
          <Path
            onClick={() => {
              handlePathClick(pathIndex);
            }}
            key={`Layers-Path${path.pathIndex}`}
          >
            <PathHead>
              <Title>
                {path.title !== undefined ? path.title : `Path  ${pathIndex}`}
              </Title>
              <ThumbNail></ThumbNail>
            </PathHead>
            <LineContainer>
              {path.lines
                .slice(0)
                .reverse()
                .map((line, lineIndex) => {
                  return (
                    <Line
                      onClick={() => {
                        handleLineClick(lineIndex);
                      }}
                      key={`Layers-Path${path.pathIndex}-Line${line.lineIndex}`}
                    >
                      {lineIndex}
                      {line.tool}
                    </Line>
                  );
                })}
            </LineContainer>
          </Path>
        );
      })}
    </Wrapper>
  );
};
export default Layers;

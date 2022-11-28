import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { DonutClipPath60 } from "index";

export const Infini = React.memo((): JSX.Element => {

  const Container = styled.div`
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 50% 50%;
    position: absolute;
    justify-self: center;
    margin: 0 auto;
    height: 25%;
    aspect-ratio: 1;
    overflow: visible;
    transform-style: preserve-3d;
  `;

  const Left = styled.div(({ deg }: { deg: number }) => {
    return css`
      position: absolute;
      justify-self: center;
      margin: 0 auto;
      margin-right: 75%;
      height: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
      transform-style: preserve-3d;
      transform: translate(0px, -0.5px) rotateX(1deg);
      background: conic-gradient(
        from 90deg,
        hsl(${deg}, 100%, 50%),
        hsl(${deg}, 100%, 100%),
        hsl(${deg}, 100%, 100%),
        hsl(${deg}, 0%, 50%),
        hsl(${deg}, 0%, 50%)
      );
      clip-path: url(#clip60);
    `;
  });
  const Right = styled.div(({ deg }: { deg: number }) => {
    return css`
      position: absolute;
      justify-self: center;
      margin: 0 auto;
      margin-left: 75%;
      height: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
      transform: translate(0px, 0.5px) rotateX(-1deg);
      background: conic-gradient(
        from 270deg,
        hsl(${deg}, 100%, 50%),
        hsl(${deg}, 100%, 0%),
        hsl(${deg}, 100%, 0%),
        hsl(${deg}, 0%, 50%),
        hsl(${deg}, 0%, 50%)
      );
      clip-path: url(#clip60);
    `;
  });
  return (
    <Container>
      <Clip60 />
      <Left deg={60} />
      <Right deg={60} />
    </Container>
  );
});

export default Infini;

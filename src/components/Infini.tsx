import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Infini = (): JSX.Element => {
  const Clip60 = (): JSX.Element => {
    return (
      <svg
        height="0"
        width="0"
        className="clip60"
        style={{ position: "absolute" }}
      >
        <defs>
          <clipPath id="clip60" clipPathUnits="objectBoundingBox">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.5 1C0.776142 1 1 0.776142 1 0.5C1 0.223858 0.776142 0 0.5 0C0.223858 0 0 0.223858 0 0.5C0 0.776142 0.223858 1 0.5 1ZM0.5 0.75C0.638071 0.75 0.75 0.638071 0.75 0.5C0.75 0.361929 0.638071 0.25 0.5 0.25C0.361929 0.25 0.25 0.361929 0.25 0.5C0.25 0.638071 0.361929 0.75 0.5 0.75Z"
            />
          </clipPath>
        </defs>
      </svg>
    );
  };

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
};

export default Infini;

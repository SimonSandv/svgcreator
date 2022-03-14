import React from "react";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/react";

const SharedGradient = (): JSX.Element => {
  return (
    <Global
      styles={css`
        .gradient1 {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          &:before {
            content: "";
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #4d4855;
            background-image: linear-gradient(90deg, #476083 0%, #6d8bb0 100%);
          }
        }
        .gradient2 {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          &:before {
            content: "";
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #4d4855;
            background-image: linear-gradient(45deg, #253855 0%, #224669 100%);
          }
        }
        .gradient3 {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          &:before {
            content: "";
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #4d4855;
            background-image: linear-gradient(90deg, #445d82 0%, #2c3c59 100%);
          }
        }
      `}
    />
  );
};
export default React.memo(SharedGradient);

import React from "react";

export const DonutClipPath75 = (): JSX.Element => {
  return (
    <svg
      height="0"
      width="0"
      className="clip75"
      style={{ position: "absolute" }}
    >
      <defs>
        <clipPath id="clip75" clipPathUnits="objectBoundingBox">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.5 1
            C0.776142 1 1 0.776142 1 0.5
            C1 0.223858 0.776142 0 0.5 0
            C0.223858 0 0 0.223858 0 0.5
            C0 0.776142 0.223858 1 0.5 1Z
            M0.5 0.875C0.707107 0.875 0.875 0.707107 0.875 0.5
            C0.875 0.292893 0.707107 0.125 0.5 0.125
            C0.292893 0.125 0.125 0.292893 0.125 0.5
            C0.125 0.707107 0.292893 0.875 0.5 0.875Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DonutClipPath75;

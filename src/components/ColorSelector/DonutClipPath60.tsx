import React from "react";

export const DonutClipPath60 = React.memo((): JSX.Element => {
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
  });

export default DonutClipPath60;

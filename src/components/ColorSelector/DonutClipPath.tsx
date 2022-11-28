import React from "react";

export const DonutClipPath = (): JSX.Element => {
  return (
    <svg height="0" width="0" className="clip" style={{ position: "absolute" }}>
      <defs>
        <clipPath id="clip" clipPathUnits="objectBoundingBox">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.501221 1.00468C0.777374 1.00468 1.00122 0.780823 
              1.00122 0.504684C1.00122 0.228546 0.777374 0.00468445 0.501221 
              0.00468445C0.225067 0.00468445 0.0012207 0.228546 0.0012207 
              0.504684C0.0012207 0.780823 0.225067 1.00468 0.501221 
              1.00468ZM0.501221 0.879684C0.708313 0.879684 0.876221 
              0.711792 0.876221 0.504684C0.876221 0.297577 0.708313 
              0.129684 0.501221 0.129684C0.294128 0.129684 0.126221 
              0.297577 0.126221 0.504684C0.126221 0.711792 0.294128 
              0.879684 0.501221 0.879684Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DonutClipPath;

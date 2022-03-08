import React, { useEffect, useState } from "react";

const useBeforeRender = (
  callback?: (...args: any[]) => any,
  deps?: any
): any => {
  const [isRun, setIsRun] = useState(false);

  if (!isRun) {
    if (callback !== undefined) callback();
    setIsRun(true);
  }

  useEffect(() => {
    return () => {
      return setIsRun(false);
    };
  }, deps);
};

export default useBeforeRender;

// yourComponent.js
/* useBeforeRender(() => {
  return someFunc();
}, []); */

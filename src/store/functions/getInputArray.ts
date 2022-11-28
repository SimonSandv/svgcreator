import type { InputArray } from "types";

export const getInputArray = (
  func: string,
  previousArray: InputArray
): InputArray => {
  let newArray = previousArray;
  if (func === "m" || func === "l" || func === "t") {
    while (newArray.length < 2) {
      newArray.push({
        id: previousArray.length,
        relative: 0,
        absolute: 0,
      });
    }
    newArray = newArray.slice(0, 2);
  } else if (func === "h" || func === "v") {
    while (newArray.length < 1) {
      newArray.push({
        id: previousArray.length,
        relative: 0,
        absolute: 0,
      });
    }
    newArray = newArray.slice(0, 1);
  } else if (func === "c") {
    while (newArray.length < 6) {
      newArray.push({
        id: previousArray.length,
        relative: 0,
        absolute: 0,
      });
    }
    newArray = newArray.slice(0, 6);
  } else if (func === "s" || func === "q") {
    while (newArray.length < 4) {
      newArray.push({
        id: previousArray.length,
        relative: 0,
        absolute: 0,
      });
    }
    newArray = newArray.slice(0, 4);
  } else if (func === "a") {
    while (newArray.length < 7) {
      newArray.push({
        id: previousArray.length,
        relative: 0,
        absolute: 0,
      });
    }
    newArray = newArray.slice(0, 7);
  } else {
    newArray = [];
  }
  return newArray;
};
export default getInputArray;

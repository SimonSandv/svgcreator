export const slicer = (fn: string): number => {
  const string = fn.toLowerCase();
  if (string === "m" || string === "l" || string === "t") {
    return 2;
  }
  if (string === "h" || string === "v") {
    return 1;
  }
  if (string === "c") {
    return 6;
  }
  if (string === "s" || string === "q") {
    return 4;
  }
  if (string === "a") {
    return 7;
  }
  return 7;
};
export default slicer;

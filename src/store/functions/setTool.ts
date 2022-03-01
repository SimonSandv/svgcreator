import { Tool, toolArray } from "../../index";

export const setTool = (tool: string): Tool => {
  const abs = /\p{Lu}/u.test(tool);
  // console.log(abs);
  let index: number;
  if (tool === "m") {
    index = 0;
  } else if (tool.toLowerCase() === "l") {
    index = 1;
  } else if (tool.toLowerCase() === "h") {
    index = 2;
  } else if (tool.toLowerCase() === "v") {
    index = 3;
  } else if (tool.toLowerCase() === "c") {
    index = 4;
  } else if (tool.toLowerCase() === "s") {
    index = 5;
  } else if (tool.toLowerCase() === "q") {
    index = 6;
  } else if (tool.toLowerCase() === "t") {
    index = 7;
  } else if (tool.toLowerCase() === "a") {
    index = 8;
  } else if (tool.toLowerCase() === "z") {
    index = 9;
  } else {
    index = 0;
  }
  const newTool: Tool = {
    toolIndex: index,
    short:
      abs === true
        ? toolArray[index].short.toUpperCase()
        : toolArray[index].short.toLowerCase(),
    text: toolArray[index].text,
    description: toolArray[index].description,
    param: toolArray[index].param,
    rel: abs !== true,
  };
  return newTool;
};
export default setTool;

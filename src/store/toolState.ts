import { createEvent, createStore } from "effector";
import { RecursivePartial } from "../util/utilityTypes";
import { removeUndefined } from "../util/utilityFunctions";
import { toolArray } from "../index";

interface ParamInfo {
  name: string;
  description: string;
}

interface Tool {
  toolIndex: number;
  short: string;
  description: string;
  text: string;
  param: ParamInfo[];
  rel: boolean;
}

export type ToolState = {
  tool: {
    toolIndex: number;
    short: string;
    description: string;
    text: string;
    param: ParamInfo[];
    rel: boolean;
  };
  toolArray: Tool[];
};

export const setToolState = createEvent<RecursivePartial<ToolState>>();
export const updateTool = createEvent<{ tool: string }>();

export const $toolState = createStore<ToolState>({
  tool: {
    toolIndex: 0,
    short: "m",
    text: toolArray[0].text,
    description: toolArray[0].text,
    param: toolArray[0].param,
    rel: false,
  },
  toolArray,
})
  .on(setToolState, (state, payload) => {
    return { ...state, ...removeUndefined(payload) };
  })
  .on(updateTool, (state, { tool }) => {
    return {
      ...state,
      tool: setTool(tool),
    };
  });

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

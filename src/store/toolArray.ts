import type { ToolArray } from "../index";

export const toolArray: ToolArray = [
  {
    toolIndex: 0,
    short: "m",
    description: "Move current path position",
    text: "Move To",
    param: [
      { name: "x", description: "Position of end-point on X-Axis" },
      { name: "y", description: "Position of end-point on Y-Axis" },
    ],
    rel: false,
  },
  {
    toolIndex: 1,
    short: "l",
    description: "Create a line",
    text: "Line To",
    param: [
      { name: "x", description: "Position of end-point on X-Axis" },
      { name: "x", description: "Position of end-point on Y-Axis" },
    ],
    rel: false,
  },
  {
    toolIndex: 2,
    short: "h",
    description: "Create a horizontal line",
    text: "H-Line",
    param: [{ name: "x", description: "Position of end-point on X-Axis" }],
    rel: false,
  },
  {
    toolIndex: 3,
    short: "v",
    description: "Create a vertical line",
    text: "V-Line",
    param: [{ name: "y", description: "Position of end-point on Y-Axis" }],
    rel: false,
  },
  {
    toolIndex: 4,
    short: "c",
    description: "Create a bezier curve",
    text: "Curve",
    param: [
      {
        name: "cx1",
        description: "Position of end-point's control point on X-Axis",
      },
      {
        name: "cy1",
        description: "Position of end-point's control point on Y-Axis",
      },
      {
        name: "cx2",
        description: "Position of start-point's control point on X-Axis",
      },
      {
        name: "cy2",
        description: "Position of start-point's control point on Y-Axis",
      },
      { name: "x", description: "Position of end-point on X-Axis" },
      { name: "y", description: "Position of end-point on Y-Axis" },
    ],
    rel: false,
  },
  {
    toolIndex: 5,
    short: "s",
    description: "Create a smooth bezier curve",
    text: "Smooth Curve",
    param: [
      { name: "x1", description: "Position of end-point on X-Axis" },
      { name: "y1", description: "Position of end-point on Y-Axis" },
      {
        name: "x2",
        description: "Position of end-point's control point on X-Axis",
      },
      {
        name: "y2",
        description: "Position of end-point's control point on Y-Axis",
      },
    ],
    rel: false,
  },
  {
    toolIndex: 6,
    short: "q",
    description: "Create a quadratic bezier curve",
    text: "Quadratic Curve",
    param: [
      { name: "x", description: "Position of end-point on X-Axis" },
      { name: "y", description: "Position of end-point on Y-Axis" },
      { name: "x", description: "Position of control point on X-Axis" },
      { name: "y", description: "Position of control point on Y-Axis" },
    ],
    rel: false,
  },
  {
    toolIndex: 7,
    short: "t",
    description: "Create a smooth quadratic bezier curve",
    text: "Smooth Quad-Curve",
    param: [
      { name: "x", description: "Position of end-point on X-Axis" },
      { name: "y", description: "Position of end-point on Y-Axis" },
    ],
    rel: false,
  },
  {
    toolIndex: 8,
    short: "a",
    description: "Create an elliptical arc",
    text: "Arc",
    param: [
      { name: "x", description: "Position of end-point on X-Axis" },
      { name: "y", description: "Position of end-point on Y-Axis" },
      { name: "x", description: "radius on X-Axis" },
      { name: "y", description: "radius on Y-Axis" },
      { name: "rotation", description: "Degree rotation of the ellipse" },
      {
        name: "largeArcFlag",
        description:
          "Boolean flag to determine if arc is larger than 180 degrees",
      },
      {
        name: "sweepFlag",
        description: "Boolean for positive or negative angle rotation",
      },
    ],
    rel: false,
  },
  {
    toolIndex: 9,
    short: "z",
    description: "Close the current path",
    text: "Close Path",
    param: [{ name: "", description: "" }],
    rel: false,
  },
];

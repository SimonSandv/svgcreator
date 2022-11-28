// MATH UTILS

/**
 * (Math.Sin / 180) * Math.PI
 * @param value - Value to be calculated
 */
export const sin = (value: number): number => {
  return -Math.sin((value / 180) * Math.PI);
};

/**
 * (Math.Cos / 180) * Math.PI
 * @param value - Value to be calculated
 */
export const cos = (value: number): number => {
  return Math.cos((value / 180) * Math.PI);
};

/**
 * Clamps the x to be between a and b.
 * @param value - Value to be clamped.
 * @param min - Minimum value
 * @param max - Maximum value.
 */
export const clamp = (value: number, min = 0, max = 1): number => {
  return Math.min(max, Math.max(min, value));
};

/**
 * Linear interpolation
 * @param x - x
 * @param y - y
 * @param value - Value to be calculated
 */
export const lerp = (x: number, y: number, value: number): number => {
  return x * (1 - value) + y * value;
};

/**
 * inverse linear interpolation
 * @param x - x
 * @param y - y
 * @param value - Value to be calculated
 */
export const invlerp = (x: number, y: number, value: number): number => {
  return clamp((value - x) / (y - x));
};

/**
 * Interpolates one range of values to a different range of values.
 * @param inputMin - Minimum input value.
 * @param inputMax - Maximum input value.
 * @param outputMin - Minimum value of output range
 * @param outputMax - Maximum value of output range.
 * @param input - The value to be assigned to the new range.
 */
export const range = (
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
  input: number
): number => {
  return lerp(outputMin, outputMax, invlerp(inputMin, inputMax, input));
};

/**
 * Resolve degree and diameter to x, y point.
 * @param degree - Minimum input value.
 * @param diameter - Maximum input value.
 * @returns `position` object containing `.x` and `.y` value.
 */
export const resolveToPoint = (
  degree: number,
  diameter: number,
  flip: boolean = false
): {x: number, y: number} => {
  const rad = (Math.PI * degree) / 180;
  const r = diameter / 2;
  const position: {x: number, y: number} = {
    x: r * (flip ? Math.sin(rad) : Math.cos(rad)),
    y: r * (flip ? Math.cos(rad) : Math.sin(rad)),
  };
  return position;
};

export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const angleInRadians = (angleInDegrees: number): number => {
  return (angleInDegrees - 90) * (Math.PI / 180.0);
};

export const getPointsOnCircumference = (
  numPoints: number,
  totalDeg: number,
  radius: number,
  center: { x: number; y: number },
  startDegree: number = 0,
  offset: number = 0
): { x: number; y: number }[] => {
  const result: { x: number; y: number }[] = [];
  for (
    let a = startDegree, i = 0;
    i < numPoints;
    a += totalDeg / numPoints, i += 1
  ) {
    result.push(polarToCartesian(center.x, center.y, radius, a + offset));
  }
  return result;
};

/**
 * Resolve two pairs of `x`, `y` coordiantes to degrees.
 * @param x - x value of start point.
 * @param y - y value of start point.
 * @param x1 - x value of end point.
 * @param y1 - y value of end point.
 * @returns `position` object containing `.x` and `.y` value.
 */
export const pointToDegree = (
  x: number,
  y: number,
  x1: number,
  y1: number
): number => {
  const deltaX = x1 - x;
  const deltaY = y1 - y;
  const radians = Math.atan2(deltaY, deltaX);
  return radians * (180 / Math.PI);
};

export const AngleFromPoints = ({
  origin,
  from,
  to,
  deg,
}: {
  origin: { x: number; y: number };
  from: { x: number; y: number };
  to: { x: number; y: number };
  deg: boolean;
}): number => {
  const v1 = from;
  const v2 = { x: to.x - origin.x, y: to.y - origin.y };
  const rad = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
  return parseInt((deg ? rad * (180 / Math.PI) : rad).toFixed(2), 10);
};

export const findDegree = (x: number, y: number): number => {
  let val = (Math.atan2(x, y) / Math.PI) * 180;
  if (val < 0) {
    val += 360;
  }
  return val;
};
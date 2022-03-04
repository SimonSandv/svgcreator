import convert from "color-convert";

/**
 * Prevent default on non-numeric key events
 * @param event - KeyboardEvent
 */
export const numOnly = (event: any): void => {
  if (
    !(
      event.key === "0" ||
      event.key === "1" ||
      event.key === "2" ||
      event.key === "3" ||
      event.key === "4" ||
      event.key === "5" ||
      event.key === "6" ||
      event.key === "7" ||
      event.key === "8" ||
      event.key === "9" ||
      event.key === "-" ||
      event.key === "."
    ) ||
    event.key === "Enter"
  ) {
    event.preventDefault();
  }
  if (event.key === ",") {
    // eslint-disable-next-line no-param-reassign
    event.target.value += ".";
  }
};

export const testCasing = (s: string): boolean => {
  return /\p{Lu}/u.test(s);
};

/* eslint-disable no-param-reassign */
export function changeColorLuminance(hex: string, lum: number): string {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  // lum = lum || 0;

  // convert to decimal and change luminosity
  let rgb = "#";
  let c;
  let i;
  for (i = 0; i < 3; i += 1) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += `00${c}`.substr(c.length);
  }
  return rgb;
}
/* eslint-enable no-param-reassign */

export const getColorShades = (
  colors: string[],
  difference: number[],
  shades: "shadow" | "highlight" | "both" = "both",
  additive: boolean = true,
  setToCSSVar: boolean = false,
  type: "hex" | "hsl" | "rgb" = "hex",
  node: HTMLElement = document.documentElement
): {
  base: string;
  darker?: string[];
  lighter?: string[];
}[] => {
  const result: { base: string; darker?: string[]; lighter?: string[] }[] = [];
  for (let i = 0; i < colors.length; i += 1) {
    const darker: string[] = [];
    const lighter: string[] = [];
    if (setToCSSVar === true) {
      node.style.setProperty(
        `--color${i}`,
        type === "rgb"
          ? `rgb(${convert.hex.rgb(colors[i]).join(", ")})`
          : type === "hsl"
          ? `hsl(${convert.hex.hsl(colors[i]).join("%, ").replace("%", "")}%)`
          : colors[i]
      );
    }
    if (shades === "shadow" || shades === "both") {
      for (let n = 0; n < difference.length; n += 1) {
        darker.push(
          changeColorLuminance(
            additive === true || n === 0 ? colors[i] : darker[n - 1],
            difference[n] * -1
          )
        );
        if (setToCSSVar === true) {
          node.style.setProperty(
            `--color${i}D${n}`,
            type === "rgb"
              ? `rgb(${convert.hex.rgb(darker[darker.length - 1]).join(", ")})`
              : type === "hsl"
              ? `hsl(${convert.hex
                  .hsl(darker[darker.length - 1])
                  .join("%, ")
                  .replace("%", "")}%)`
              : colors[i]
          );
        }
      }
    }
    if (shades === "highlight" || shades === "both") {
      for (let n = 0; n < difference.length; n += 1) {
        lighter.push(
          changeColorLuminance(
            additive === true || n === 0 ? colors[i] : lighter[n - 1],
            difference[n]
          )
        );
        if (setToCSSVar === true) {
          node.style.setProperty(
            `--color${i}L${n}`,
            type === "rgb"
              ? `rgb(${convert.hex
                  .rgb(lighter[lighter.length - 1])
                  .join(", ")})`
              : type === "hsl"
              ? `hsl(${convert.hex
                  .hsl(lighter[lighter.length - 1])
                  .join("%, ")
                  .replace("%", "")}%)`
              : colors[i]
          );
        }
      }
    }
    if (type === "hsl") {
      darker.forEach((v, x, a) => {
        a[x] = `hsl(${convert.hex.hsl(v).join("%, ").replace("%", "")}%)`; //eslint-disable-line
      });
      lighter.forEach((v, x, a) => {
        a[x] = `hsl(${convert.hex.hsl(v).join("%, ").replace("%", "")}%)`; //eslint-disable-line
      });
    }
    if (type === "rgb") {
      result[i].base = `rgb(${convert.hex.rgb(result[i].base).join(", ")})`;
      darker.forEach((v, x, a) => {
        a[x] = `rgb(${convert.hex.rgb(v).join(", ")})`; //eslint-disable-line
      });
      lighter.forEach((v, x, a) => {
        a[x] = `rgb(${convert.hex.rgb(v).join(", ")})`; //eslint-disable-line
      });
    }
    result[i] = {
      base:
        type === "rgb"
          ? `rgb(${convert.hex.rgb(colors[i]).join(", ")})`
          : type === "hsl"
          ? `hsl(${convert.hex.hsl(colors[i]).join("%, ").replace("%", "")}%)`
          : colors[i],
      darker: darker.length !== 0 ? [...darker] : undefined,
      lighter: lighter.length !== 0 ? [...lighter] : undefined,
    };
  }
  return result;
};

export function getContrast(hex: string): string {
  const r = parseInt(hex.substring(1, 2), 16);
  const g = parseInt(hex.substring(3, 2), 16);
  const b = parseInt(hex.substring(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#001f3f" : "#F6F5F7";
}

export const hexIsValidColor = (hex: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(hex);
};

export const getColorFromRoute = (): string | null | undefined => {
  if (window.location.hash) {
    if (/^#[0-9A-F]{6}$/i.test(window.location.hash)) {
      return window.location.hash;
    }
  }
  return null;
};

export const camelize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) { //eslint-disable-line
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const HSLAvalueToString = (
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number
): string => {
  return `hsl(${137.5 * hue}deg, ${saturation}%, ${lightness}%, ${alpha}% )`;
};
export const HSLAGoldenValueToString = (
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number
): string => {
  return `hsl(${hue}deg, ${saturation}%, ${lightness}%, ${alpha}% )`;
};

export const getArguments = (func: Function): string[] | undefined => { //eslint-disable-line
  if (func !== null) {
    return new RegExp(`(?:${func.name}\\s*|^)\\s*\\((.*?)\\)`)
      .exec(func.toString().replace(/\n/g, ""))![1]
      .replace(/\/\*.*?\*\//g, "")
      .replace(/ /g, "")
      .split(",");
  }
};

export function index(this: any): number | undefined {
  return this !== undefined || this !== null ? this.index : undefined;
}

export function time(): number {
  return new Date().getTime();
}

/* eslint-disable no-param-reassign */
export const setCSSVar = (
  variable: string,
  value: string | null,
  target?: HTMLElement
): void => {
  if (target === undefined) {
    target = document.documentElement;
  }
  target.style.setProperty(variable, value);
};
/* eslint-enable no-param-reassign */

export const getStyle = (
  query: string,
  parent?: HTMLElement
): CSSStyleDeclaration => {
  const node =
    parent !== undefined
      ? (parent as Element)
      : (document.documentElement as Element);
  return getComputedStyle(
    node.querySelector(query !== null ? query : ":root")!
  );
};

export const setStyle = (target: HTMLElement, value: string): void => {
  if (target.shadowRoot !== null) {
    target.shadowRoot.styleSheets[0].insertRule(value);
  }
  throw new Error("setStyle() is missing target");
};

export const removeUndefined = (object: any): any => {
  const obj = object;
  Object.entries(obj).forEach(([k, v]) => {
    if (v && typeof v === "object") removeUndefined(v);
    if (
      (v && typeof v === "object" && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      (v as string[]).length === 0
    ) {
      if (Array.isArray(obj)) obj.splice(k, 1);
    }
  });
  return obj;
};

// eslint-disable-next-line
// @ts-ignore
type RecursiveObj = Record<string, RecursiveObj | string | number | boolean>;

export const recursiveFlatten = (
  item: Record<string, RecursiveObj | string | number | boolean>,
  path: string[] = []
): {
  item: string | number | boolean;
  path: string;
}[] => {
  return typeof item === "object" && item
    ? Object.entries(item).flatMap(([key]) => {
        return recursiveFlatten(item[key], [...path, key]);
      })
    : [{ item, path: path.join(".") }];
};

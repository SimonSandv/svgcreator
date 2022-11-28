import convert from "color-convert";

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

type ColorShades = {
  base: string;
  darker?: string[];
  lighter?: string[];
};
export const getColorShades = (
  colors: string[],
  difference: number[],
  shades: "shadow" | "highlight" | "both" = "both",
  additive: boolean = true,
  setToCSSVar: boolean = false,
  type: "hex" | "hsl" | "rgb" = "hex",
  node: HTMLElement = document.documentElement
): ColorShades[] => {
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

type ColorTuple = [number, number, number];
export const hslToString = (arr: ColorTuple): string => {
  return `hsl(${arr[0]}, ${arr[1]}%, ${arr[2]}%)`;
};

export const rgbToString = (arr: ColorTuple): string => {
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
};

export const hslToArray = (color: string): ColorTuple => {
  return Array.from(
    color
      .replace(";", "")
      .replace("hsl(", "")
      .replace(")", "")
      .replace("%", "")
      .replace(" ", "")
      .split(","),
    (v) => {
      return parseInt(v, 10);
    }
  ) as ColorTuple;
};

export const rgbToArray = (color: string): ColorTuple => {
  return Array.from(
    color
      .replace(";", "")
      .replace("rgb(", "")
      .replace(")", "")
      .replace(" ", "")
      .split(","),
    (v) => {
      return parseInt(v, 10);
    }
  ) as ColorTuple;
};

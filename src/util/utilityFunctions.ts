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

export const camelize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) { //eslint-disable-line
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
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
      if (Array.isArray(obj)) obj.splice(k as unknown as number, 1);
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

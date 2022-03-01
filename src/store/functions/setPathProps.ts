import { Path } from "../../index";
import { PathProps } from "../typeDeclarations";

export function setPathProps(
  paths: Path[],
  pathIndex: number,
  props: PathProps
): Path[] {
  const withoutUndef = Object.keys(props).reduce((acc, key) => {
    return props[key as keyof PathProps] === undefined
      ? { ...acc }
      : { ...acc, [key]: props[key as keyof PathProps] };
  }, {});
  return paths.map((path, pathMapIndex) => {
    return {
      ...path,
      attr:
        pathIndex === pathMapIndex
          ? { ...path.attr, ...withoutUndef }
          : path.attr,
    };
  });
}
export default setPathProps;

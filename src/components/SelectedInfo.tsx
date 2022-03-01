import React, { useState } from "react";
import styled from "@emotion/styled";
import { useStore } from "effector-react";
import { $selectedState, $store } from "../index";
import { Obj } from "../util/utilityTypes";

const Container = styled.div``;
const Item = styled.div``;
const Info = styled.div`
  background-color: lightBlue;
`;
const Label = styled.div`
  background-color: lightGray;
`;
const Wrapper = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 1em;
`;

/* type MappedTransform<T, U = any> = {
  [K in keyof T]?: T[K] extends object
    ? MappedTransform<T[K], U>
    : T[K] extends U
    ? T[K]
    : never;
};
 */

// eslint-disable-next-line
// @ts-ignore
type RecursiveObj = Record<string, RecursiveObj | string | number | boolean>;

const reduceObject = ({
  ins,
  key,
}: {
  ins: RecursiveObj;
  key?: string;
}): any[] => {
  const resultArray: RecursiveObj[] = [];
  Object.entries(ins).forEach(([k, v]) => {
    if (typeof v !== "object") {
      //
    } else {
      // reduceObject([k, v] as Record<string, unknown>);
    }
  });
  return resultArray;
};
// console.log(input);

const recursiveFlatten = (
  item: RecursiveObj,
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

const SelectedInfo = (): JSX.Element => {
  const store = useStore($store);
  const selected = useStore($selectedState);
  const { pathIndex, lineIndex } = selected;
  const result = recursiveFlatten(
    store.paths[pathIndex].lines[lineIndex].param
  );
  const reduce = reduceObject({
    ins: store.paths[pathIndex].lines[lineIndex].param,
  });

  return (
    <Wrapper>
      {result.map((k, v) => {
        return (
          <Item>
            <Label>{k.path}</Label>
            <Info>{JSON.stringify(k.item, null)}</Info>
          </Item>
        );
      })}
    </Wrapper>
  );
};

export default SelectedInfo;

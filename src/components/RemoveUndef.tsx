import React, { useState } from "react";
import styled from "@emotion/styled";
import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";
import { $store } from "../index";
import type { Obj } from "../util/utilityTypes";

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

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

const testObj: {
  someString: string;
  someNum: number;
  someBool: boolean;
  someObj: Record<string, unknown>;
  someUndef: undefined;
  someArray: any[];
} = {
  someString: "hello",
  someNum: 3,
  someBool: false,
  someObj: { daughter: 0, son: { cat: 3, dog: undefined } },
  someUndef: undefined,
  someArray: [{ someSay: "hi" }, { nestedUndef: true }],
};
type TestObj = typeof testObj;
const stateSet = createEvent<RecursivePartial<TestObj>>();
// const stateSet = createEvent<TestObj>();
const $testObj = createStore<TestObj>(testObj).on(
  stateSet,
  (state, payload) => {
    // console.log("payload", payload);
    const noUndef = remove2(payload);
    console.log({ ...state, ...noUndef });
    return { ...state, ...noUndef };
  }
);

const remove = (item: any, name: string): any => {
  console.log(typeof item);
  if (typeof item === "object") {
    console.log(name, "is typeof 'object'");
    const entries = Object.entries(item);
    const filtered = entries.filter((val) => {
      if (val[1] === undefined) {
        console.log(val[0], "is undefined. removing...");
        return 0;
      }
      return 1;
    });
    return filtered.forEach(([k, v]) => {
      return remove(v, k);
    });
  }
  if (Array.isArray(item)) {
    console.log("Array Detected");
    item.forEach(([k, v]) => {
      return [k, remove(v, k)];
    });
  }
};

export const remove2 = (object: any): any => {
  const obj = object;
  Object.entries(obj).forEach(([k, v]) => {
    if (v && typeof v === "object") remove2(v);
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

export const RemoveUndef = React.memo((): JSX.Element => {
  const testStore = useStore($testObj);

  return (
    <Wrapper>
      <Item>
        <Label>label</Label>
        <Info>{JSON.stringify(testStore, null, 2)}</Info>
      </Item>
      <button
        type="button"
        onClick={(): void => {
          stateSet({ someBool: true });
        }}
      >
        changeState
      </button>
    </Wrapper>
  );
});

export default RemoveUndef;

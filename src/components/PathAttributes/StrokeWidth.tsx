import React, { useState } from "react";
import { useStore, useStoreMap } from "effector-react";
import { createEvent, createEffect, createStore, sample } from "effector";
import styled from "@emotion/styled";
import {
  numOnly,
  $store,
  updatePathAttribute,
  updatePathProps,
} from "../../index";

const StrokeWidth = (): JSX.Element => {
  
  const store = useStoreMap({
    store: $store,
    fn: (state: State) => {
      return Result;
    },
  });
  
  // const [state, stateSet] = useState(0);
  // const { pathIndex } = store.selected;

  /* const Input = (): JSX.Element => {
    return (
      <input
        key="strokeWidthInput"
        onChange={(e) => {
          updatePathProps({ pathIndex, strokeWidth: e.target.value });
        }}
      />
    );
  }; */

  const sendFormFx = createEffect((params) => {
    console.log(params);
  });
  const onChange = createEvent();
  const setField = createEvent();
  $store.on(setField, (s, { key, value }) => {
    return {
      ...s,
      [key]: value,
    };
  });

  sample({ clock: onChange, source: $store });

  const handleChange = setField.prepend((e) => {
    console.log($store.getState());
    return {
      key: e.target.name,
      value: e.target.value,
    };
  });

  const Field = ({ name, type, label }) => {
    const value = useStoreMap({
      store: $store, // take $form's state
      keys: [name], // watch for changes of `name`
      fn: (values) => {
        return values[name] || "";
      }, // retrieve data from $form's state in this way (note: there will be an error, if undefined is returned)
    });

    return (
      <div>
        {label}{" "}
        <input
          name={name}
          type={type}
          value={value}
          onChange={handleChange /* note, bound event is here! */}
        />
      </div>
    );
  };

  return (
    <div>
      <label>
        StrokeWidth:
        <Field name="strokeWidth" label="strokeWidth" />
        {/* <Input /> */}
        <select
          key="strokeWidthSelect"
          defaultValue="%"
          onChange={(e) => {
            /* updatePathAttribute({
              pathIndex,
              strokeWidthOperand: e.target.value,
            }); */
          }}
        >
          <option value="px">px</option>
          <option value="%">%</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
        </select>
      </label>
    </div>
  );
};

export default StrokeWidth;

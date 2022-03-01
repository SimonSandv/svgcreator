// useForm.js
import React, { useState } from "react";

// Define the FormComponent outside of your useForm hook
const FormComponent = ({
  setState,
  state,
  label,
}: {
  setState: (e: string) => any;
  state: string | number | readonly string[] | undefined;
  label: string;
}): JSX.Element => {
  return (
    <form>
      <label htmlFor={label}>
        {label}
        <input
          type="text"
          id={label}
          value={state}
          placeholder={label}
          onChange={(e) => {
            return setState(e.target.value);
          }}
        />
      </label>
    </form>
  );
};

export default function useForm(
  defaultState: string | number | readonly string[] | undefined,
  label: string
): [
  string | number | readonly string[] | undefined,
  JSX.Element,
  React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >
] {
  const [state, setState] = useState(defaultState);
  return [
    state,
    <FormComponent state={state} setState={setState} label={label} />,
    setState,
  ];
}

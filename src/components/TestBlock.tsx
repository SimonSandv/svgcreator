import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useStore } from "effector-react";
import { $store } from "../store/store";

type Obj = { [k: string]: any };
// const TestBlock = ({ Obj }: { [k: string]: any }): JSX.Element => {
const Inner = React.memo((): JSX.Element => {
  const Container = styled.div`
    height: 100%;
    max-height: 100%;
    max-width: 100vw;
    padding: 0;
    padding-left: 25px;
    // overflow-y: scroll;
  `;
  const InputContainer = styled.div`
    display: flow-root;
    position: sticky;
    top: 0;
    padding: 0;
    margin-top: 0;
    margin: 0;
    width: 100%;
    // background-color: var(--color1);
  `;
  const Button = styled.button``;
  const Select = styled.select``;
  const Text = styled.div``;

  console.log("Inner rendered");
  const Obj = useStore($store) as Obj;
  const [keyArray] = useState<string[]>([]);
  const [current, currentSet] = useState(Obj);

  return (
    <Container>
      <InputContainer>
        <Button
          type="button"
          key="BackBtn"
          onClick={() => {
            keyArray.pop();
            currentSet(
              keyArray.reduce((o, i) => {
                return o[i];
              }, Obj)
            );
          }}
        >
          Back
        </Button>
        <Select
          onChange={(e) => {
            keyArray.push(e.target.value);
            currentSet(
              keyArray.reduce((o, i) => {
                return o[i];
              }, Obj)
            );
          }}
        >
          <option value="parent" key="optionnull">
            {" "}
          </option>
          {Object.entries(current).map(([k], i) => {
            return (
              <option value={k} key={`option${i!}`}>
                {k}
              </option>
            );
          })}
        </Select>
        {`${keyArray.join(".")}`}
      </InputContainer>
      <Text>
        <pre>
          <code>
            {JSON.stringify(
              keyArray.reduce((o, i) => {
                return o[i];
              }, Obj),
              null,
              2
            )}
          </code>
        </pre>
      </Text>
    </Container>
  );
});

export const TestBlock = React.memo((): JSX.Element => {
  console.log("testBlock Rendered");
  const Container = styled.div`
    height: 100%;
    width: 100%;
    // background-color: var(--color1);
    overflow-y: scroll;
  `;
  return (
    <Container className="TestBlock">
      <Inner />
    </Container>
  );
});
export default TestBlock;

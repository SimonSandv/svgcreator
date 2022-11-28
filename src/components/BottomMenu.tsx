import React, { useState } from "react";
import styled from "@emotion/styled";
import { Output, TestBlock, SelectedInfo, RemoveUndef } from "index";

export const BottomMenu = React.memo((): JSX.Element => {
  const [current, currentSet] = useState("state");

  const Container = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100%;
    padding-bottom: 25px;
    background-color: var(--color1);
    grid-area: b;
    background: linear-gradient(145deg, var(--color1) 0%, var(--color2) 73%);
    background-attachment: fixed;
  `;
  const TabBtnContainer = styled.div`
    padding-left: 25px;
    //background-color: var(--color1);
    border-bottom: 2px solid var(--color2);
  `;
  const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 0.5em;
    //background-color: var(--color1);
    display: relative;
  `;
  type BtnProps = {
    borderBtm: string;
  };
  const Tab = styled.button<BtnProps>`
    margin: 5px;
    margin-bottom: -2px;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
    //background-color: var(--color1);
    color: black;
    border: 2px solid var(--color2);
    border-bottom: ${(props: BtnProps) => {
      return props.borderBtm;
    }};
  `;
  const tabArray = ["state", "output", "selected", "remove"];
  return (
    <Container>
      <TabBtnContainer>
        {tabArray.map((v, i) => {
          return (
            <Tab
              key={`bottomMenu-tab-${tabArray[i]}`}
              borderBtm={
                current === v
                  ? "2px solid var(--color1)"
                  : "2px solid var(--color2);"
              }
              type="button"
              onClick={() => {
                currentSet(v);
              }}
            >
              {v}
            </Tab>
          );
        })}
      </TabBtnContainer>
      <ContentContainer>
        {current === "state" ? <TestBlock /> : null}
        {current === "output" ? <Output /> : null}
        {current === "selected" ? <SelectedInfo /> : null}
        {current === "remove" ? <RemoveUndef /> : null}
      </ContentContainer>
    </Container>
  );
});

export default BottomMenu;

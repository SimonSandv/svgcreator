import "./wdyr";
import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { createStore, createEvent } from "effector";
import styled from "@emotion/styled";
import "./styles/App.scss";
import {
  // STORE
  $store,
  // COMPONENTS
  handleAddPath,
  // PathElements,
  ToolButtons,
  ViewBoxInput,
  Editor,
  IndicatorSelector,
  Test,
  Info,
  RelToggle,
  ParamGrid,
  Output,
  PathAttributes,
  themeColors,
  changeTheme,
  MousePosition,
  TestBlock,
  InfoBlock,
  ToolInfo,
  BottomMenu,
  LineCapSelector,
  LineJoinSelector,
  StrokeWidth,
  StrokeColor,
  FillColor,
  // TYPES
} from "./index";
import ToolWidget from "./components/ToolWidget";

function App(): JSX.Element {
  console.log("app Rendered");
  useEffect(() => {
    handleAddPath($store.getState());
    themeColors();
  }, []); // eslint-disable-line
  return (
    <Main className="App" key="App">
      <TopMenu>
        <MousePosition />
        <ToolInfo />
      </TopMenu>
      <LeftMenu>
        <ViewBoxInput />
        <RelToggle />
        <IndicatorSelector />
        {/* <StrokeWidth /> */}
        {/* <PathAttributes /> */}
      </LeftMenu>
      <EditorContainer>
        <Editor />
        <ToolWidget />
      </EditorContainer>
      <RightMenu></RightMenu>
      <BottomMenu />
      {/* <div>
          <ViewBoxInput />
          <Test />
          <ToolButtons />
          <RelToggle />
          <IndicatorSelector />
          <PathElements />
          <ParamGrid />
          <Info />
        </div>
        <button
          type="button"
          onClick={() => {
            return handleAddPath(store);
          }}
        >
          {" "}
          Add Path{" "}
        </button> */}
      {/* <button
        type="button"
        onClick={() => {
          changeTheme({
            themeIndex: themeIndex < themes.length ? themeIndex + 1 : 0,
          });
        }}
      >
        COLOR
      </button> */}
    </Main>
  );
}

export default App;

const root = document.documentElement.style;
root.setProperty(`--topMenuHeight`, ` ${50}px`);
root.setProperty(`--bottomMenuHeight`, ` ${200}px`);
root.setProperty(`--leftMenuWidth`, ` ${50}px`);
root.setProperty(`--RightMenuWidth`, ` ${50}px`);

const Main = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: var(--color0);
  display: grid;
  grid-template-areas:
    "t t t"
    "l e r"
    "b b b";
  grid-template-rows: var(--topMenuHeight) auto var(--bottomMenuHeight);
  grid-template-columns: var(--leftMenuWidth) auto var(--rightMenuWidth);
`;

const TopMenu = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color2);
  display: flex;
  grid-area: t;
`;

const LeftMenu = styled.div`
  width: 100%;
  height: 100%;
  max-width: 300px;
  background-color: var(--color1);
  grid-area: l;
  // border: 1px solid green;
`;

const RightMenu = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color1);
  grid-area: r;
`;

/* const BottomMenu = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color1);
  grid-area: b;
`; */

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

import "./wdyr";
import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { createStore, createEvent } from "effector";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import "./styles/App.scss";
import "./styles/reset.scss";
import {
  // STORE
  $store,
  $themeState,
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
  changeTheme,
  MousePosition,
  TestBlock,
  InfoBlock,
  ToolInfo,
  BottomMenu,
  LeftMenu,
  RightMenu,
  TopMenu,
  LineCapSelector,
  LineJoinSelector,
  StrokeWidth,
  StrokeColor,
  FillColor,
  getColorShades,
  // TYPES
} from "./index";
import SharedGradient from "./components/SharedGradient";
import ToolWidget from "./components/ToolWidget";
import getFont from "./styles/getFont";
import { shadow2inner } from "./styles/styles";

function App(): JSX.Element {
  console.log("app Rendered");
  useEffect(() => {
    handleAddPath($store.getState());
    getColorShades(
      $themeState.getState().themes[$themeState.getState().themeIndex],
      [0.02, 0.05],
      "both",
      false,
      true,
      "hsl"
    );
  }, []); // eslint-disable-line
  return (
    <Main className="App" key="App">
      <SharedGradient />
      <TopMenu />
      <LeftMenu />
      <EditorWrapper>
        <EditorContainer>
          <Editor />
          <ToolWidget />
        </EditorContainer>
      </EditorWrapper>
      <RightMenu />
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
  ${getFont(4, 300)}
`;

const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5em;
  ${shadow2inner}
`;

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid red;
`;

import React from "react";
import { useStore } from "effector-react";
import styled from "@emotion/styled";
import {
  $store,
  handleMouseMove,
  Grid,
  PointIndicators,
  Preview,
  eventBinder,
  RenderGuides,
  setHover,
  $selectedState,
  $viewBoxState,
} from "../index";

const Editor = (): JSX.Element => {
  const store = useStore($store);
  const { mode } = useStore($selectedState);
  const viewBoxState = useStore($viewBoxState);
  const viewBox = [
    viewBoxState.x.toString(),
    viewBoxState.y.toString(),
    viewBoxState.width.toString(),
    viewBoxState.height.toString(),
  ].join(" ");
  return (
    <SVG
      id="editor"
      className="editor"
      viewBox={viewBox}
      tabIndex={1} // eslint-disable-line
      onMouseMove={(event) => {
        handleMouseMove(store, event);
      }}
      onMouseDown={(event) => {
        eventBinder({ store, mouseEvent: event });
      }}
      onMouseUp={(event) => {
        eventBinder({ store, mouseEvent: event });
      }}
      onMouseEnter={() => {
        setHover({ hover: true });
      }}
      onMouseLeave={() => {
        setHover({ hover: false });
      }}
      onKeyPress={(event) => {
        event.preventDefault();
      }}
      onKeyDown={(event) => {
        event.preventDefault();
      }}
      onKeyUp={(event) => {
        eventBinder({ store, keyboardEvent: event });
        event.preventDefault();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <Grid />
      {mode === "line" ? (
        <>
          <Preview />
          <PointIndicators />
        </>
      ) : null}
      {store.paths.map((path) => {
        const { attr } = path;
        return (
          <Path
            d={path.data}
            className="paths"
            id={`path${path.pathIndex}`}
            key={`${path.pathIndex}`}
            {...attr}
          />
        );
      })}
      <RenderGuides />
    </SVG>
  );
};
export default Editor;

const SVG = styled.svg`
  outline: none;
  margin: 0;
  transition-property: none;
`;

const Path = styled.path``;

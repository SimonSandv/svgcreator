import React from "react";
import { useStore } from "effector-react";
import styled from "@emotion/styled";
import {
  $store,
  LineCapSelector,
  LineJoinSelector,
  StrokeWidth,
  StrokeColor,
  FillColor,
  $selectedState,
} from "index";
import useForm from "./PathAttributes/FormComponent";

export const PathAttributes = React.memo((): JSX.Element | null => {
  const selected = useStore($selectedState);
  const Container = styled.div`
    width: 100%;
    padding: 25px;
    border: 1px solid red;
  `;
  return (
    <Container>
      {selected.pathIndex !== -1 ? (
        <>
          <StrokeWidth />
          {/*           <StrokeColor pathIndex={pathIndex} />
          <FillColor pathIndex={pathIndex} />
          <LineCapSelector pathIndex={pathIndex} />
          <LineJoinSelector pathIndex={pathIndex} /> */}
        </>
      ) : null}
    </Container>
  );
});
export default PathAttributes;

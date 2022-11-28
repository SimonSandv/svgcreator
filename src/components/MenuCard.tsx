import React from "react";
import styled from "@emotion/styled";
import {
  shadow1,
  shadow2,
  border,
  overlayShadow,
  backdrop,
} from "../styles/styles";

export const MenuCard = React.memo(
  ({
    ...props
  }: {
    title: string;
    children?: React.ReactNode;
  }): JSX.Element => {
    const Container = styled.div`
      position: relative;
      margin-bottom: 2em;
      border-radius: 10px;
      background-color: #485461;
      background-image: linear-gradient(315deg, #485461 0%, #28313b 74%);

      ${shadow2}
    `;

    const Card = styled.div`
      width: 100%;
      padding: 1em;
      padding-top: 0.3em;
      display: block;
      text-align: center;
      align-items: center;
      justify-content: center;
      border: 2px solid transparent;
      border-radius: 10px;
      margin-bottom: 1em;
      // background-color: var(--color1);
    `;
    const Title = styled.h3`
      color: silver;
      margin-bottom: 0.5em;
    `;
    const ChildContainer = styled.div`
      //border: 1px solid green;
      position: relative;
      display: relative;
      // justify-content: center;
    `;
    const Border = styled.div`
      ${border}
    `;
    const Backdrop = styled.div`
      ${backdrop}
    `;
    return (
      <Container>
        <Border />
        <Backdrop>
          <Card>
            <Title>{props.title}</Title>
            <ChildContainer>{props.children}</ChildContainer>
          </Card>
        </Backdrop>
      </Container>
    );
  }
);

export default MenuCard;

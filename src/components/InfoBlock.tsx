import React from "react";
import styled from "@emotion/styled";

export const InfoBlock = React.memo(
  ({
    items,
    label,
    className,
  }: {
    items: {
      label: string;
      value: string | number | boolean;
      className: string;
    }[];
    label?: string;
    className: string;
  }): JSX.Element => {
    return (
      <Wrapper>
        <Container className={`infoBlock ${className}`} key="infoBlock">
          {label !== undefined ? (
            <Label
              className={`infoBlock-label ${className}`}
              key={`infoBlock-label ${className}`}
            >
              {label}
            </Label>
          ) : null}
          <ItemWrapper>
            {items.map((item) => {
              return (
                <ItemContainer
                  className="infoBlock-itemContainer"
                  key={`infoBlock-ItemContainer${item.className}`}
                >
                  <ItemLabel
                    className="infoBlock-itemLabel"
                    key={`infoBlock-itemLabel ${item.className}`}
                  >
                    {item.label}
                  </ItemLabel>
                  <Item
                    className={`infoBlock-item ${className}`}
                    key={`infoBlock-item ${item.className}`}
                  >
                    {item.value}
                  </Item>
                </ItemContainer>
              );
            })}
          </ItemWrapper>
        </Container>
      </Wrapper>
    );
  }
);
export default InfoBlock;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1em;
  padding-right: 1em;
  height: 100%;
  width: auto;
  min-height: 50px;
  // border: 1px solid green;
`;

const Label = styled.span`
  display: inline-block;
  margin-right: 1em;
  font-size: 0.8em;
  //border: 1px solid yellow;
`;

const ItemWrapper = styled.div`
  display: inline-block;
  //border: 1px solid red;
`;

const ItemContainer = styled.div`
  padding: 0.2em;
  display: block;
  font-size: 0.8em;
  //border: 1px solid orange;
`;

const Item = styled.div`
  display: inline-block;
  //border: 1px solid yellow;
`;

const ItemLabel = styled.span`
  margin-right: 0.5em;
  display: inline-block;
  //border: 1px solid yellow;
`;

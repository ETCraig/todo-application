import React from "react";

import Button from "./Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { Col } from "react-bootstrap";

export const CompleteButton = styled(Button)`
  width: 80%;
  // opacity: 0.7;
  position: absolute;
  top: 255px;
  // display: none;
  @media screen and (max-width: 800px) {
    display: block;
    opacity: 0.9;
    min-width: unset;
    padding: 0 10px;
  }
`;

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
`;

export const CartItemImage = styled.i`
  width: 30%;
`;

export const ItemDetailsContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
`;

const StyledCard = styled(Card)`
  margin-top: 35px;
  min-width: 100%;
  max-width: 100;
`;

const Todo = ({ todo, complete }) => {
  const { name } = todo;
  return (
    <Col>
      <StyledCard>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
          <Card.Text>{todo.details}</Card.Text>
          {/* <Card.Link href="#">
            <CartItemImage className="fas fa-edit" />
          </Card.Link> */}
            <Button onClick={() => complete(todo)}>Complete</Button>
        </Card.Body>
      </StyledCard>
    </Col>
  );
};

export default Todo;

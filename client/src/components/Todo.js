import React, { useEffect, useState } from "react";

import Button from "./Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import Input from "./Input";
import styled from "styled-components";

const EditButton = styled(Button)`
  min-width: 0px !important;
  max-width: 10% !important;
  border-radius: 50%;
  align-items: center;
  margin-right: 5px;
`;

const StyledCard = styled(Card)`
  margin-top: 35px;
  min-width: 100%;
  max-width: 100;
`;

const Todo = ({ todo, complete, handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoCopy, setTodoCopy] = useState(null);

  const { name, details } = todo;

  useEffect(() => {
    setTodoCopy(todo);
  }, [todo]);

  const handleChange = (e) => {
    setTodoCopy({ ...todoCopy, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(todoCopy);
    setIsEditing(false);
  };
  return (
    <Col>
      <StyledCard>
        <Card.Body>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <Card.Title>
                <Input
                  name="name"
                  type="name"
                  value={todoCopy.name}
                  handleChange={handleChange}
                  label="name"
                  required
                />
              </Card.Title>
              <Card.Text>
                <Input
                  name="details"
                  type="details"
                  value={todoCopy.details}
                  handleChange={handleChange}
                  label="details"
                />
              </Card.Text>
              <Button type="submit" disabled={!todoCopy.name.length}>
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </form>
          ) : (
            <>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {details}
              </Card.Subtitle>
              <Row>
                <EditButton onClick={() => setIsEditing(true)}>
                  <i className="fas fa-edit" />
                </EditButton>
                <Button onClick={() => complete(todo)}>Complete</Button>
              </Row>
            </>
          )}
        </Card.Body>
      </StyledCard>
    </Col>
  );
};

export default Todo;

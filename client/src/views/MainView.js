import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import { Modal } from "react-bootstrap";
import Todo from "../components/Todo";
import { useAuth } from "../context/authContext";
import { Row } from "react-bootstrap";

export const OptionButton = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  color: black;
`;

const MainView = () => {
  const auth = useAuth();

  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({ name: "", details: "" });

  const { name, details } = credentials;

  useEffect(() => {
    async function getData() {
      let token = localStorage.getItem("token");
      let id = auth.getUserId();

      let requestBody = {
        query: `
            query {
                getTodos(id: "${id.id}") {
                    id, account, name, active, todos {
                        name, details, active
                    }
                }
            }
        `,
      };

      const response = await axios.post(
        "/graphql",
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      setTodos(response.data.data.getTodos);
    }

    getData();
  }, []);

  const completeTodo = async (todo) => {
    let stateCopy = todos;
    let token = localStorage.getItem("token");

    let todosArray = todo.todos.length ? todo.todos : [];
    let requestBody = {
      query: `
          mutation {
            updateTodo(
                updateInput: {
                    id: "${todo.id}"
                    name: "${todo.name}"
                    details: "${todo.details}"
                    active: ${false}
                    todos: [${todosArray}]
                }) {
                  id, account, name, active, todos {
                    name, details, active
                }
            }
        }
      `,
    };

    const response = await axios.post("/graphql", JSON.stringify(requestBody), {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    stateCopy = stateCopy.filter(
      (x) => x.id !== response.data.data.updateTodo.id
    );

    setTodos(stateCopy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let id = await auth.getUserId();
    let requestBody = {
      query: `
      mutation {
        createTodo(
            todoListInput: {
                account: "${id.id}"
                name: "${name}",
                details: "${details}"
              }) {
                id,
                account,
                name,
                active,
              }
            }
          `,
    };

    const response = await axios.post("/graphql", JSON.stringify(requestBody), {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    setTodos((todos) => [...todos, response.data.data.createTodo]);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            name="name"
            type="name"
            value={name}
            handleChange={handleChange}
            label="name"
            required
          />
          <Input
            name="details"
            type="details"
            value={details}
            handleChange={handleChange}
            label="details"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button disabled={!name || !details} onClick={(e) => handleSubmit(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <OptionButton as="div" onClick={() => setShowModal(true)}>
        <h5>Create Task <i className="far fa-plus-square"></i></h5>
      </OptionButton>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {todos.length ? (
          todos.map((todo) => (
            <Todo todo={todo} complete={completeTodo} key={todo.id} />
          ))
        ) : (
          <>Please Create a New Task!</>
        )}
      </Row>
    </div>
  );
};

export default MainView;

import React, { useEffect, useState } from "react";

import axios from "axios";
import Input from "../components/Input";
import Modals from "../components/Modal";
import Todo from "../components/Todo";
import { useAuth } from "../context/authContext";
import { Row } from "react-bootstrap";
import styled from "styled-components";

const OptionButton = styled.div`
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
                    id, account, name, details, active, todos {
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
                details,
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

  const handleTodoUpdate = async (e) => {
    let stateCopy = todos;
    let token = localStorage.getItem("token");
    let todosArray = e.todos.length ? e.todos : [];

    let requestBody = {
      query: `
          mutation {
            updateTodo(
                updateInput: {
                    id: "${e.id}"
                    name: "${e.name}"
                    details: "${e.details}"
                    active: ${true}
                    todos: [${todosArray}]
                }) {
                  id, account, details, name, active, todos {
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

    let index = stateCopy.findIndex(
      (x) => x.id === response.data.data.updateTodo.id
    );

    stateCopy[index] = response.data.data.updateTodo;

    setTodos([...stateCopy]);
  };

  return (
    <div>
      <Modals
        title="Create Todo"
        show={showModal}
        onHide={() => setShowModal(false)}
        onCreate={handleSubmit}
        completeBtn="Save Changes"
        closeBtn="Close"
        size="md"
        body={
          <>
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
          </>
        }
      />
      <OptionButton as="div" onClick={() => setShowModal(true)}>
        <h5>
          Create Task <i className="far fa-plus-square"></i>
        </h5>
      </OptionButton>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {todos.length ? (
          todos.map((todo) => (
            <Todo
              todo={todo}
              complete={completeTodo}
              key={todo.id}
              handleUpdate={handleTodoUpdate}
            />
          ))
        ) : (
          <>Please Create a New Task!</>
        )}
      </Row>
    </div>
  );
};

export default MainView;

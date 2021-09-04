import React, { useState } from "react";

import Button from "./Button";
import Card from "react-bootstrap/Card";
import Input from "./Input";
import styled from "styled-components";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";

const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

const SignInTitle = styled.h2`
  margin: 10px 0;
`;

const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Login = () => {
  const auth = useAuth();
  const history = useHistory();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const { email, password } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.loginUser(email, password);
    history.push("/");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <Card.Body>
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            value={email}
            handleChange={handleChange}
            label="email"
            required
          />
          <Input
            name="password"
            type="password"
            value={password}
            handleChange={handleChange}
            label="password"
            required
          />
          <ButtonsBarContainer>
            <Button type="submit">Sign In</Button>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    </Card.Body>
  );
};

export default Login;

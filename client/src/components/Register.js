import React, { useState } from "react";

import Button from "./Button";
import Card from "react-bootstrap/Card";
import Input from "./Input";
import styled from "styled-components";
import { useAuth } from "../context/authContext";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
`;

export const SignUpTitle = styled.h2`
  margin: 10px 0;
`;

const Register = () => {
  const auth = useAuth();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords Don't Match!");
      return;
    }

    await auth.registerUser(firstName, lastName, password, email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <Card.Body>
      <SignUpContainer>
        <SignUpTitle>I do not have an account</SignUpTitle>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            label="First Name"
            required
          />
          <Input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            label="Last Name"
            required
          />
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Email"
            required
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
            required
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </SignUpContainer>
    </Card.Body>
  );
};

export default Register;

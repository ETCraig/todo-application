import React from "react";
import styled from "styled-components";

import Card from "react-bootstrap/Card";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthContainer = styled.div`
  width: 90vw;
  display: flex;
  justify-content: space-evenly;
  margin: 30px auto;

  @media screen and (max-width: 915px) {
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  @media screen and (max-width: 405px) {
    width: 50vw !important;
  }
`;

const StyledCard = styled(Card)`
  @media screen and (max-width: 915px) {
    margin-top: 35px;
  }
`;

const AuthView = () => {
  return (
    <AuthContainer>
      <Card>
        <Login />
      </Card>
      <StyledCard>
        <Register />
      </StyledCard>
    </AuthContainer>
  );
};

export default AuthView;

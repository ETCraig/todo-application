import React from "react";

import styled from "styled-components";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background: grey;
  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }
`;

export const LogoContainer = styled.div`
  height: 100%;
  width: 70px;
  padding: 25px;
  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 0;
  }
`;

export const OptionContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const OptionButton = styled.div`
  padding: 10px 15px;
  cursor: pointer;
`;

const Header = () => {
  const auth = useAuth();
  const history = useHistory();

  const logout = async () => {
    await auth.logout();
    history.push("/signIn");
  };

  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          <i className="far fa-list-alt"></i>
        </LogoContainer>
        <OptionContainer>
        </OptionContainer>
        <OptionContainer>
          {auth.isAuthenticated() && (
            <OptionButton as="div" onClick={() => logout()}>
              SIGN OUT
            </OptionButton>
          )}
        </OptionContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;

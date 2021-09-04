import React, { createContext, useContext } from "react";

import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";

const AUTHENTICATION_KEY = "token";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authentication, setAuthentication] =
    useLocalStorage(AUTHENTICATION_KEY);

  const history = useHistory();

  const isAuthenticated = () => {
    try {
      if (authentication) {
        jwt_decode(authentication);
        return true;
      } else if (localStorage.token) {
        setAuthentication(localStorage.token);
        jwt_decode(localStorage.token);
      }
    } catch (e) {}
    return false;
  };

  const getUserId = () => {
    try {
      return jwt_decode(authentication).account;
    } catch (e) {}
    return null;
  };

  const setAuth = async (auth) => {
    setAuthentication(auth);
    localStorage.setItem("token", auth);
  };

  const removeAuth = async (auth) => {
    setAuthentication(null);
    localStorage.removeItem("token");
  };

  const loginUser = async (email, password) => {
    let requestBody = {
      query: `
            query {
                loginUser(email: "${email}", password: "${password}") {
                    token
                }
            }
        `,
    };

    try {
      const response = await axios.post(
        "/graphql",
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAuth(response.data.data.loginUser.token);
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (firstName, lastName, password, email) => {
    let requestBody = {
      query: `
            mutation {
                registerUser(registerInput: {
                  firstName: "${firstName}",
                  lastName: "${lastName}",
                  password: "${password}",
                  email: "${email}"
              }) {
                token
              }
            }
          `,
    };

    try {
      const response = await axios.post(
        "/graphql",
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAuth(response.data.data.registerUser.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    removeAuth();
  };

  return {
    isAuthenticated,
    getUserId,
    loginUser,
    registerUser,
    logout,
  };
}

export { AuthProvider, useAuth };

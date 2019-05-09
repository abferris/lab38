import superagent from "superagent";

import React from "react";
import { useContext, useState } from "react";

import { LoginContext } from "./context.js";

const API = process.env.REACT_APP_API;

const If = props => {
  return !!props.condition ? props.children : null;
};

const Login = props => {
  //context
  const context = useContext(LoginContext);
  //hooks
  const [username, setUsername] = useState({ username: null });
  const [password, setPassword] = useState({ password: null });

  //username handler
  const changeUsername = e => {
    let username = e.target.value;
    setUsername({ username });
  };

  //password handler
  const changePassword = e => {
    let password = e.target.value;
    setPassword({ password });
  };
  //submittal handler
  const handleSubmit = (e, loginMethodFromContext) => {
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(username.username, password.password)
      .then(response => {
        let token = response.text;
        loginMethodFromContext(token);
      })
      .catch(console.error);
  };
  return (
    <>
      <If condition={context.loggedIn}>
        <button onClick={context.logout}>Log Out</button>
      </If>
      <If condition={!context.loggedIn}>
        <div>
          <form onSubmit={e => handleSubmit(e, context.login)}>
            <input
              placeholder="username"
              name="username"
              onChange={changeUsername}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={changePassword}
            />
            <input type="submit" value="login" />
          </form>
        </div>
      </If>
    </>
  );
};

export default Login;

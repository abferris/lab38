import React from "react";
import ReactDOM from "react-dom";
import LoginContext from "./components/auth/context.js";
import ToDo from "./components/todo/todo.js";
import Header from "./components/header/header.js";

import "./site.scss";

function App() {
  return (
    <LoginContext>
      <Header />
      <ToDo />
    </LoginContext>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

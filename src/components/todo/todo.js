import React from "react";

import { useReducer, useState } from "react";

import Auth from "../auth/auth.js";

import styles from "./todo.module.scss";

const startState = { stuffTodo: [] };

function reducer(state, action) {
  let { type, id, item } = action;

  switch (type) {
    case "toggle":
      let stuffTodo = state.stuffTodo.map((item, index) =>
        index === id ? { title: item.title, status: !item.status } : item
      );

      return { stuffTodo };

    case "handleForm":
      let newItem = { title: item.item, status: false };

      return { stuffTodo: [...state.stuffTodo, newItem] };

    default:
      return state;
  }
}

const Todo = props => {
  const [state, dispatch] = useReducer(reducer, startState);
  const [item, setItem] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    dispatch({ type: "handleForm", id: null, item });
  };

  const handleChange = e => {
    setItem({ item: e.target.value });
  };

  const toggle = (e, id) => {
    e.preventDefault();
    dispatch({ type: "toggle", id, item });
  };

  return (
    <section className={styles.todo}>
      <Auth capability="read">
        {state.stuffTodo.map((item, idx) => (
          <div key={idx} onClick={e => toggle(e, idx)}>
            <span className={styles[`complete-${item.status}`]}>
              {" "}
              {item.title}{" "}
            </span>
          </div>
        ))}
      </Auth>

      <Auth capability="create">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="item"
            placeholder="Add To Do List Item Here"
          />
        </form>
      </Auth>
    </section>
  );
};

export default Todo;

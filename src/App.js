import React, { useReducer, useEffect } from "react";
import TodoList from "./TodoList";
import "./styles.css";

export const Context = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return action.payload;

    case "add":
      return [...state, { id: Date.now(), completed: false, value: "" }];

    case "delete":
      return state.filter((item) => item.id !== action.payload);

    case "check":
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });

    case "changeValue":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, value: action.payload.value };
        }
        return item;
      });

    default:
      return state;
  }
}
let initialState = [{ id: Date.now(), completed: false, value: "" }]
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const raw = localStorage.getItem("aryanTodoData");
    if (raw)
      dispatch({ type: "reset", payload: JSON.parse(raw) });
  }, []);

  useEffect(() => {
    localStorage.setItem("aryanTodoData", JSON.stringify(state));
  }, [state]);
  return (
    <Context.Provider value={dispatch}>
      <div className="container">
        <div>
          <h1> Todo App </h1>
        </div>
        <div>
          <button
            className="add-input"
            onClick={() => {
              dispatch({ type: "add" });
            }}
          />
        </div>

        <br />
        <br />
        <div className="todoContainer">
          <TodoList state={state} />
        </div>
      </div>
    </Context.Provider>
  );
}

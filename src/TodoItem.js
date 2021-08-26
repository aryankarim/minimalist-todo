import { useContext } from "react";
import { Context } from "./App";

export default function TodoItem({ data, taskNum }) {
  const dispatch = useContext(Context);
  return (
    <div className="todo">
      <div>
        <input
          type="checkbox"
          checked={data.completed}
          onChange={() => dispatch({ type: "check", payload: data.id })}
          className="option-input"
        />
      </div>
      <div>
        <input
          type="text"
          defaultValue={data.value}
          placeholder={"task " + taskNum}
          onChange={(event) => {
            dispatch({
              type: "changeValue",
              payload: { id: data.id, value: event.target.value }
            });
          }}
          className="text-input"
        />
      </div>

      <div>
        <input
          type="button"
          onClick={() => dispatch({ type: "delete", payload: data.id })}
          className="delete-input"
        />
      </div>
    </div>
  );
}

import TodoItem from "./TodoItem";

export default function TodoList({ state }) {
  console.log(state)
  return state.map((todo, index) => (
    <TodoItem key={todo.id} taskNum={index + 1} data={todo} />
  ));
}

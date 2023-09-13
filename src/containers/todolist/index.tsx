import React from "react";
import "./styles.scss";
import CreateToDo from "./CreateToDo";
import useLocalStorage from "../../utils/useLocalStorage";
import ToDoListTable from "./Table";
import { v4 as uuidv4 } from "uuid";

export interface IToDo {
  key: string;
  value: string;
}

const ToDoListComponent = () => {
  const [todos, setTodos] = useLocalStorage<IToDo[]>("todos", []);

  const setTodo = (value: string) => {
    const ToDo = {
      key: uuidv4(),
      value,
    };
    setTodos((prev: IToDo[]) => [...prev, ToDo]);
  };

  const onDeleteHandler = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.key !== id));
  };

  return (
    <div className="todolist__wrapper">
      <CreateToDo setTodo={setTodo} />
      <ToDoListTable data={todos} onDeleteHandler={onDeleteHandler} />
    </div>
  );
};

export default ToDoListComponent;

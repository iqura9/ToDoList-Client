import "./styles.scss";
import CreateToDo from "./CreateToDo";
import ToDoListTable from "./Table";
import { useData } from "../../hooks/useData";
import { useToDoContext } from "../../context/ToDoContext";

export interface IToDo {
  key: string;
  value: string;
}

const ToDoListComponent = () => {
  const { selectedValue } = useToDoContext();
  const { todos, setTodos, setTodo, onDeleteHandler, onUpdate } =
    useData(selectedValue);

  return (
    <div className="todolist__wrapper">
      <CreateToDo setTodo={setTodo} />
      <ToDoListTable
        data={todos}
        setData={setTodos}
        onDeleteHandler={onDeleteHandler}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default ToDoListComponent;

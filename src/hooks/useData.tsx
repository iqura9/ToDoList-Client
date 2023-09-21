import { useEffect, useState } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { IToDo } from "../containers/todolist";
import { v4 as uuidv4 } from "uuid";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/api";

export const useData = (selectedValue: string) => {
  const {
    todos: restApiTodos,
    setTodos: setRestApiTodos,
    setTodo: setRestApiTodo,
    onDeleteHandler: onDeleteRestApiHandler,
    onUpdate: onUpdateApiHandler,
  } = useRestApiData();
  const {
    todos: localStorageTodos,
    setTodos: setLocalStorageTodos,
    setTodo: setLocalStorageTodo,
    onDeleteHandler: onDeleteLocalStorageHandler,
    onUpdate: onUpdateLocalStorageHandler,
  } = useLocalStorageData();

  const todos = selectedValue === "Rest API" ? restApiTodos : localStorageTodos;
  const setTodos =
    selectedValue === "Rest API" ? setRestApiTodos : setLocalStorageTodos;
  const setTodo =
    selectedValue === "Rest API" ? setRestApiTodo : setLocalStorageTodo;
  const onDeleteHandler =
    selectedValue === "Rest API"
      ? onDeleteRestApiHandler
      : onDeleteLocalStorageHandler;

  const onUpdate =
    selectedValue === "Rest API"
      ? onUpdateApiHandler
      : onUpdateLocalStorageHandler;

  return {
    todos,
    setTodos,
    setTodo,
    onDeleteHandler,
    onUpdate,
  };
};

const useLocalStorageData = () => {
  const [todos, setTodos] = useLocalStorage<IToDo[]>("todos", []);

  const setTodo = (value: string) => {
    const ToDo = {
      key: uuidv4(),
      value,
    };
    setTodos((prev: IToDo[]) => [...prev, ToDo]);
  };

  const onUpdate = (id: string, updatedValue: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.key === id ? { ...todo, value: updatedValue } : todo
      )
    );
  };

  const onDeleteHandler = (id: string | string[]) => {
    if (Array.isArray(id)) {
      id.forEach((el) => onDeleteHandler(el));
    } else {
      setTodos((prev) => prev.filter((todo) => todo.key !== id));
    }
  };

  return {
    todos,
    setTodos,
    setTodo,
    onDeleteHandler,
    onUpdate,
  };
};

const useRestApiData = () => {
  const [todos, setTodos] = useState<IToDo[]>([]);
  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setTodo = (value: string) => {
    createTodo({ value })
      .then((data) => {
        setTodos([...todos, data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdate = async (id: string, updatedValue: string) => {
    try {
      const updatedTodo = await updateTodo(id, { value: updatedValue });
      const updatedTodos = todos.map((todo) =>
        todo.key === id ? { ...todo, value: updatedTodo.value } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = (id: string | string[]) => {
    const idsToDelete = Array.isArray(id) ? id : [id];

    Promise.all(
      idsToDelete.map((idToDelete) => {
        return deleteTodo(idToDelete)
          .then(() => idToDelete)
          .catch((error) => {
            console.log(error);
            return null;
          });
      })
    ).then((deletedIds) => {
      const updatedTodos = todos.filter(
        (todo) => !deletedIds.includes(todo.key)
      );
      setTodos(updatedTodos);
    });
  };

  return {
    todos,
    setTodos,
    setTodo,
    onDeleteHandler,
    onUpdate,
  };
};

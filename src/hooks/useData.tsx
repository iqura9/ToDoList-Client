import { useEffect, useState } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { IToDo } from "../containers/todolist";
import { v4 as uuidv4 } from "uuid";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/api";
import { Alert } from "antd";

export const useData = (selectedValue: string) => {
  const dataProviderApi = useRestApiData();
  const dataProviderLocalStorage = useLocalStorageData();
  const dataProvider =
    selectedValue === "Rest API" ? dataProviderApi : dataProviderLocalStorage;

  return {
    todos: dataProvider.todos,
    setTodos: dataProvider.setTodos,
    setTodo: dataProvider.setTodo,
    onDeleteHandler: dataProvider.onDeleteHandler,
    onUpdate: dataProvider.onUpdate,
    total: selectedValue === "Rest API" ? dataProviderApi.total : 0,
    refetch: selectedValue === "Rest API" ? dataProviderApi.refetch : undefined,
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
  const [total, setTotal] = useState(0);

  const refetch = (page: number, pageSize: number) => {
    getTodos(page, pageSize).then((data) => {
      setTodos(data.todos);
      setTotal(data.totalCount);
    });
  };

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data.todos);
        setTotal(data.totalCount);
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
    total,
    refetch,
  };
};

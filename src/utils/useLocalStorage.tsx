import { useState, useEffect } from "react";

type SetValue<T> = (newValue: T | ((prevValue: T) => T)) => void;

type ReturnType<T> = [T, SetValue<T>];

const useLocalStorage = <T,>(
  key: string,
  defaultValue: T | (() => T)
): ReturnType<T> => {
  const getInitialValue = () => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.error(`Error parsing localStorage item ${key}:`, error);
      }
    }
    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;
  };

  const [value, setValue] = useState<T>(getInitialValue);

  useEffect(() => {
    const rawValue = JSON.stringify(value);
    localStorage.setItem(key, rawValue);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;

import { RadioChangeEvent } from "antd";
import { createContext, useContext, useState, ReactNode } from "react";

interface ToDoContextProps {
  selectedValue: string;
  handleRadioChange: (e: RadioChangeEvent) => void;
}

const ToDoContext = createContext<ToDoContextProps | undefined>(undefined);

export function ToDoProvider({ children }: { children: ReactNode }) {
  const [selectedValue, setSelectedValue] = useState<string>("Localstorage");

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedValue(e.target.value);
  };

  return (
    <ToDoContext.Provider value={{ selectedValue, handleRadioChange }}>
      {children}
    </ToDoContext.Provider>
  );
}

export function useToDoContext(): ToDoContextProps {
  const context = useContext(ToDoContext);
  if (context === undefined) {
    throw new Error("useToDoContext must be used within a ToDoProvider");
  }
  return context;
}

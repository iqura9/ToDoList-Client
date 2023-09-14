import "./App.css";
import ToDoRadioGroup from "./components/RadioGroup";
import ToDoListComponent from "./containers/todolist";
import { ToDoProvider } from "./context/ToDoContext";

function App() {
  return (
    <ToDoProvider>
      <ToDoRadioGroup />
      <ToDoListComponent />
    </ToDoProvider>
  );
}

export default App;

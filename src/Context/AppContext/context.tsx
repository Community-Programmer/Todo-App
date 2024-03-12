import { createContext } from "react";
import { Todo } from "../../Models/Todo";


export type TodoContextType = {
    isPaneOpen: Boolean;
    setIsPaneOpen:React.Dispatch<React.SetStateAction<Boolean>>;
    isEdit:Boolean;
    setIsEdit:React.Dispatch<React.SetStateAction<Boolean>>;
    todo: Todo;
    setTodo:React.Dispatch<React.SetStateAction<Todo>>;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  };

const AppContext = createContext<TodoContextType | null>(null);

export default AppContext;
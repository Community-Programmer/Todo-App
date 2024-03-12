import React, { useEffect, useState } from 'react'
import AppContext from './AppContext/context'
import { Todo } from '../Models/Todo';


const TaskAppContext:React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [isPaneOpen, setIsPaneOpen] = useState<Boolean>(false);
    const [isEdit, setIsEdit] = useState<Boolean>(false);
    const [todo, setTodo] = useState<Todo>({
        id: Date.now(),
        title: '',
        description: '',
        date: new Date(),
        category:'General',
        isCompleted: false

    });
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);


  return (
    <AppContext.Provider value={{isPaneOpen,setIsPaneOpen, isEdit, setIsEdit, todo , setTodo, todos, setTodos}}>
        {children}
    </AppContext.Provider>
  )
}

export default TaskAppContext
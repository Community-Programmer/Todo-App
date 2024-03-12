import React, { useContext, useEffect, useState } from "react";
import "./App.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TaskPane from "./Components/TaskPane/TaskPane";
import { Todo } from "./Models/Todo";
import { format } from "date-fns";
import TaskCard from "./Components/TaskCard/TaskCard";

import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";
import AppContext, { TodoContextType } from "./Context/AppContext/context";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const App: React.FC = () => {


  
  const { isPaneOpen, setIsPaneOpen, todos, setTodos} = useContext(AppContext) as TodoContextType;

  const CompletedTask = todos.filter((todo)=>todo.isCompleted).length;
  const UpcomingTask = todos.filter((todo)=>!todo.isCompleted).length

  const [value, onChange] = useState<Value>(new Date());


  useEffect(() => {
    const todosListString = localStorage.getItem('todos');
    const todosList = todosListString ? JSON.parse(todosListString) : [];
    if (todosList) {
     setTodos(todosList);
    }
  }, []);
  

  return (
    <>
      <div className="container">
        <div className="container__leftSection">
          <h1>TODO LIST</h1>
          <div className="container__leftSection_wrap">
            <span>
              <IoCalendarNumberOutline fontSize={25} />
              Upcoming {UpcomingTask}
            </span>
            <span>
              <IoCheckmarkDone fontSize={25} /> Completed Task {CompletedTask}
            </span>
          </div>
          <Calendar onChange={onChange} value={value} />
        </div>

        <div className="container__rightSection">
          <div className="container__rightSection__mainMenu">
            <div className="container__rightSection__topMenu">
              <h2>{format(value!.toString(), 'MMMM d, yyyy')}</h2>
            </div>

            <button
              className="button"
              onClick={() => setIsPaneOpen(!isPaneOpen)}
            >
              Add New Task
            </button>

            <div className="taskCard__container">
              {todos
                .filter(
                  (todo) =>
                    format(todo.date, "dd/MM/yyyy") ===
                    format(value!.toString(), "dd/MM/yyyy")
                )
                .map((todo) => (
                  <TaskCard
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    category={todo.category}
                    isCompleted={todo.isCompleted}
                  />
                ))}
            </div>
          </div>
          <TaskPane/>
        </div>
      </div>
    </>
  );
};

export default App;

import React, { useContext, useRef } from "react";
import { Todo } from "../../Models/Todo";
import "./TaskCard.scss";

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import AppContext, { TodoContextType } from "../../Context/AppContext/context";
import { IoCheckmarkDone } from "react-icons/io5";

interface Props {
  id: number;
  title: string;
  description: string;
  category: string;
  isCompleted: Boolean;
}

const TaskCard: React.FC<Props> = ({
  id,
  title,
  description,
  category,
  isCompleted,
}) => {

  const {
    isPaneOpen,
    setIsPaneOpen,
    isEdit,
    setIsEdit,
    todo,
    setTodo,
    todos,
    setTodos,
  } = useContext(AppContext) as TodoContextType;

  const Color = useRef<HTMLSpanElement>(null);


  const deleteTask = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setIsPaneOpen(false);
  };

  const editTask = (id: number) => {
    setIsEdit(true);
    const todoss = todos.filter((todo) => todo.id === id);
    setTodo(todoss[0]);
    setIsPaneOpen(true);
  };

  const markAsComplete = (id: number) => {
    setTodos(
      todos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, isCompleted: !isCompleted } : todoItem
      )
    );
  };

  console.log(todos);

  return (
    <>
      <div className="taskCard__container__card">
        <h3>{title}</h3>
        <p>{description}</p>
        <span ref={Color} className={`category ${category.toLowerCase()}`}>{category}</span>

        <div className="taskCard__container__card__icon__top">
          {isCompleted ? (
            <p>Completed</p>
          ) : (
            <span onClick={() => markAsComplete(id)}>
              <IoCheckmarkDone fontSize={25} /> Mark as Complete
            </span>
          )}
        </div>

        <div className="taskCard__container__card__icon__bottom">
          {isCompleted ? <span onClick={() => markAsComplete(id)}>
              <IoCheckmarkDone fontSize={25} /> Mark as incomplete
            </span>: <><span onClick={() => editTask(id)}>
            <CiEdit fontSize={20} /> Edit
          </span>
          <span onClick={() => deleteTask(id)}>
            <MdDeleteOutline fontSize={20} /> Delete
          </span></>}
          
        </div>
      </div>
    </>
  );
};

export default TaskCard;

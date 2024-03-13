import React, { ChangeEvent, useContext } from "react";
import "./TaskPane.scss";
import AppContext, { TodoContextType } from "../../Context/AppContext/context";

const TaskPane: React.FC = () => {
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

  const resetForm = () => {
    setTodo({
      id: Date.now(),
      title: "",
      description: "",
      date: new Date(),
      category: "Personal",
      isCompleted: false,
    });
  };

  const handelChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent, id: number) => {

    event.preventDefault();
    resetForm();

    if (!isEdit) {
      console.log("yes");
      setTodos([...todos, todo]);

      setIsPaneOpen(false);
    } else {
      setTodos(
        todos.map((todoItem) =>
          todoItem.id === id ? { ...todoItem, ...todo } : todoItem
        )
      );
      setIsPaneOpen(false);
      setIsEdit(false);
    }

    resetForm();
  };

  return (
    <div className={`tasKPane__container ${isPaneOpen ? "openPane" : ""}`}>
      <h2>Add Task</h2>
      <form onSubmit={(event) => handleSubmit(event, todo.id)}>
        <label htmlFor="task">Task</label>
        <input
          type="text"
          id="task"
          name="title"
          value={todo.title}
          onChange={(e) => handelChange(e)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={todo.description}
          onChange={(e) => handelChange(e)}
          maxLength={150}
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={todo.date.toString()}
          onChange={(e) => handelChange(e)}
        />

        <label htmlFor="category">Category</label>

        <select
          name="category"
          id="category"
          value={todo.category}
          onChange={(e) => handelChange(e)}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Home">Home</option>
          <option value="Finance">Finance</option>
          <option value="Social">Social</option>
          <option value="Travel">Travel</option>
          <option value="School-Study">School-Study</option>
        </select>

        <label htmlFor="tags">Tags</label>

        <div className="button__container">
          {!isEdit ? (
            <button type="submit" className="button">
              Add Task
            </button>
          ) : (
            <button
              type="submit"
              className="button"
              onClick={(event) => handleSubmit(event, todo.id)}
            >
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskPane;

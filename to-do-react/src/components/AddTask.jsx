import { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add task");
      return;
    }

    const dueDate = `${new Date(day).toDateString()}, ${new Date(
      day
    ).toTimeString()};`;

    onAddTask({ text, dueDate });
    setText("");
    setDay("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day and Time</label>
        <input
          type="datetime-local"
          placeholder="Add Day and Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Save New Task"
        className="btn btn-block btn-add"
      />
    </form>
  );
};

export default AddTask;

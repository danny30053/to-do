import { useEffect, useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Button from "./components/Button";
import axios from "axios";

function App() {
  const URL = "http://localhost:5000/api/todos";
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const todos = await axios.get(URL);
      setTasks(todos.data);
    };

    getTasks();
  }, [tasks]);

  //Delete task
  const deleteTask = async (id) => {
    console.log("delete task", id);
    await axios
      .delete(`${URL}/${id}`)
      .then(setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => {
        console.log(err);
      });
  };

  // add task
  const addTask = async (task) => {
    
    const newTodo = await axios.post(URL, task);
    console.log(newTodo);

    setTasks([...tasks, newTodo]);
  };

  const editTask = async (id) => {
    await axios.put(`${URL}/${id}`);
    setTasks( await axios.get(URL));
  };

  return (
    <div className="container">
      <Header
        title={"Task Tracker"}
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
      ) : (
        "No tasks available"
      )}
      <Button
        onClick={() => setShowAddTask(!showAddTask)}
        color={showAddTask ? "red" : "green"}
        text={showAddTask ? "Close" : "Create New Task"}
      />
      {showAddTask && <AddTask onAddTask={addTask} />}
    </div>
  );
}

export default App;

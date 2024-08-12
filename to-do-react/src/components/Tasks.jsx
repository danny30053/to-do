import Task from "./Task";

const Tasks = ({ tasks, onDelete, onEdit }) => {
  return (
    <div>
      {tasks.map((t) => (
        <Task key={t.id} task={t} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default Tasks;

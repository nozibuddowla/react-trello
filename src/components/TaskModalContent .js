import React, { useState } from "react";

const TaskModalContent = ({ onAddTask, onClose }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const handleAddTask = () => {
    if (taskTitle.trim() !== "") {
      onAddTask(taskTitle);
      onClose();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskModalContent;

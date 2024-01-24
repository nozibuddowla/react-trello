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
    <div className="modal-box bg-[#EEEFF0] ">
      <form method="dialog">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          X
        </button>
      </form>

      <div>
        <label
          htmlFor="taskName"
          className="mb-2 inline-block text-sm text-dark sm:text-base"
        >
          Task Name
        </label>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full text-sm rounded border bg-gray-50 px-3 py-2 text-dark outline-none"
        />
      </div>
      <div className="col-span-2 mt-6">
        <button
          type="submit"
          className="btn w-full btn-sm btn-neutral"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskModalContent;

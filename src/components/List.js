import React from "react";
import Card from "./Card";

const List = ({ list, onAddTask, onDragEnd }) => {
  // Add a check for undefined list
  if (!list) {
    return (
      <div className="flex-none w-80 p-4 bg-gray-950 rounded mr-4 overflow-y-auto">
        <p className="text-white">No tasks available.</p>
      </div>
    ); // or handle this case accordingly
  }
  const { id, title, cards } = list;

  const handleAddTask = () => {
    const taskTitle = prompt("Enter task title:");
    if (taskTitle) {
      onAddTask(id, taskTitle);
    }
  };
  const handleDragEnd = (result) => {
    onDragEnd(result, id);
  };
  return (
    <div className="flex-none w-80 p-4 bg-gray-950 rounded mr-4 overflow-y-auto">
      <h2 className="text-lg text-white font-semibold mb-2">{title}</h2>
      {cards.map((card, index) => (
        <Card key={card.id} card={card} index={index} />
      ))}
      <button
        onClick={handleAddTask}
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Add a Task
      </button>
    </div>
  );
};

export default List;

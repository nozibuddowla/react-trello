import React, { useEffect, useState } from "react";
import List from "./List";

const Board = ({ lists, onAddList, onAddTask, onDragEnd }) => {
  const [newListTitle, setNewListTitle] = useState("");

  useEffect(() => {
    // Save lists to localStorage whenever it changes
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const handleAddList = () => {
    if (newListTitle.trim() !== "") {
      onAddList(newListTitle);
      setNewListTitle("");
    }
  };

  return (
    <div className="flex p-8 overflow-x-auto">
      {lists.map((list) => (
        <List
          key={list.id}
          title={list.title}
          cards={list.cards}
          onAddTask={(title) => onAddTask(list.id, title)}
          onDragEnd={onDragEnd}
        />
      ))}

      <div className="flex-none w-80 p-4 bg-slate-600 rounded mr-4">
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="New List Title"
          className="mb-2 p-2 border rounded"
        />
        <button
          onClick={handleAddList}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add a List
        </button>
      </div>
    </div>
  );
};

export default Board;

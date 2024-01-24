import React, { useEffect, useState } from "react";
import List from "./List";
import { FaPlus } from "react-icons/fa";

const Board = ({ onAddList, onAddTask, onDragEnd }) => {
  const [lists, setLists] = useState(() => {
    // Use a function to initialize the state with the lists from localStorage
    const storedLists = localStorage.getItem("lists");
    return storedLists ? JSON.parse(storedLists) : [];
  });

  const [newListTitle, setNewListTitle] = useState("");

  useEffect(() => {
    try {
      // Save lists to localStorage whenever it changes
      localStorage.setItem("lists", JSON.stringify(lists));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [lists]);

  const handleAddList = () => {
    if (newListTitle.trim() !== "") {
      // Create a new list object
      const newList = {
        id: Date.now(), // Using timestamp as a simple unique identifier
        title: newListTitle,
        cards: [],
      };
      // Update the lists state with the new list
      setLists((prevLists) => [...prevLists, newList]);

      onAddList(newListTitle);

      // Clear the input field
      setNewListTitle("");
    }
  };

  const handleAddTask = (listId, taskTitle) => {
    setLists((prevLists) => {
      return prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [...list.cards, { id: Date.now(), title: taskTitle }],
            }
          : list
      );
    });
  };

  const dragEndFunction = (result) => {
    if (!result.destination) return; // Dragged outside of droppable area

    const sourceListId = parseInt(result.source.droppableId, 10);
    const destinationListId = parseInt(result.destination.droppableId, 10);
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceListId === destinationListId) {
      // Reorder cards in the same list
      setLists((prevLists) => {
        const newList = [...prevLists];
        const updatedList = { ...newList[sourceListId] };
        const [removed] = updatedList.cards.splice(sourceIndex, 1);
        updatedList.cards.splice(destinationIndex, 0, removed);
        newList[sourceListId] = updatedList;
        return newList;
      });
    } else {
      // Move card to a different list
      setLists((prevLists) => {
        const sourceList = { ...prevLists[sourceListId] };
        const destinationList = { ...prevLists[destinationListId] };
        const [movedCard] = sourceList.cards.splice(sourceIndex, 1);
        destinationList.cards.splice(destinationIndex, 0, movedCard);

        const newList = [...prevLists];
        newList[sourceListId] = sourceList;
        newList[destinationListId] = destinationList;
        return newList;
      });
    }
  };

  return (
    <div className="flex p-8 overflow-x-auto">
      {lists.map((list) => (
        <List
          key={list.id}
          list={list} // Pass the entire list object
          onAddTask={handleAddTask}
          onDragEnd={dragEndFunction}
        />
      ))}

      <div className="flex-none w-80 p-4 bg-slate-600 rounded mr-4">
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="New List Title"
          className="mb-2 p-2 rounded"
        />
        <button
          onClick={handleAddList}
          className="bg-cyan-700 text-white p-3 rounded"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Board;

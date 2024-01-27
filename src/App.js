import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { v4 as uuidv4 } from "uuid";
import { initialLists } from "./initialLists";

function App() {
  // State for managing lists
  const [lists, setLists] = useState(initialLists);

  // Function to add a new list
  const onAddList = (newListTitle) => {
    // Ensure the title is not empty
    if (newListTitle.trim() !== "") {
      // Generate a unique ID for the new list
      const newListId = Math.max(...lists.map((list) => list.id), 0) + 1;

      // Create a new list object
      const newList = {
        id: newListId,
        title: newListTitle,
        cards: [], // You can initialize with an empty array of cards
      };

      // Update the lists state with the new list
      setLists((prevLists) => [...prevLists, newList]);
    }
  };

  const onAddTask = (listId, taskTitle) => {
    // Logic to add a task to the specified list
    setLists((prevLists) => {
      // Find the list with the matching ID and add the new task
      const updatedLists = prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [
                ...list.cards,
                {
                  id: uuidv4(),
                  title: taskTitle,
                },
              ],
            }
          : list
      );
      return updatedLists;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <Board lists={lists} onAddList={onAddList} onAddTask={onAddTask} />
    </div>
  );
}

export default App;

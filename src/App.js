import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const initialLists = [
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      cards: [{ id: 3, title: "Task 3" }],
    },
    {
      id: 3,
      title: "Done",
      cards: [{ id: 4, title: "Task 4" }],
    },
  ];

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <Board lists={lists} onAddList={onAddList} />
    </div>
  );
}

export default App;

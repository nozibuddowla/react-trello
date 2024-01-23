import "./App.css";
import Board from "./components/Board";

function App() {
  const lists = [
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <Board lists={lists} />
    </div>
  );
}

export default App;

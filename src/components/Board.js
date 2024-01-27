import React, { useEffect, useState } from "react";
import List from "./List";
import { FaPlus } from "react-icons/fa";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = ({ onAddList, onAddTask }) => {
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
        id: `${Date.now()}`, // Using timestamp as a simple unique identifier
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
    const { destination, source } = result;
    const draggableId =
      source.droppableId === destination.droppableId
        ? source.draggableId
        : `${source.droppableId}-${source.draggableId}`;
    if (!destination) return; // Dragged outside of droppable area
    const newLists = [...lists];
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      const list = newLists.find((list) => list.id === source.droppableId);

      // Remove the card from the source index and insert it at the destination index
      const [removedCard] = list.cards.splice(source.index, 1);
      list.cards.splice(destination.index, 0, removedCard);
    } else {
      const sourceList = newLists.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newLists.find(
        (list) => list.id === destination.droppableId
      );

      // Remove the card from the source list and insert it into the destination list
      const [movedCard] = sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, movedCard);
    }

    const startList = lists.find((list) => list.id === source.droppableId);
    const finishList = lists.find(
      (list) => list.id === destination.droppableId
    );

    // Moving within the same list
    if (startList === finishList) {
      const newList = Array.from(startList.cardIds);
      newList.splice(source.index, 1);
      newList.splice(destination.index, 0, draggableId);

      const updatedList = {
        ...startList,
        cardIds: newList,
      };

      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === updatedList.id ? updatedList : list
        )
      );
      return;
    }

    // Moving from one list to another
    const startCardIds = Array.from(startList.cards);

    startCardIds.splice(source.index, 1);
    const newStart = {
      ...startList,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishList.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishList,
      cardIds: finishCardIds,
    };

    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === newStart.id) {
          return newStart;
        } else if (list.id === newFinish.id) {
          return newFinish;
        } else {
          return list;
        }
      })
    );
  };

  return (
    <div className="flex p-8 overflow-x-auto">
      <DragDropContext
        onDragEnd={dragEndFunction}
        className="flex p-8 overflow-x-auto"
      >
        <div className="flex overflow-x-auto p-4 space-x-4">
          {lists.map((list) => (
            <Droppable key={list.id} droppableId={list.id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <List
                    list={list}
                    onAddTask={handleAddTask}
                    cards={list.cards}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
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
      </DragDropContext>
    </div>
  );
};

export default Board;

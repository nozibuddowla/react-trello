import React, { useState } from "react";
import Card from "./Card";
import { FaPlus } from "react-icons/fa";
import ReactModal from "react-modal";
import TaskModalContent from "./TaskModalContent ";
import { Droppable } from "react-beautiful-dnd";

const List = ({ list, onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add a check for undefined list
  if (!list) {
    return (
      <div className="flex-none w-80 p-4 bg-gray-950 rounded mr-4 overflow-y-auto">
        <p className="text-white">No tasks available.</p>
      </div>
    );
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { id, title, cards } = list;
  const handleAddTask = () => {
    openModal();
  };

  return (
    <div className="flex-none w-80 p-4 bg-gray-950 rounded mr-4 overflow-y-auto list">
      <h2 className="text-lg text-white font-semibold mb-2">{title}</h2>
      <Droppable droppableId={id} type="CARD">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[100px] space-y-2"
          >
            {cards &&
              cards.map((card, index) => {
                if (card) {
                  console.log("Card:", card);
                  return <Card key={card.id} card={card} index={index} />;
                } else {
                  return null; // or handle null cards in a way that makes sense for your application
                }
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        onClick={handleAddTask}
        className="mt-4 text-white flex content-center justify-between "
      >
        <FaPlus />
        <span>Add a card</span>
      </button>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Task Modal"
      >
        <TaskModalContent
          onAddTask={(title) => onAddTask(id, title)}
          onClose={closeModal}
        />
      </ReactModal>
    </div>
  );
};

export default List;

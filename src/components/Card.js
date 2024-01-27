import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="mb-4 p-2 bg-white rounded shadow card"
        >
          {card.content}
        </div>
      )}
    </Draggable>
  );
};

export default Card;

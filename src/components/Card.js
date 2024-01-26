import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  console.log(`Rendering card ${card.id}`);
  const { title, description, dueDate, attachments } = card;
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="mb-4 p-2 bg-white rounded shadow card"
        >
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {description && <p className="text-gray-600 mb-2">{description}</p>}
          {dueDate && <p className="text-gray-600 mb-2">Due Date: {dueDate}</p>}
          {attachments && (
            <div>
              <strong>Attachments:</strong> {attachments}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;

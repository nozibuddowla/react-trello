import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  const { id, title, description, attachments } = card;
  return (
    <Droppable droppableId={String(id)}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Draggable draggableId={String(id)} index={index}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="mb-4 p-2 bg-white rounded shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                {description && (
                  <p className="text-gray-600 mb-2">{description}</p>
                )}
                {attachments && (
                  <div>
                    <strong>Attachments:</strong> {attachments}
                  </div>
                )}
              </div>
            )}
          </Draggable>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Card;

import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  const { id, title, description, attachments } = card;
  return (
    <Draggable className="mb-4 p-2 bg-gray-700 rounded shadow">
      <h3 className="text-lg text-white font-semibold mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-2">{description}</p>}
      {attachments && (
        <div>
          <strong>Attachments:</strong> {attachments}
        </div>
      )}
    </Draggable>
  );
};

export default Card;

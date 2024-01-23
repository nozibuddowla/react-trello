import React from "react";

const Card = ({ card }) => {
  const { title, description, attachments } = card;
  return (
    <div className="mb-4 p-2 bg-gray-700 rounded shadow">
      <h3 className="text-lg text-white font-semibold mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-2">{description}</p>}
      {attachments && (
        <div>
          <strong>Attachments:</strong> {attachments}
        </div>
      )}
    </div>
  );
};

export default Card;

import React from "react";
import Card from "./Card";

const List = ({ title, cards }) => {
  return (
    <div className="flex-none w-80 p-4 bg-gray-950 border rounded mr-4 overflow-y-auto">
      <h2 className="text-lg text-white font-semibold mb-2">{title}</h2>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default List;

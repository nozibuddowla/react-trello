import React from "react";
import List from "./List";

const Board = ({ lists }) => {
  return (
    <div className="flex p-8 overflow-x-auto">
      {lists.map((list) => (
        <List key={list.id} title={list.title} cards={list.cards} />
      ))}
    </div>
  );
};

export default Board;

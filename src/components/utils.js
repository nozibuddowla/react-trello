export const updateListTitle = (id, newTitle, lists, setLists) => {
  const updatedLists = lists.map((list) =>
    list.id === id ? { ...list, title: newTitle } : list
  );
  setLists(updatedLists);
};

export const addList = (title, lists, setLists) => {
  const newList = { id: Date.now(), title, cards: [] };
  setLists([...lists, newList]);
};

export const updateCard = (id, listId, changes, lists, setLists) => {
  const updatedLists = lists.map((list) => {
    if (list.id === listId) {
      return {
        ...list,
        cards: list.cards.map((card) =>
          card.id === id ? { ...card, ...changes } : card
        ),
      };
    } else {
      return list;
    }
  });
  setLists(updatedLists);
};

export const deleteCard = (id, listId, lists, setLists) => {
  const updatedLists = lists.map((list) => {
    if (list.id === listId) {
      return {
        ...list,
        cards: list.cards.filter((card) => card.id !== id),
      };
    } else {
      return list;
    }
  });
  setLists(updatedLists);
};

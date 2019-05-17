class List {
  static addList(state, payload) {
    const { listTitle, newListId } = payload;
    return {
      ...state,
      [newListId]: {
        _listId: newListId,
        title: listTitle,
        cards: []
      }
    }
  }

  static editListTitle(state, payload) {
    const { listTitle, listId } = payload;
    return {
      ...state,
      [listId]: {
        ...state[listId],
        title: listTitle,
      }
    };
  }

  static addCardToList(state, payload) {
    const { listId, newCardId } = payload;
    return {
      ...state,
      [listId]: {
        ...state[listId],
        cards: state[listId].cards.concat(newCardId)
      },
    }
  }



  static deleteList(state, payload) {
    const { listId } = payload;
    const { [listId]: deletedList, ...restOfLists } = state;
    return restOfLists;
  }

  static moveCard(state, payload) {
    const {
      sourceIndex,
      destinationIndex,
      sourceListIndex,
      destinationListIndex
    } = payload;
    // Move within the same list
    if (sourceListIndex === destinationListIndex) {
      const newCards = Array.from(state[sourceListIndex].cards);
      const [removedCard] = newCards.splice(sourceIndex, 1);
      newCards.splice(destinationIndex, 0, removedCard);
      return {
        ...state,
        [sourceListIndex]: { ...state[sourceListIndex], cards: newCards }
      };
    }
    // Move card from one list to another
    const sourceCards = Array.from(state[sourceListIndex].cards);
    const [removedCard] = sourceCards.splice(sourceIndex, 1);
    const destinationCards = Array.from(state[destinationListIndex].cards);
    destinationCards.splice(destinationIndex, 0, removedCard);
    return {
      ...state,
      [sourceListIndex]: { ...state[sourceListIndex], cards: sourceCards },
      [destinationListIndex]: { ...state[destinationListIndex], cards: destinationCards }
    };
  }
}

export default List;

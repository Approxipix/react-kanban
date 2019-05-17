class Card {
  static addCard(state, payload) {
    const { cardTitle, newCardId } = payload;
    return {
      ...state,
      [newCardId]: {
        _cardId: newCardId,
        title: cardTitle,
        description: '',
        cardLabels: [],
        checkLists: [],
      }
    }
  }

  static addCheckListToCard(state, payload) {
    const { cardId, checkListId } = payload;
    return {
      ...state,
      [cardId]: {
        ...state[cardId],
        checkLists: [...state[cardId].checkLists.concat(checkListId)],
      }
    }
  }

  static deleteCheckListFromCard(state, payload) {
    const { cardId, checkListId } = payload;
    return {
      ...state,
      [cardId]: {
        ...state[cardId],
        checkLists: state[cardId].checkLists.filter(listId => listId !== checkListId),
      }
    }
  }


  static addLabelToCard(state, payload) {
    const { cardId, cardLabel} = payload;
    const isLabelExist = state[cardId].cardLabels.some(label => {
      return label._labelId === cardLabel._labelId
    });
    let newCardLabel = [...state[cardId].cardLabels];
    if (isLabelExist) {
      newCardLabel = newCardLabel.filter(label => label._labelId !== cardLabel._labelId);
    } else {
      newCardLabel = newCardLabel.concat(cardLabel);
    }
    return {
      ...state,
      [cardId]: {
        ...state[cardId],
        cardLabels: newCardLabel,
      }
    }
  }

  static editCardTitle(state, payload) {
    const { cardTitle, cardId } = payload;
    return {
      ...state,
      [cardId]: {
        ...state[cardId],
        title: cardTitle
      }
    };
  }

  static editCardDesc(state, payload) {
    const { cardDescription, cardId } = payload;
    return {
      ...state,
      [cardId]: {
        ...state[cardId],
        description: cardDescription
      }
    };
  }

  static deleteCard(state, payload) {
    return {

    };
  }
}

export default Card;

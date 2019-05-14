import data from '../../data'
import {
  SET_CURRENT_BOARD_INDEX,

  ADD_BOARD,
  EDIT_BOARD_TITLE,
  EDIT_BOARD_COLOR,
  DELETE_BOARD,

  ADD_LIST,
  EDIT_LIST_TITLE,
  MOVE_LIST,
  DELETE_LIST,

  ADD_CARD,
  EDIT_CARD,
  MOVE_CARD,
  DELETE_CARD,
} from "./constants";

import Bh from '../../helpers/BoardHelper'
import Lh from '../../helpers/ListHelper'
import Ch from '../../helpers/CardHelper'

const initialState = data;

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BOARD_INDEX:
      return Bh.serCurrentBoardIndex(state, action.payload);

    case ADD_BOARD:
      return Bh.addBoard(state, action.payload);
    case EDIT_BOARD_TITLE:
      return Bh.editBoardTitle(state, action.payload);
    case EDIT_BOARD_COLOR:
      return Bh.editBoardColor(state, action.payload);
    case DELETE_BOARD:
      return Bh.deleteBoard(state, action.payload);

    case ADD_LIST:
      return Lh.addList(state, action.payload);
    case EDIT_LIST_TITLE:
      return Lh.editListTitle(state, action.payload);
    case MOVE_LIST:
      return Lh.moveList(state, action.payload);
    case DELETE_LIST:
      return Lh.deleteList(state, action.payload);

    case ADD_CARD:
      return Ch.addCard(state, action.payload);
    case EDIT_CARD:
      return Ch.editCard(state, action.payload);
    case MOVE_CARD:
      return Ch.moveCard(state, action.payload);
    case DELETE_CARD:
      return Ch.deleteCard(state, action.payload);

    default:
      return state;
  }
};

export default rootReducer;

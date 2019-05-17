import {
  ADD_BOARD,
  EDIT_BOARD_TITLE,
  EDIT_BOARD_COLOR,
  DELETE_BOARD,
  MOVE_LIST,
} from "./constants";

export const addBoard = (fields) => ({
  type: ADD_BOARD,
  payload: fields
});

export const editBoardColor = (fields) => ({
  type: EDIT_BOARD_COLOR,
  payload: fields
});

export const editBoardTitle = (fields) => ({
  type: EDIT_BOARD_TITLE,
  payload: fields
});

export const deleteBoard = (fields) => ({
  type: DELETE_BOARD,
  payload: fields
});

export const moveList = (fields) => ({
  type: MOVE_LIST,
  payload: fields
});

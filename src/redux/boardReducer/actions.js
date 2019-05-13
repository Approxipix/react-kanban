import {
  SET_CURRENT_BOARD_INDEX,

  ADD_BOARD,
  EDIT_BOARD_TITLE,
  EDIT_BOARD_COLOR,
  DELETE_BOARD,

  ADD_LIST,
  ADD_TASK,
  DELETE_LIST,
  DELETE_TASK,
  EDIT_TASK,
  EDIT_COLUMN,
  MOVE_LIST,
  MOVE_TASK,
} from "./constants";

export const setCurrentBoardIndex = (fields) => ({
  type: SET_CURRENT_BOARD_INDEX,
  payload: fields
});

export const addBoard = (fields) => ({
  type: ADD_BOARD,
  payload: fields
});

export const editBoardTitle = (fields) => ({
  type: EDIT_BOARD_TITLE,
  payload: fields
});

export const editBoardColor = (fields) => ({
  type: EDIT_BOARD_COLOR,
  payload: fields
});

export const deleteBoard = (fields) => ({
  type: DELETE_BOARD,
  payload: fields
});





export const addList = (fields) => ({
  type: ADD_LIST,
  payload: fields
});

export const deleteList = (fields) => ({
  type: DELETE_LIST,
  payload: fields
});

export const deleteTask = (fields) => ({
  type: DELETE_TASK,
  payload: fields
});

export const moveList = (fields) => ({
  type: MOVE_LIST,
  payload: fields
});

export const addTask = (fields) => ({
  type: ADD_TASK,
  payload: fields
});

export const moveTask = (fields) => ({
  type: MOVE_TASK,
  payload: fields
});

export const editTask = (fields) => ({
  type: EDIT_TASK,
  payload: fields
});

export const editColumn = (fields) => ({
  type: EDIT_COLUMN,
  payload: fields
});

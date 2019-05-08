import {
  ADD_BOARD,
  ADD_LIST,
  ADD_TASK,
  MOVE_LIST,
  MOVE_TASK,
} from "./constants";

export const addBoard = (fields) => ({
  type: ADD_BOARD,
  payload: fields
});

export const addList = (fields) => ({
  type: ADD_LIST,
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

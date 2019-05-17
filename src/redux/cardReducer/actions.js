import {
  ADD_CARD,
  ADD_LABEL_TO_CARD,
  EDIT_CARD_TITLE,
  EDIT_CARD_DESC,
  DELETE_CARD,
} from "./constants";

export const addCard = (fields) => ({
  type: ADD_CARD,
  payload: fields
});

export const addLabelToCard = (fields) => ({
  type: ADD_LABEL_TO_CARD,
  payload: fields
});

export const editCardTitle = (fields) => ({
  type: EDIT_CARD_TITLE,
  payload: fields
});

export const editCardDesc = (fields) => ({
  type: EDIT_CARD_DESC,
  payload: fields
});

export const deleteCard = (fields) => ({
  type: DELETE_CARD,
  payload: fields
});


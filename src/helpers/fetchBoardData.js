import { normalize, schema } from "normalizr";

// Boards are stored in a tree structure inside mongoDB.
// This function takes the tree shaped boards and returns a flat structure more suitable to a redux store.
const normalizeBoards = (boards) => {
  const cardById = new schema.Entity(
    'cards',
    {},
    { idAttribute: '_cardId' }
  );

  const listById = new schema.Entity(
    'lists',
    { cards: [cardById] },
    { idAttribute: '_listId' }
    );

  const board = new schema.Entity(
    'boards',
    { lists: [listById] },
    { idAttribute: '_boardId' }
    );

  const { entities } = normalize(boards, [board]);
  return entities;
};

export default normalizeBoards;

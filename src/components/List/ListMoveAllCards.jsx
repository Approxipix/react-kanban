import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { moveAllCards } from '../../redux/listReducer/actions/actions';
import { SubmitButton } from '../BaseComponent';
import Select from '../Select/Select';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1rem;
`;

class ListMoveAllCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newListId: props.listId || null,
    }
  }

  moveAllCards =() => {
    const { listId } = this.props;
    const { newListId } = this.state;
    if (listId !== newListId) {
      this.props.actions.moveAllCards({
        listId: listId,
        newListId: newListId,
      });
    }
    this.props.toggleOpened();
  };

  listIdSelector = () => {
    const { newListId } = this.state;
    const { boards, boardId, lists, listId } = this.props;
    const listsOptions = boards[boardId].lists.map((id) => ({
      title: listId === id ? `${lists[id].title} (current)` : lists[id].title,
      value: id,
    }));

    return (
      <Select
        label="Board"
        placeholder="Select board"
        value={lists[newListId].title}
        options={listsOptions}
        onChange={(id) => this.setState({ newListId: id })}
      />
    );
  };

  render() {
    return (
      <>
        <Container>
          {this.listIdSelector()}
        </Container>
        <SubmitButton onClick={() => this.moveAllCards()}>
          Move
        </SubmitButton>
      </>
    );
  }
}

ListMoveAllCards.defaultProps = {
  boards: null,
  lists: null,
};

ListMoveAllCards.propTypes = {
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  boards: PropTypes.objectOf(
    PropTypes.shape({
      _boardId: PropTypes.string,
      title: PropTypes.string,
      color: PropTypes.string,
      lists: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  lists: PropTypes.objectOf(
    PropTypes.shape({
      _listId: PropTypes.string,
      title: PropTypes.string.isRequired,
      cards: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    boards: state.boardReducer,
    lists: state.listReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      moveAllCards: moveAllCards,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMoveAllCards);

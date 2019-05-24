import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteList } from '../../redux/listReducer/actions';
import { Text, SubmitButton } from '../BaseComponent';

class ListDelete extends Component {
  deleteList = () => {
    const { listId, boardId } = this.props;
    this.props.actions.deleteList({
      boardId: boardId,
      listId: listId,
    });
  };

  render() {
    return (
      <>
        <Text>
          All actions will be removed from the activity feed and you won’t be able to re-open the list.
          There is no undo.
        </Text>
        <SubmitButton
          color={'danger'}
          onClick={() => this.deleteList()}
        >
          Delete list
        </SubmitButton>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteList: deleteList,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ListDelete);

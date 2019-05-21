import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editBoardTitle } from '../../../redux/boardReducer/actions';
import ClickOutside from '../../ClickOutside';
import { Input, } from '../../BaseComponent';
import styled from 'styled-components'

const Form = styled.form`
  max-width: calc(100vw - 12rem);
`;

class BoardTitleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.boardTitle || '',
    };
  }

  handleChange = (value) => {
    this.setState({
      title: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    if (!title)  return;
    this.props.actions.editBoardTitle({
      boardId: this.props.boardId,
      boardTitle: title
    });
    this.props.toggleEditTitle()
  };

  render() {
    const { title } = this.state;
    let inputWidth = (title.length + 1) * 13;
    return (
      <ClickOutside toggleOpened={this.props.toggleEditTitle}>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            size={'1.3rem'}
            weight={'600'}
            width={inputWidth + 'px'}
            value={title}
            placeholder="Edit board title"
            onChange={(e) => this.handleChange(e.target.value)}
            onBlur={this.handleSubmit}
            onKeyPress={(e) => inputWidth = ((e.target.value.length + 1) * 13)}
            autoFocus
            spellCheck={false}
          />
        </Form>
      </ClickOutside>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editBoardTitle: editBoardTitle,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(BoardTitleEdit);

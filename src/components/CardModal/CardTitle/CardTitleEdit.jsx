import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editCardTitle } from '../../../redux/cardReducer/actions';
import ClickOutside from '../../ClickOutside';
import { Input, TextArea, } from '../../BaseComponent';
import styled from 'styled-components'

const Form = styled.form`
  width: calc(100% - 2rem);
`;

class CardTitleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.cardTitle || '',
    };
  }

  handleChange = (value) => {
    this.setState({
      title: value,
    });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.toggleEditTitle();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    const { cardId } = this.props;
    if (!title)  return;
    this.props.actions.editCardTitle({
      cardTitle: title,
      cardId: cardId,
    });
    this.props.toggleEditTitle()
  };

  render() {
    const { title } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleEditTitle}>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            margin="0"
            padding=".3rem .5rem"
            size="1.4rem"
            weight="600"
            value={title}
            placeholder="Edit card title"
            onKeyDown={this.handleKeyDown}
            onChange={(e) => this.handleChange(e.target.value)}
            onBlur={this.handleSubmit}
            spellCheck={false}
            autoFocus
          />
        </Form>
      </ClickOutside>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editCardTitle: editCardTitle,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CardTitleEdit);

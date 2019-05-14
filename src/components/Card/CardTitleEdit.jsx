import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editCardTitle } from '../../redux/boardReducer/actions';
import styled from 'styled-components'
import ClickOutside from '../ClickOutside';

const Form = styled.form`
  width: 25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: .3rem .5rem;
  font-size: 1.5rem;
  color: #40424b;
  font-weight: 600;
  border: none;
  box-shadow: none;
`;

class CardTitleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.card.title || '',
    };
  }

  handleChange = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    const { cardIndex, listIndex } = this.props;
    if (!title)  return;
    this.props.actions.editCardTitle({
      cardTitle: title,
      cardIndex: cardIndex,
      listIndex: listIndex,
    });
    this.props.toggleIsTitleEditing()
  };

  render() {
    const { title } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleIsTitleEditing}>
        <Form onSubmit={this.handleSubmit} id="card-edit-form">
          <Input
            autoFocus
            type="text"
            placeholder="Edit card title"
            value={title}
            onChange={(e) => this.handleChange('title', e.target.value)}
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
      editCardTitle: editCardTitle,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(CardTitleEdit);
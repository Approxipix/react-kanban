import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from "../../redux/store";
import { bindActionCreators } from 'redux';
import { addBoard } from '../../redux/boardReducer/actions/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actions, Input, SubmitButton, CancelButton } from '../BaseComponent';
import ClickOutside from "../ClickOutside/ClickOutside";
import styled from 'styled-components';
import PropTypes from "prop-types";

const AddButton = styled.button`
  font-size: 1rem; 
  color: #172b4d;
  font-weight: 600;
  background-color: #dadde3;
  border-radius: .4rem
  transition: background-color .2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: #c8cace;
  }
`;
AddButton.displayName = 'AddButton';

const Container = styled.div`
  height: 100%;
  padding: 1rem .6rem;
  background-color: #dadde3;
  border-radius: .4rem
`;

const ColorPicker = styled.div`
  display: flex;
  padding: .25rem 0;
  margin-bottom: .5rem;
`;
ColorPicker.displayName = 'ColorPicker';

const ColorPickerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  font-size: .7rem;
  color: #fff;
  background-color: ${props => props.color};
  border-radius: .4rem;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: .5rem;
  }
  &:hover {
    box-shadow: inset 0 0 0 10rem rgba(0, 0, 0, .1)
  }
`;

class BoardAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      boardTitle: '',
      boardColor: props.colors[0] || '',
    };
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.toggleOpened();
    }
  };

  handleChange = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened,
      boardTitle: '',
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { boardTitle } = this.state;
    if (!boardTitle) return;
    const boardId = Date.now().toString();
    this.props.actions.addBoard({
      boardTitle: boardTitle,
      boardColor: this.state.boardColor,
      boardId: boardId,
    });
    history.push(`/b/${boardId}`)
  };

  render = () => {
    const { colors } = this.props;
    const { isOpened, boardTitle, boardColor } = this.state;
    return isOpened ? (
      <ClickOutside toggleOpened={this.toggleOpened}>
        <Container color={boardColor}>
          <form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              placeholder="Add board title"
              value={boardTitle}
              onKeyDown={this.handleKeyDown}
              onChange={(e) => this.handleChange('boardTitle', e.target.value)}
              spellCheck={false}
              autoFocus
            />
            <ColorPicker>
              {colors.map((color, index) => (
                <ColorPickerItem
                  key={index}
                  color={color}
                  onClick={() => this.handleChange('boardColor', color)}
                >
                  {boardColor === color && <FontAwesomeIcon icon="check"/>}
                </ColorPickerItem>
              ))}
            </ColorPicker>
            <Actions>
              <SubmitButton type='submit' disabled={!boardTitle}>
                Create board
              </SubmitButton>
              <CancelButton onClick={() => this.toggleOpened()}>
                <FontAwesomeIcon icon="times"/>
              </CancelButton>
            </Actions>
          </form>
        </Container>
      </ClickOutside>
    ) : (
      <AddButton onClick={() => this.toggleOpened()}>
        Create new board...
      </AddButton>
    );
  };
}

BoardAdd.defaultProps = {
  colors: [],
};

BoardAdd.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  return {
    colors: state.rootReducer.colors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addBoard: addBoard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardAdd);

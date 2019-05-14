import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardTitleEdit from './CardTitleEdit';
import CardDescEdit from './CardDescEdit';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 640px;
  max-width: 100%;
  max-height: calc(100% - 8rem);
  padding: 1rem;
  border-radius: .2rem;
  background-color: #fff;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.3rem;
  z-index: 110;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  padding-left: 1.8rem;
`;

const Title = styled.h4`
  padding: .3rem .5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Icon = styled.div`
  position: absolute;
  left: 0;
  top: .6rem;
  font-size: 1rem;
`;


const Col = styled.div`

`;



const SubTitle = styled.h4`

`;

const Actions = styled.h4`

`;

const Button = styled.h4`

`;

const ButtonIcon = styled.h4`

`;

const Description = styled.p`
  padding: .3rem .5rem;
`;

const Close = styled.button`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: transparent;
  border: none;
  outline: none;
`;


class CardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTitleEditing: false,
      isDescEditing: false,
    }
  }

  toggleIsTitleEditing = () => {
    this.setState({
      isTitleEditing: !this.state.isTitleEditing
    })
  };

  toggleIsDescEditing = () => {
    this.setState({
      isDescEditing: !this.state.isDescEditing
    })
  };

  componentDidMount() {
    document.documentElement.classList.add('scroll-disabled');
  }

  componentWillUnmount() {
    document.documentElement.classList.remove('scroll-disabled');
  }


  render() {
    const { card, cardIndex, listIndex } = this.props;
    const { isTitleEditing, isDescEditing } = this.state;
    if (!card) return null;
    return (
      <Backdrop>
        <Close onClick={() => this.props.toggleModal()} />
        <Container onClick={(e) => e.preventDefault()}>
          <CloseButton onClick={() => this.props.toggleModal()}>
            <FontAwesomeIcon icon="times" />
          </CloseButton>
          <Wrapper>
            {!isTitleEditing ? (
              <Title onClick={() => this.toggleIsTitleEditing()}>
                {card.title}
              </Title>
            ) : (
              <CardTitleEdit
                card={card}
                cardIndex={cardIndex}
                listIndex={listIndex}
                toggleIsTitleEditing={this.toggleIsTitleEditing}
              />
            )}
            <Icon>
              <FontAwesomeIcon icon="window-maximize" />
            </Icon>
          </Wrapper>
          <Wrapper>
            <Title>
              Description
            </Title>
            {!isDescEditing ? (
              <Description onClick={() => this.toggleIsDescEditing()}>
                {card.description}
              </Description>
            ) : (
              <CardDescEdit
                card={card}
                cardIndex={cardIndex}
                listIndex={listIndex}
                toggleIsDescEditing={this.toggleIsDescEditing}
              />
            )}
            <Icon>
              <FontAwesomeIcon icon="align-left" />
            </Icon>
          </Wrapper>

                </ButtonIcon>
              </Button>
            </Actions>
          </Col>
        </Container>
      </Backdrop>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const list = board.lists[1];
  // const list = board.lists[ownProps.listIndex];
  const card = list.cards[1];
  // const card = list.cards[ownProps.cardIndex];
  return {
    board: board,
    list: list,
    card: card,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CardModal);

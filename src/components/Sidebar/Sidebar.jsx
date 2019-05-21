import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSidebar } from '../../redux/rootReducer/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navigation from './Navigation'
import ChangeBackground from './ChangeBackground'
import DeleteBoard from './DeleteBoard'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 19rem;
  left: 100%;
  background-color: #F4F5F7;
  box-shadow: 0 .75rem 1.5rem -.375rem rgba(9,30,66,.25);
  transform: ${props => props.isOpened ? 'translateX(-100%)' : 'none'};
  transition: transform .4s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .75rem .5rem;
  border-bottom: 1px solid rgba(9,30,66,.13);
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const Button = styled.button`
  color: #40424b;
  font-size: 1rem;
`;

const Body = styled.div`
   padding: .75rem 1rem;
`;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarView: null,
      sidebarTitle: 'Menu',
    }
  }

  componentWillUnmount() {
    this.props.actions.toggleSidebar(false)
  }

  changeView = (component, title) => {
    this.setState({
      sidebarView: component,
      sidebarTitle: title,
    });
  };

  sidebarView = () => {
    const { board } = this.props;
    const { sidebarView } = this.state;
    switch (sidebarView) {
      case ('ChangeBackground'):
        return <ChangeBackground boardId={board._boardId} boardColor={board.color}/>;
      case ('DeleteBoard'):
        return <DeleteBoard boardId={board._boardId}/>;
      default:
        return <Navigation changeView={this.changeView}/>;
    }
  };

  render() {
    const { isSidebarOpened } = this.props;
    const { sidebarTitle, sidebarView } = this.state;
    return (
      <Wrapper isOpened={isSidebarOpened}>
        <Header>
          <Button
            onClick={() => this.changeView(null, 'Menu')}
            disabled={!sidebarView}
          >
            {!!sidebarView && <FontAwesomeIcon icon="chevron-left"/>}
          </Button>
          <Title>
            {sidebarTitle}
          </Title>
          <Button onClick={() => this.props.actions.toggleSidebar(false)}>
            <FontAwesomeIcon icon="times"/>
          </Button>
        </Header>
        <Body>
          {this.sidebarView()}
        </Body>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardReducer[state.rootReducer.currentBoardID],
    colors: state.rootReducer.colors,
    isSidebarOpened: state.rootReducer.isSidebarOpened,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleSidebar: toggleSidebar,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

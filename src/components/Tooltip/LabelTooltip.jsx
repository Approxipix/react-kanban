import React, { Component } from "react";
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import ClickOutside from "../ClickOutside";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Wrapper = styled.div`
  position: absolute;
  padding: .5rem 1rem;
  width: 15rem;
  top: calc(100% + 1rem);
  left: 50%;
  background-color: #fff;
  border-radius: .2rem;
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
  transform: translateX(-50%);
`;

const Header = styled.div`
  position: relative;
  color: #6b778c;
  padding: 0 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(9,30,66,.13);
`;
const Title = styled.h3``;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const LabelList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const LabelItem = styled.li`
  height: 2rem;
  width: 100%;
  margin-bottom: .5rem;
  background-color: ${props => props.value};
  cursor: pointer;
  border-radius: .2rem;
  &:hover {
    box-shadow: -8px 0 #d9b51c;
  } 
`;

class LabelTooltip extends Component {
  componentDidMount() {
    document.addEventListener('click', this.outerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outerClick);
  }

  outerClick = (e) => {
    let { target } = e;
    if (!!target.closest && (target.closest('.click-outside-wrapper'))) {
      return;
    }
    this.props.toggleLabelTooltip();
  };

  render() {
    return (
      <ClickOutside toggleOpened={this.props.toggleLabelTooltip}>
        <Wrapper className="tooltip-wrapper">
          <Header>
            <Title>
              Label
            </Title>
            <CloseButton onClick={() => this.props.toggleLabelTooltip()}>
              <FontAwesomeIcon icon="times" />
            </CloseButton>
          </Header>
          <LabelList>
            {this.props.labels.map((label, index) => (
              <LabelItem key={index} value={label.color} onClick={() => this.props.handelAddLabel(label)}/>
            ))}
          </LabelList>
        </Wrapper>
      </ClickOutside>
    )
  };
}

function mapStateToProps(state) {
  return {
    labels: state.rootReducer.labels
  }
}

export default connect(mapStateToProps)(LabelTooltip);

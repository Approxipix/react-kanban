import React, { Component } from 'react';
import { Label } from './BaseComponent';
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: .5rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + .5rem);
  left: 0;
  width: 100%;
  max-height: 12rem;
  box-shadow: 0 .25rem .3rem 0 rgba(4, 19, 23, 0.22);
  background-color: #ebecf0;
  opacity: ${props => props.isOpened ? '1' : '0'};
  visibility: ${props => props.isOpened ? 'visible' : 'hidden'};
  transform: translateY(-.5rem);
  transition: .2s all ease-in-out;
  will-change: transform;
  z-index: 20;
  
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0 .75rem;
  outline: none;
  font-size: 1rem;
  line-height: 1.5rem;
  cursor: pointer;
  background-color: transparent;
  text-align: left;
  color: #172b4d;
  transition: all .2s ease-in;
  &:hover {
    color: #fff;
    background-color: #2E7EAF;
  }
`;

const Input = styled.input`
  position: relative;
  min-height: 2rem;
  width: 100%;
  padding: 0 .75rem;
  border: 0;
  background-color: #ebecf0;
  box-shadow: 0 1px 0 0 rgba(9, 30, 66, .13);
  color: #172b4d;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: .25rem;
  cursor: pointer;
  transition: background-color .2s ease-in;
  &:hover {
    background-color: #dfe1e6;
  }
`;

const DropdownTitle = styled.p``;

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };
  }

  toggleDropdown = (isOpened) => {
    this.setState({
      isOpened: typeof isOpened !== 'undefined' ? isOpened : !this.state.isOpened,
    });
  };

  render() {
    let { isOpened } = this.state;
    let {
      value,
      label,
      options,
      onChange,
      placeholder,
    }  = this.props;
    return (
      <Wrapper onBlur={() => this.toggleDropdown(false)}>
        <Label>
          {label}
          <Input
            type="text"
            value={value || ''}
            readOnly={true}
            placeholder={placeholder}
            onClick={() => this.toggleDropdown()}
            onChange={() => this.toggleDropdown(true)}
          />
        </Label>
        <Dropdown isOpened={isOpened}>
          {options.map((option, i) => (
            <DropdownItem
              key={`${option.value}-${i}`}
              type="button"
              tabIndex={-1}
              onMouseDown={() => {
                onChange(option.value);
                this.toggleDropdown(false);
              }}
            >
              <DropdownTitle>
                {option.title}
              </DropdownTitle>
            </DropdownItem>
          ))}
        </Dropdown>
      </Wrapper>
    );
  }
}
export default Select;

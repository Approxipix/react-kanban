import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: .75rem;
  padding-left: 2rem;
`;

const ProgressBar = styled.div`
  position: relative;
  height: .6rem;
  background-color: rgba(9,30,66,.08);
  border-radius: .5rem;
  overflow: hidden;
`;
const Progress = styled.div`
  position: absolute;
  display: block;
  width: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${props => !!props.color ? props.color : '#5ba4cf'};
  width: ${props => props.width}%;
  transition: width 0.2s ease-in-out;
`;

const Label = styled.div`
  position: absolute;
  top: -.25rem;
  right: calc(100% - 1.75rem);
  font-size: .75rem;
  color: #6b778c;
  white-space: nowrap;
`;

const CheckListProgress = (props) => {
  let color, width = 0;
  const
    { items } = props,
    allItems = items.length,
    doneItems = items.filter(item => !!item.status).length;

  if (!!allItems) width = (doneItems * 100) / allItems;
  if (allItems === doneItems) color = '#61bd4f';
  return (
    <Wrapper>
      <ProgressBar>
        <Progress width={width} color={color}/>
      </ProgressBar>
      <Label>{width.toFixed()} %</Label>
    </Wrapper>
  );
};

export default CheckListProgress;

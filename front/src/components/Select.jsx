import { Component } from 'react';
import styled from 'styled-components';

const SelectStyle = styled.div`
  border: 2px solid black;
  border-radius: 15px;
  padding: 10px;
  font-size: 21px;
  margin: 10px;
`;

class Select extends Component {

  render(){
    return (
        <SelectStyle background onClick={this.props.onClick}>

        </SelectStyle>
    );
  };
}

export default Select;

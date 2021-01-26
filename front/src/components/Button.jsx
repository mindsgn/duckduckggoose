import { Component } from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  background: ${props => props.background ? "black" : "none"};
  border: none;
  border: 2px solid white;
  color: white;
  margin: 10px;
  padding: 20px;
  width: 100%;
  border-radius: 15px;
  font-weight: bold;
  outline: none;
`;

class Button extends Component {
  render(){
    return (
        <ButtonStyle
          background
          disabled={this.props.isDisabled}
          onClick={this.props.onClick}>
          {this.props.text}
        </ButtonStyle>
    );
  };
}

export default Button;

import React, { Component } from 'react';
import styled from 'styled-components';

const TitleStyle = styled.div`
  font-weight: bold;
  font-size: 21px;
`;

class Title extends Component {
  render(){
    return (
      <TitleStyle>
        {this.props.text}
      </TitleStyle>
    );
  };
}

export default Title;

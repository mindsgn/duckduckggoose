import { Component } from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";

const TitleStyle = styled.div`
  font-weight: bold;
  font-size: 21px;
  color: black;
`;

class Title extends Component {
  render(){
    return (
      <motion.div
        animate={{ scale: [0, 1] }}
        transition={{ duration: 0.5 }}>
        <TitleStyle>
          {this.props.text}
        </TitleStyle>
      </motion.div>
    );
  };
}

export default Title;

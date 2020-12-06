import { Component } from 'react';
import styled from 'styled-components';
import Row from './Row';
import Column from './Column';
import Button from './Button';
import FormContainer from './FormContainer';
import Title from './Title';
import Input from './Input';
import Grid from './Grid';
import Select from './Select';
import { createStore } from 'matrix-display-store';
import { LEDMatrix } from 'led-matrix';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { SketchPicker } from 'react-color';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { update, on, off } from './../redux/action';

const MainStyle = styled.div`
  display: flex;
  padding: 20px;
  padding-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const store = createStore(32, 16);

class Main extends Component {
  constructor(props){
     super(props);
     this.state = {
       text: '',
       color: {
         r: '241',
         g: '112',
         b: '19',
         a: '1',
        },
     }
     this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  handleNameChange(event){
    this.setState({text: event.target.value});
  }


  render(){
   const { update, off, on } = this.props;

   return (
     <MainStyle>
      <Row>
        <Input placeholder='whats on our mind?.' onChange={this.handleNameChange}/>
      </Row>
      <Row>
        <Button text={'Post'} onClick={() => this.props.update(this.state.text, this.state.color) }/>
      </Row>
      <Row>
        <Button text={'on'} onClick={() => this.props.on() }/>
      </Row>
      <Row>
        <Button text={'off'} onClick={() => this.props.off() }/>
      </Row>
     </MainStyle>
   );
 }
}

Main.propTypes = {
  update: PropTypes.func.isRequired,
  off: PropTypes.func.isRequired,
  on: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  disable: state.states.disable
});

export default connect(mapStateToProps, { update, on, off })(Main);

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
import { A } from './../redux/constant';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { update, start, off } from './../redux/action';

const MainStyle = styled.div`
  display: flex;
  padding: 20px;
  padding-top: 80px;
  justify-content: center;
  align-items: center;
`;

const store = createStore(32, 16);

class Main extends Component {
  constructor(props){
     super(props);
     this.state={
       book: false,
       type: null,
       onceOff: false,
       date: null,
     }
     this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
  }

  drawShape(shape){
  }

  twinkle(){
    while(true){
      var min = Math.ceil(0);
      var max = Math.floor(500);
      console.log('update')
      this.props.update(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  }

  render(){
   const { update, start, off } = this.props;
   let data = {};
   data.total = 500;
   data.x = 50;
   data.y = 10;
   let pixels = [];
   let positionx = [];
   let positiony = [];
	 let color = [];
   let x = 0;
   let y = 0;
   let number = 0;

   for(var a = 0; a < data.total; a++){
     pixels.push('A'+a);
     if(number == 50){
       x = 0;
       y = y + 10;
       number = 0
     }
     positionx.push(x);
     positiony.push(y);
     x = x + 10;
     number++;
   }

   number = 0

   var letters = '0123456789ABCDEF';
   color = '#';

   const pixels_ = pixels.map((pixel, i) => {
      this.props.update(i);
      color = '#'

      for (var c = 0; c < 6; c++) {
          color += letters[Math.floor(Math.random() * 16)];
      }

     return <Rect
		 	key={color}
			x={positionx[i]}
			y={positiony[i]}
			width={10}
			height={10}
			fill={'black'}
			onClick={() => this.props.update(i)}/>
   });

   return (
     <MainStyle>
      <Row>
        <Button text={'Post'} onClick={() => update(1) }/>
        <Button text={'Twinkle'} onClick={() => this.twinkle() }/>
        <Button text={'Draw'} onClick={() => this.draw() }/>
        <Button text={'Start'} onClick={() => start() }/>
        <Button text={'Off'} onClick={() => off() }/>
      </Row>
     </MainStyle>
   );
 }
}

Main.propTypes = {
  update: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  off: PropTypes.func.isRequired,
  disable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  disable: state.states.disable
});

export default connect(mapStateToProps, { update, start, off })(Main);

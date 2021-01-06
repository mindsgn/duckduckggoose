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
import  io  from "socket.io-client";

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { update, on, off } from './../redux/action';
let socket = io("https://gooseapp.herokuapp.com/");

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
       click: false,
       isScrolling: false,
       color: {
         r: '241',
         g: '112',
         b: '19',
         a: '1',
        },
      background: {
          r: '244',
          g: '230',
          b: '230',
          a: '1',
        },
     }
     this.handleNameChange = this.handleNameChange.bind(this);
  }

  //handle text change
  handleTextChange = (color) => {
    this.setState({ color: color.rgb })
  };

  //change backgroundColor
  handleBackgroundChange = (color) => {
    this.setState({ background: color.rgb })
  };

  //update Text
  updateText(text, color, background){
    this.setState({click:true});
    try{
      console.log(text);
        let data = {
          text: text,
          color: color,
          background: background,
        }
        socket.emit('scroll', data)
        setTimeout(() => {this.setState({click:false}) }, 4000);
    }catch(error){
      console.log(error);
    }
  }

  allOff(){
    socket.emit('all-off');
  }

  allOn(){
    socket.emit('all-on');
  }

  handleNameChange(event){
    this.setState({text: event.target.value});
  }

  componentDidMount(){
    socket.emit('update');

    socket.on('done',() => {
      console.log('done')
      this.updateMe();
    });
  }

  updateMe(){
    console.log("update");
  }

  render(){
   const { update, off, on } = this.props;

   return (
     <MainStyle>
      <Row>
        <Input placeholder='whats on our mind?.' onChange={this.handleNameChange}/>
      </Row>
      <Row>
        {
          !this.state.click?
            <Button text={'Post'} onClick={() => this.updateText(this.state.text, this.state.color, this.state.background) }/>
            :
            null
        }
      </Row>
      <Row>
        <Title text={'Text'} />
      </Row>
      <Row>
        <Title text="Text Color" />
        <Column>
          <SketchPicker
            color={ this.state.color }
            onChange={ this.handleTextChange } />
        </Column>
        <Column>
          <SketchPicker
            color={ this.state.background }
            onChange={ this.handleBackgroundChange } />
        </Column>
      </Row>
      <Row>
        <Title text={'Background'} />
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

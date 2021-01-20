import { Component } from 'react';
import styled from 'styled-components';
import Row from './Row';
import BR from './Break';
import Button from './Button';
import Input from './Input';
import Title from './Title';
import { SketchPicker } from 'react-color';
import  io  from "socket.io-client";

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { update, on, off } from './../redux/action';
let socket = io("https://gooseapp.herokuapp.com/",  { transports: ["websocket"] });

const MainStyle = styled.div`
  display: flex;
  padding: 20px;
  padding-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RangeInput = styled.input`
  width: 100vw;
`;

class Main extends Component {
  constructor(props){
     super(props);
     this.state = {
       text: '',
       click: false,
       isScrolling: false,
       speed: 0,
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
     this.handleSpeedChange = this.handleSpeedChange.bind(this);
  }

  //handle text change
  handleTextChange = (color) => {
    this.setState({ color: color.rgb })
    socket.emit('color-change', {color: color})
  };

  //handle text change
  handleSpeedChange = (speed) => {
    this.setState({ color: speed })
    console.log(speed)
  };

  //change backgroundColor
  handleBackgroundChange = (color) => {
    this.setState({ background: color.rgb })
    socket.emit('background-change', {color: color})
  };

  //update Text
  updateText(text, color, background, speed){
    this.setState({click:true});
    try{
      console.log(text);
        let data = {
          text: text,
          color: color,
          background: background,
          speed: speed
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

   return (
     <MainStyle>
      <Row>
        <Input placeholder='whats on our mind?.' onChange={this.handleNameChange}/>
      </Row>
      <BR />
      <Row>
        <Title text={'Speed'}/>
      </Row>
      <Row>
        <RangeInput type="range" name="speed" id="speed" min="0" max="100" step="1"  onChange={this.handleSpeedChange}/>
      </Row>
      <BR />
      <Row>
        <Row>
          <SketchPicker
            color={ this.state.color }
            onChange={ this.handleTextChange } />
        </Row>
        <Row>
          <SketchPicker
            color={ this.state.background }
            onChange={ this.handleBackgroundChange } />
        </Row>
      </Row>
      <BR />
      <Row>
        {
          !this.state.click?
            <Button text={'Post'} onClick={() => this.updateText(this.state.text, this.state.color, this.state.background, this.state.speed) }/>
            :
            null
        }
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

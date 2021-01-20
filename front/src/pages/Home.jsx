import { Component } from 'react';
import Navigation from './../components/Navigation';
import Container from './../components/Container';
import Main from './../components/Main';

class App extends Component {
  render(){
    return (
      <Container>
        <Navigation />
        <Main/>
      </Container>
    );
  }
}

export default App;

import { Component } from 'react';
import Navigation from './../components/Navigation';
import Container from './../components/Container';
import Main from './../components/Main';
import Footer from './../components/Footer';
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render(){
    return (
      <Container>
        <Navigation />
        <Main/>
        <Footer />
      </Container>
    );
  }
}

export default App;

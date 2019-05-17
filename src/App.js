import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import { getSecretWord } from "./actions";
import Input from './Input';

class App extends Component {
  render() {
    return (
      <div className="container" data-test="component-app">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord }) => {
  return {
    success,
    guessedWords,
    secretWord
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSecretWord: () => dispatch(getSecretWord())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

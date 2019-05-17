import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import { getSecretWord } from "./actions";
import Input from './Input';

export class UnconnectedApp extends Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSecretWord();
  }
  render() {
    return (
      <div className="container" data-test="component-app">
        <h1>Jotto</h1>
        <p>The secret word is {this.props.secretWord}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp);

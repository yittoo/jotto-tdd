import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions";

export class UnconnectedInput extends Component {
  /**
   * Create ref for input box and set initial state
   * @method constructor
   * @param {object} props
   * @returns {undefined} 
   */
  constructor(props){
    super(props);
    this.inputBox = React.createRef();
    this.state = {
      guess: ""
    }
  }
  /**
   * Submits guess with current state `guess`
   * @function onSubmit
   * @param {object} event
   * @returns {undefined}
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.props.guessWord(this.state.guess);
    this.setState({guess: ""});
  }

  /**
   * Render the component
   * @method render
   * @returns {JSX.Element} - Rendered component
   */
  render() {
    const contents = this.props.success ? null : (
      <form className="form-inline" onSubmit={(event) => event.preventDefault()}>
        <input
          data-test="input-box"
          ref={this.inputBox}
          className="mb-2 mx-sm-3"
          id="word-guess"
          type="text"
          placeholder="enter guess"
          value={this.state.guess}
          onChange={event => this.setState({guess: event.target.value})}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          type="submit"
          onClick={() => {
            this.props.guessWord(this.state.guess)
            this.setState({ guess: "" });
          }}
        >
          Submit
        </button>
      </form>
    );
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

const mapDispatchToProps = dispatch => {
  return {
    guessWord: () => dispatch(guessWord())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedInput);

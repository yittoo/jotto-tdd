import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from "./Input";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<Input store={store} />)
    .dive()
    .dive();
};

describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    it("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    it("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    it("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });
  describe("word has been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    it("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    it("does not renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    it("does not renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  it("has success piece of state as prop", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  it("`guessWord` action creator is a function prop", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe("input field", () => {
  let wrapper, inputBox;
  beforeEach(() => {
    const props = { success: false };
    wrapper = shallow(<UnconnectedInput {...props} />);
    inputBox = findByTestAttr(wrapper, "input-box");
  });
  it("state updates after `input-box` onChange is called", () => {
    const event = { target: { value: "train" } };
    inputBox.simulate("change", event);
    expect(wrapper.state("guess")).toBe(event.target.value);
  });
});

describe("`guessWord` action creator call", () => {
  let guessWordMock, wrapper, button;
  beforeEach(() => {
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
      success: false
    };
    wrapper = shallow(<UnconnectedInput {...props} />);
    button = findByTestAttr(wrapper, "submit-button");
  });
  it("should call when button is clicked", () => {
    // simulate click
    button.simulate("click");
    const getGuessWordCallCount = guessWordMock.mock.calls.length;
    expect(getGuessWordCallCount).toBe(1);
  });
  it("should clear guess input after call", () => {
    // wrapper setState
    wrapper.setState({ guess: "train" });
    // find button and simulate click
    button.simulate("click");
    // expect input to clear after submit
    const expectedState = { guess: "" };
    expect(wrapper.state("guess")).toBe(expectedState.guess);
  });
  it("should dispatch with correct arguments", () => {
    const guess = "train";
    // wrapper setState
    wrapper.setState({ guess });
    // find button and simulate click
    button.simulate("click");
    // expect mock function to be called with "train"
    expect(guessWordMock.mock.calls[0][0]).toBe(guess);
  });
});

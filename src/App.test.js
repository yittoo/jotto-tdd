import React from "react";
import { shallow } from "enzyme";

import App from "./App";
import { findByTestAttr, storeFactory } from "../test/testUtils";

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<App store={store} />)
    .dive()
    .dive();
};

it("renders without crashing", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("redux props", () => {
  it("has `success` piece of state as prop", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  it("has `secretWord` piece of state as prop", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  it("has `guessedWords` piece of state as prop", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  it("has `getSecretWord` action creator as a function on the props", () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

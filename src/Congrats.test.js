import React from "react";
import { shallow } from "enzyme";
import "./setupTests";

import { findByTestAttr } from "../test/testUtils";
import Congrats from "./Congrats";

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 * @param {Object} props
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  return shallow(<Congrats {...props} />);
};

describe("Congrats component", () => {
  it("renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.length).toBe(1);
  });

  it("renders no text when `success` prop is false", () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.text()).toBe("");
  });

  it("renders non-empty congrats message when `success` prop is true", () => {
    const wrapper = setup({ success: true });
    const message = findByTestAttr(wrapper, "component-message");
    expect(message.text().length).not.toBe(0);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "../NumberInput";

const onChange = jest.fn();
const defaultProps = {
  value: 0,
  defaultValue: 0,
  min: 0,
  max: 2000,
  step: 10,
  dataTestId: "number-input",
  onChange,
};
const renderComponent = (props = {}) => {
  const customProps = { ...defaultProps, ...props };

  return {
    user: userEvent.setup(),
    ...render(<NumberInput {...customProps} />),
  };
};

describe("NumberInput component", () => {
  it("renders with default props", () => {
    renderComponent();

    const inputElement = screen.getByTestId("number-input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(0);
  });

  it("does not trigger setTime while typing", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "150");

    expect(timeInput).toHaveValue(150);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("removes focus and changes value when clicking outside the input field", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "200");
    await user.tab(); // clicks outside the input field by tabbing away

    expect(timeInput).toHaveValue(200);
    expect(onChange).toHaveBeenCalledWith(200); // Value change on blur
  });

  // TODO: fix user.type arrowup and arrowdown
  // issue: https://github.com/testing-library/user-event/issues/1066
  it.skip("pressing up/down arrow keys changes value", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "{arrowup}");

    expect(timeInput).toHaveValue(10);
    expect(onChange).toHaveBeenCalledWith(10);

    await user.clear(timeInput);
    await user.type(timeInput, "{arrowdown}");

    expect(timeInput).toHaveValue(0);
    expect(onChange).toHaveBeenCalledWith(0);

    await user.clear(timeInput);
    await user.type(timeInput, "23");
    await user.type(timeInput, "{arrowup}");

    expect(timeInput).toHaveValue(30);
    expect(onChange).toHaveBeenCalledWith(30);
  });

  it("pressing Enter confirms new value and removes focus", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "150");
    await user.keyboard("{enter}");

    expect(timeInput).toHaveValue(150);
    expect(onChange).toHaveBeenCalledWith(150);
    expect(document.activeElement).not.toBe(timeInput); // focus removed
  });

  it("pressing Escape reverts to original value and removes focus", async () => {
    const { user } = renderComponent({ value: 100 });
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "200");
    await user.keyboard("{escape}");

    expect(timeInput).toHaveValue(100);
    expect(onChange).not.toHaveBeenCalled();
    expect(document.activeElement).not.toBe(timeInput); // focus removed
  });

  it("removes leading zeros automatically", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "0050");
    await user.keyboard("{enter}");

    expect(timeInput).toHaveValue(50);
    expect(onChange).toHaveBeenCalledWith(50);
  });

  it("adjusts negative values to minimum allowed value", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "-10");
    await user.keyboard("{enter}");

    expect(timeInput).toHaveValue(0);
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("adjusts exceeding values to maximum allowed value", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "2500");
    await user.keyboard("{enter}");

    expect(timeInput).toHaveValue(2000);
    expect(onChange).toHaveBeenCalledWith(2000);
  });

  it("round decimal values and integer values to the nearest integer", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "99.7");
    await user.keyboard("{enter}");

    expect(timeInput).toHaveValue(100);
    expect(onChange).toHaveBeenCalledWith(100);

    await user.clear(timeInput);
    await user.type(timeInput, "23");
    await user.keyboard("{enter}");

    expect(timeInput).toHaveValue(20);
    expect(onChange).toHaveBeenCalledWith(20);
  });

  it("reverts to previous valid value on invalid (non-numeric) input", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("number-input");

    await user.clear(timeInput);
    await user.type(timeInput, "abc");
    await user.tab(); // clicks outside the input field

    expect(timeInput).toHaveValue(0); // reverts to previous valid value
  });
});

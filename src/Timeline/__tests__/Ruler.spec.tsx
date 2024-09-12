import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Ruler } from "../Ruler";

const onTimeChangeMock = jest.fn();
const defaultProps = { time: 0, onTimeChange: onTimeChangeMock };

const renderComponent = (props = {}) => {
  const customProps = { ...defaultProps, ...props };

  return {
    user: userEvent.setup(),
    ...render(<Ruler {...customProps} />),
  };
};

describe("Ruler component", () => {
  it("sets time on double click", () => {
    renderComponent();

    const ruler = screen.getByTestId("ruler");

    // simulate double-click
    fireEvent.doubleClick(ruler, { clientX: 45 });

    expect(onTimeChangeMock).toHaveBeenCalledWith(50);
  });

  it("updates time while dragging", () => {
    renderComponent();

    const ruler = screen.getByTestId("ruler");

    // simulate mouse drag and move
    fireEvent.mouseDown(ruler, { clientX: 30 });
    fireEvent.mouseMove(ruler, { clientX: 95 });
    fireEvent.mouseUp(ruler);

    expect(onTimeChangeMock).toHaveBeenCalledWith(100);
  });
});

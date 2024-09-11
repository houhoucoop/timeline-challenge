import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Ruler } from "../Ruler";

const setTimeMock = jest.fn();
const defaultProps = { time: 0, setTime: setTimeMock };

const renderComponent = (props = {}) => {
  const customProps = { ...defaultProps, ...props };

  return {
    user: userEvent.setup(),
    ...render(<Ruler {...customProps} />),
  };
};

describe("Ruler component", () => {
  it("sets time on double click", async () => {
    renderComponent();

    const ruler = screen.getByTestId("ruler");

    // simulate double-click
    fireEvent.doubleClick(ruler, { clientX: 45 });

    expect(setTimeMock).toHaveBeenCalledWith(50);
  });

  it("updates time while dragging", async () => {
    renderComponent();

    const ruler = screen.getByTestId("ruler");

    // simulate mouse drag and move
    fireEvent.mouseDown(ruler, { clientX: 30 });
    fireEvent.mouseMove(ruler, { clientX: 95 });
    fireEvent.mouseUp(ruler);

    expect(setTimeMock).toHaveBeenCalledWith(100);
  });
});

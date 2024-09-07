import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlayControls } from "../index";

const setTimeMock = jest.fn();
const renderComponent = (props = { time: 0, setTime: setTimeMock }) => {
  return {
    user: userEvent.setup(),
    ...render(<PlayControls {...props} />),
  };
};

describe("PlayControls component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component with initial time", () => {
    renderComponent();

    const timeInput = screen.getByTestId("time");
    const maxTimeInput = screen.getByTestId("max-time");

    expect(screen.getByTestId("play-controls")).toBeInTheDocument();
    expect(timeInput).toHaveValue(0);
    expect(maxTimeInput).toHaveValue(2000);
  });
});

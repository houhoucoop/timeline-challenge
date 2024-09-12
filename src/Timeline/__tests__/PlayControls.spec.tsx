import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlayControls } from "../PlayControls";

const onTimeChangeMock = jest.fn();
const onDurationTimeChangeMock = jest.fn();
const defaultProps = {
  time: 0,
  onTimeChange: onTimeChangeMock,
  durationTime: 2000,
  onDurationTimeChange: onDurationTimeChangeMock,
};
const renderComponent = (props = {}) => {
  const customProps = { ...defaultProps, ...props };

  return {
    user: userEvent.setup(),
    ...render(<PlayControls {...customProps} />),
  };
};

describe("PlayControls component", () => {
  it("renders component with initial time", () => {
    renderComponent();

    const timeInput = screen.getByTestId("time");
    const durationTimeInput = screen.getByTestId("max-time");

    expect(screen.getByTestId("play-controls")).toBeInTheDocument();
    expect(timeInput).toHaveValue(0);
    expect(durationTimeInput).toHaveValue(2000);
  });

  it("updates current time to be within the duration range", async () => {
    const { user } = renderComponent();
    const timeInput = screen.getByTestId("time");

    await user.type(timeInput, "3000");
    await user.keyboard("{enter}");

    expect(timeInput).toHaveValue(2000);
  });

  it("ensures duration is always between 100ms and 6000ms", async () => {
    const { user } = renderComponent();
    const durationTimeInput = screen.getByTestId("max-time");

    // setting the duration to a value less than 100ms
    await user.type(durationTimeInput, "50");
    await user.keyboard("{enter}");
    expect(durationTimeInput).toHaveValue(100);

    // setting the duration to a value more than 6000ms
    await user.type(durationTimeInput, "7000");
    await user.keyboard("{enter}");
    expect(durationTimeInput).toHaveValue(6000);
  });
});

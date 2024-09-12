import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Timeline } from "../Timeline";

const renderComponent = () => {
  return {
    user: userEvent.setup(),
    ...render(<Timeline />),
  };
};

describe("Timeline component", () => {
  it("updates time and Playhead position when double-clicking on the Ruler", async () => {
    renderComponent();

    const ruler = screen.getByTestId("ruler");

    // Simulate a double-click at position 100px
    fireEvent.doubleClick(ruler, { clientX: 45 });

    const playhead = screen.getByTestId("playhead");
    const playheadStyle = window.getComputedStyle(playhead);

    expect(playheadStyle.transform).toBe("translateX(50px)");
  });

  it("updates playhead position on dragging the ruler", async () => {
    renderComponent();

    const ruler = screen.getByTestId("ruler");

    fireEvent.mouseDown(ruler, { clientX: 30 });
    fireEvent.mouseMove(ruler, { clientX: 95 });
    fireEvent.mouseUp(ruler);

    const playhead = screen.getByTestId("playhead");
    const playheadStyle = window.getComputedStyle(playhead);

    expect(playheadStyle.transform).toBe("translateX(100px)");
  });

  it("updates Ruler length when duration changes", async () => {
    renderComponent();

    const durationTimeInput = screen.getByTestId("max-time");
    const segments = screen.getAllByTestId("segment");

    expect(segments).toHaveLength(10);

    segments.forEach((segment) => {
      expect(segment.style.width).toBe("2000px");
    });

    await userEvent.clear(durationTimeInput);
    await userEvent.type(durationTimeInput, "3000");
    await userEvent.tab();

    segments.forEach((segment) => {
      expect(segment.style.width).toBe("3000px");
    });
  });

  describe("Horizontal scroll", () => {
    it("synchronizes horizontal scroll between Ruler and KeyframeList", () => {
      renderComponent();

      const ruler = screen.getByTestId("ruler");
      const keyframeList = screen.getByTestId("keyframe-list");

      expect(ruler.scrollLeft).toBe(0);
      expect(keyframeList.scrollLeft).toBe(0);

      // simulate horizontal scroll on the Ruler component
      fireEvent.scroll(ruler, { target: { scrollLeft: 100 } });
      expect(keyframeList.scrollLeft).toBe(100);

      // simulate horizontal scroll on the KeyframeList component
      fireEvent.scroll(keyframeList, { target: { scrollLeft: 200 } });
      expect(ruler.scrollLeft).toBe(200);
    });

    it("should move Playhead with scroll and hide when reaching the left border", () => {
      renderComponent();

      let playheadStyle;
      const ruler = screen.getByTestId("ruler");
      const playhead = screen.getByTestId("playhead");

      const initialPlayheadStyle = window.getComputedStyle(playhead);
      expect(initialPlayheadStyle.visibility).toBe("visible");

      // test scroll to left
      fireEvent.scroll(ruler, { target: { scrollLeft: 200 } });
      playheadStyle = window.getComputedStyle(playhead);
      expect(playheadStyle.transform).toBe("translateX(-200px)");
      expect(playheadStyle.visibility).toBe("hidden");

      // test scroll to right
      fireEvent.scroll(ruler, { target: { scrollLeft: 0 } });
      playheadStyle = window.getComputedStyle(playhead);
      expect(playheadStyle.transform).toBe("translateX(0px)");
      expect(playheadStyle.visibility).toBe("visible");
    });
  });

  describe("Vertical scroll", () => {
    it("synchronizes vertical scroll between TrackList and KeyframeList", () => {
      renderComponent();

      const trackList = screen.getByTestId("track-list");
      const keyframeList = screen.getByTestId("keyframe-list");

      expect(trackList.scrollTop).toBe(0);
      expect(keyframeList.scrollTop).toBe(0);

      // simulate horizontal scroll on the TrackList component
      fireEvent.scroll(trackList, { target: { scrollTop: 100 } });
      expect(keyframeList.scrollTop).toBe(100);

      // simulate horizontal scroll on the KeyframeList component
      fireEvent.scroll(keyframeList, { target: { scrollTop: 200 } });
      expect(trackList.scrollTop).toBe(200);
    });
  });
});

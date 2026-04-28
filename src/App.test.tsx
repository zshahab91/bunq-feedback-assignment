import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { ThemeProvider } from "./app/contexts/ThemeContext";

describe("Feature rating flow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("shows thank-you then closes after a POSITIVE rating", async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText("Thanks for your feedback!")).not.toBeInTheDocument();
    expect(screen.getByText("How would you rate this feature?")).toBeInTheDocument();
  });

  it("asks for feedback on NEGATIVE rating, then shows thank-you and closes", async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Not good" }));

    expect(screen.getByText("How can we improve?")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Please enter at least 3 characters.")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Your feedback"), {
      target: { value: "Needs clearer copy" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText("Thanks for your feedback!")).not.toBeInTheDocument();
    expect(screen.getByText("How would you rate this feature?")).toBeInTheDocument();
  });

  it("shows Trustpilot prompt after STELLAR thank-you timeout", async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Excellent" }));

    expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Enjoying bunq?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Leave a Trustpilot review" })).toBeInTheDocument();
  });

  it("navigates back from feedback to rating", async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Not good" }));
    expect(screen.getByText("How can we improve?")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Back to rating" }));
    expect(screen.getByText("How would you rate this feature?")).toBeInTheDocument();
  });

  it("navigates back from trustpilot to rating", async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Excellent" }));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Enjoying bunq?")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Back to rating" }));
    expect(screen.getByText("How would you rate this feature?")).toBeInTheDocument();
  });
});

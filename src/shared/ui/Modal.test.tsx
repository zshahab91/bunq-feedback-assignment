import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import Modal from "./Modal";

function ModalHarness() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>
      <button type="button">Outside action</button>
      <Modal isOpen={isOpen} titleId="modal-title">
        <h3 id="modal-title">Test modal</h3>
        <button type="button">First action</button>
        <button type="button" onClick={() => setIsOpen(false)}>
          Close modal
        </button>
      </Modal>
    </>
  );
}

describe("Modal accessibility behavior", () => {
  it("traps focus with Tab and Shift+Tab", () => {
    render(<ModalHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Open modal" }));

    const firstAction = screen.getByRole("button", { name: "First action" });
    const closeAction = screen.getByRole("button", { name: "Close modal" });

    closeAction.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(firstAction);

    firstAction.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(closeAction);
  });

  it("restores focus to the previously focused element when closed", () => {
    render(<ModalHarness />);

    const openButton = screen.getByRole("button", { name: "Open modal" });
    openButton.focus();

    fireEvent.click(openButton);
    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));

    expect(document.activeElement).toBe(openButton);
  });
});

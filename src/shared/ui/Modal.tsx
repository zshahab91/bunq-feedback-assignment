import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";
import "./Modal.css";

type ModalProps = PropsWithChildren<{
    isOpen: boolean;
    onBack?: () => void;
    titleId?: string;
}>;

const Modal = ({ isOpen, onBack, titleId, children }: ModalProps) => {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const previousFocusedElement =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;

        panelRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Tab") return;

            const panel = panelRef.current;
            if (!panel) return;

            const focusableElements = panel.querySelectorAll<HTMLElement>(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements.length === 0) {
                event.preventDefault();
                panel.focus();
                return;
            }

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];
            const activeElement = document.activeElement;

            if (event.shiftKey && activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previousFocusedElement?.focus();
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div
                ref={panelRef}
                className="modal-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
            >
                {onBack && (
                    <button
                        type="button"
                        className="modal-back"
                        onClick={onBack}
                        aria-label="Back to rating"
                    >
                        &#8592; Back
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export type { ModalProps };
export default Modal;

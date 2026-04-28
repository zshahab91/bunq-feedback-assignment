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
        panelRef.current?.focus();
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

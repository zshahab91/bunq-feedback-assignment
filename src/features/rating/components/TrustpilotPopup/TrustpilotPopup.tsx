import { useId } from "react";
import Modal from "../../../../shared/ui/Modal";
import "./TrustpilotPopup.css";

type TrustpilotPopupProps = {
  isOpen: boolean;
  onBack?: () => void;
  onCtaClick?: () => void;
};

export const TrustpilotPopup = ({ isOpen, onBack, onCtaClick }: TrustpilotPopupProps) => {
  const titleId = useId();

  return (
    <Modal isOpen={isOpen} onBack={onBack} titleId={titleId}>
      <div className="trustpilot-popup-content">
        <h3 id={titleId} className="trustpilot-popup-title">Enjoying bunq?</h3>
        <p className="trustpilot-popup-text">Would you leave us a quick review on Trustpilot?</p>
        <button
          type="button"
          className="trustpilot-popup-button"
          onClick={() => {
            if (onCtaClick) {
              onCtaClick();
              return;
            }

            window.open("https://www.trustpilot.com", "_blank", "noopener,noreferrer");
          }}
        >
          Leave a Trustpilot review
        </button>
      </div>
    </Modal>
  );
};
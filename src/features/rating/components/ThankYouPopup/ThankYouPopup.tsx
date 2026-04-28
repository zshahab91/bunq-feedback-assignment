import { useId } from "react";
import Modal from "../../../../shared/ui/Modal";
import "./ThankYouPopup.css";

type ThankYouPopupProps = {
  isOpen: boolean;
};

export const ThankYouPopup = ({ isOpen }: ThankYouPopupProps) => {
  const titleId = useId();

  return (
    <Modal isOpen={isOpen} titleId={titleId}>
      <div className="thankyou-popup-content">
        <h3 id={titleId} className="thankyou-popup-title">Thanks for your feedback!</h3>
        <p className="thankyou-popup-text">Your input helps us improve the experience.</p>
      </div>
    </Modal>
  );
};
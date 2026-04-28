import { useId } from "react";
import Modal from "../../../../shared/ui/Modal";
import type { RatingType } from "../../types";
import "./RatingPopup.css";

type Props = {
    isOpen: boolean;
    onSelect: (rating: RatingType) => void;
};

const ratingOptions: Array<{ value: RatingType; emoji: string; label: string }> = [
    { value: "negative", emoji: "👎", label: "Not good" },
    { value: "positive", emoji: "👍", label: "Good" },
    { value: "stellar", emoji: "⭐", label: "Excellent" }
];

export const RatingPopup = ({ isOpen, onSelect }: Props) => {
    const titleId = useId();

    return (
        <Modal isOpen={isOpen} titleId={titleId}>
            <h3 id={titleId} className="rating-popup-title">How would you rate this feature?</h3>

            <div className="rating-popup-actions" role="group" aria-label="Feature rating options">
                {ratingOptions.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        className="rating-popup-button"
                        aria-label={option.label}
                        onClick={() => onSelect(option.value)}
                    >
                        <span aria-hidden="true" className="rating-popup-emoji">{option.emoji}</span>
                        <span className="rating-popup-label">{option.label}</span>
                    </button>
                ))}
            </div>
        </Modal>
    );
};
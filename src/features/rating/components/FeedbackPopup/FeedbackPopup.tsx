import { useId, useState, type ComponentProps } from "react";
import { z } from "zod";
import Modal from "../../../../shared/ui/Modal";
import "./FeedbackPopup.css";

const feedbackSchema = z.string().trim().min(3, "Please enter at least 3 characters.");

type FeedbackPopupProps = {
  isOpen: boolean;
  onSubmit: () => void;
  onBack?: () => void;
};

export const FeedbackPopup = ({ isOpen, onSubmit, onBack }: FeedbackPopupProps) => {
  const titleId = useId();
  const textareaId = useId();
  const errorId = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    const result = feedbackSchema.safeParse(value);

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please enter valid feedback.");
      return;
    }

    setError("");
    setValue("");
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onBack={onBack} titleId={titleId}>
      <h3 id={titleId} className="feedback-popup-title">How can we improve?</h3>

      <form className="feedback-popup-form" onSubmit={handleSubmit} noValidate>
        <label className="feedback-popup-label" htmlFor={textareaId}>
          Your feedback
        </label>
        <textarea
          id={textareaId}
          className="feedback-popup-textarea"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) {
              setError("");
            }
          }}
          rows={4}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          placeholder="Tell us what did not work as expected..."
        />
        {error && (
          <p id={errorId} className="feedback-popup-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="feedback-popup-submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};
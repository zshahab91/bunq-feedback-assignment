import { useState, useTransition } from "react";
import type { FlowState, RatingType } from "../types";
import { useAutoClose } from "./useAutoClose";

export function useRatingFlow() {
    const [state, setState] = useState<FlowState>({ step: "rating" });
    const [isPending, startTransition] = useTransition();

    useAutoClose(state.step, 2000, () => {
        if (state.step !== "thankyou") {
            return;
        }

        setState(state.rating === "stellar" ? { step: "trustpilot" } : { step: "rating" });
    });

    const handleRatingSelect = (selectedRating: RatingType) => {
        startTransition(() => {
            if (selectedRating === "negative") {
                setState({ step: "feedback" });
            } else {
                setState({ step: "thankyou", rating: selectedRating });
            }
        });
    };

    const handleFeedbackSubmit = () => {
        setState({ step: "thankyou", rating: "negative" });
    };

    const goToRating = () => {
        setState({ step: "rating" });
    };


    return {
        state,
        isPending,
        handleRatingSelect,
        handleFeedbackSubmit,
        goToRating,
    }
}
import { useEffect, useRef, useState, useTransition } from "react";
import type { FlowStep, RatingType } from "../types";

export function useRatingFlow() {
    const [step, setStep] = useState<FlowStep>("rating");
    const [isPending, startTransition] = useTransition();
    const timeoutRef = useRef<number | null>(null);

    const clearPendingTimeout = () => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const scheduleStepChange = (nextStep: FlowStep, delayMs: number) => {
        clearPendingTimeout();
        timeoutRef.current = window.setTimeout(() => {
            setStep(nextStep);
            timeoutRef.current = null;
        }, delayMs);
    };

    const handleRatingSelect = (selectedRating: RatingType) => {
        startTransition(() => {
            if (selectedRating === "negative") {
                setStep("feedback");
            } else {
                setStep("thankyou");
                scheduleStepChange(selectedRating === "stellar" ? "trustpilot" : "rating", 2000);
            }
        });
    };

    const handleFeedbackSubmit = () => {
        setStep("thankyou");
        scheduleStepChange("rating", 2000);
    };

    const goToRating = () => {
        clearPendingTimeout();
        setStep("rating");
    };

    useEffect(() => {
        return () => {
            clearPendingTimeout();
        };
    }, []);


    return {
        step,
        isPending,
        handleRatingSelect,
        handleFeedbackSubmit,
        goToRating,
    }
}
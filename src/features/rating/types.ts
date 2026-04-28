export type RatingType = "negative" | "positive" | "stellar";

export type FlowState =
    | { step: "rating" }
    | { step: "feedback" }
    | { step: "thankyou"; rating: RatingType }
    | { step: "trustpilot" }
    | { step: "closed" };
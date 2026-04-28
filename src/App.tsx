import { FeedbackPopup } from "./features/rating/components/FeedbackPopup/FeedbackPopup";
import { RatingPopup } from "./features/rating/components/RatingPopup/RatingPopup";
import { ThankYouPopup } from "./features/rating/components/ThankYouPopup/ThankYouPopup";
import { TrustpilotPopup } from "./features/rating/components/TrustpilotPopup/TrustpilotPopup";
import { useRatingFlow } from "./features/rating/hooks/useRatingFlow";
import { ThemeToggle } from "./app/components/ThemeToggle";
import type { FlowState } from "./features/rating/types";

function App() {

  const flow = useRatingFlow();
  const currentState = flow.state;
  const screens: Record<FlowState["step"], () => React.ReactNode> = {
    rating: () => (
      <RatingPopup
        isOpen
        onSelect={flow.handleRatingSelect}
      />
    ),
    feedback: () => (
      <FeedbackPopup
        isOpen
        onSubmit={flow.handleFeedbackSubmit}
        onBack={flow.goToRating}
      />
    ),
    thankyou: () => <ThankYouPopup isOpen />,
    trustpilot: () => <TrustpilotPopup isOpen onBack={flow.goToRating} />,
    closed: () => null,
  };

  return (
    <>
      <ThemeToggle />
      {screens[currentState.step]()}
    </>
  );
}

export default App

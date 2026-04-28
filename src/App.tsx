import { FeedbackPopup } from "./features/rating/components/FeedbackPopup/FeedbackPopup";
import { RatingPopup } from "./features/rating/components/RatingPopup/RatingPopup";
import { ThankYouPopup } from "./features/rating/components/ThankYouPopup/ThankYouPopup";
import { TrustpilotPopup } from "./features/rating/components/TrustpilotPopup/TrustpilotPopup";
import { useRatingFlow } from "./features/rating/hooks/useRatingFlow";
import { ThemeToggle } from "./app/components/ThemeToggle";

function App() {

  const flow = useRatingFlow();

  return (
    <>
      <ThemeToggle />
      {(() => {
        switch (flow.step) {
          case "rating":
            return (
              <RatingPopup
                isOpen
                onSelect={flow.handleRatingSelect}
              />
            );
          case "feedback":
            return (
              <FeedbackPopup
                isOpen
                onSubmit={flow.handleFeedbackSubmit}
                onBack={flow.goToRating}
              />
            );
          case "thankyou":
            return <ThankYouPopup isOpen />;
          case "trustpilot":
            return <TrustpilotPopup isOpen onBack={flow.goToRating} />;
          default:
            return null;
        }
      })()}
    </>
  );
}

export default App

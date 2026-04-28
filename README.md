# bunq Feature Rating Popup

React + TypeScript implementation of a feature rating flow with popup transitions and automated tests.

## Flow

1. User can rate a feature as NEGATIVE, POSITIVE, or STELLAR.
2. POSITIVE shows a thank-you popup for 2 seconds, then returns to the rating popup.
3. NEGATIVE opens a feedback popup. After valid submission, thank-you is shown for 2 seconds, then returns to rating.
4. STELLAR shows thank-you for 2 seconds, then opens a Trustpilot prompt popup.

## Tech Stack

1. React 19 + TypeScript
2. Vite
3. Zod for feedback validation
4. Vitest + Testing Library (unit/integration)
5. Playwright (end-to-end)

## Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open:

http://localhost:5173

## Scripts

```bash
# Build
npm run build

# Lint
npm run lint

# Unit/integration tests
npm run test
npm run test:watch
npm run test:ui

# End-to-end tests
npm run test:e2e
npm run test:e2e:ui
```

## Test Coverage

Current automated tests cover:

1. POSITIVE path: thank-you appears, then rating popup returns.
2. NEGATIVE path: feedback validation, submit, thank-you, then rating popup returns.
3. STELLAR path: thank-you appears, then Trustpilot popup appears.
4. Back navigation: returning from feedback and Trustpilot popups to the rating popup.
5. Modal keyboard behavior: focus trapping and focus restoration on close.

## Assessment Notes

1. Separation of concerns:
	UI is split into focused popup components and a dedicated flow hook that owns transition logic.
2. Accessibility:
	Dialogs use semantic roles and labeling, inputs are associated with labels, and keyboard focus is trapped/restored while modals are open.
3. Validation:
	Feedback is validated with Zod before submission and provides inline user-facing errors.
4. Robust transitions:
	Timer-based transitions are centralized in the flow hook with timeout cleanup to avoid stale updates.
5. Test strategy:
	Vitest covers component-level behavior and state transitions, while Playwright verifies full browser journeys.

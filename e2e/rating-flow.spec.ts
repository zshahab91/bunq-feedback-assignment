import { expect, test } from "@playwright/test";

test.describe("Feature rating popup flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("positive rating shows thank you and returns to rating view", async ({ page }) => {
    await page.getByRole("button", { name: "Good", exact: true }).click();

    await expect(page.getByText("Thanks for your feedback!")).toBeVisible();

    await expect(page.getByText("Thanks for your feedback!")).toBeHidden({ timeout: 3000 });
    await expect(page.getByText("How would you rate this feature?")).toBeVisible();
  });

  test("negative rating asks for feedback, validates input, then returns to rating", async ({ page }) => {
    await page.getByRole("button", { name: "Not good" }).click();

    await expect(page.getByText("How can we improve?")).toBeVisible();

    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Please enter at least 3 characters.")).toBeVisible();

    await page.getByLabel("Your feedback").fill("Some labels are unclear");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Thanks for your feedback!")).toBeVisible();
    await expect(page.getByText("Thanks for your feedback!")).toBeHidden({ timeout: 3000 });
    await expect(page.getByText("How would you rate this feature?")).toBeVisible();
  });

  test("stellar rating shows trustpilot prompt after thank you", async ({ page }) => {
    await page.getByRole("button", { name: "Excellent" }).click();

    await expect(page.getByText("Thanks for your feedback!")).toBeVisible();
    await expect(page.getByText("Enjoying bunq?")).toBeVisible({ timeout: 3000 });
    await expect(page.getByRole("button", { name: "Leave a Trustpilot review" })).toBeVisible();
  });
});

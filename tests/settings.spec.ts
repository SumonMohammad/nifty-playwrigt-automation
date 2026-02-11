import { test } from "../src/fixtures/base-fixture";
import { expect } from "@playwright/test";

test("Failed ClickUp config with invalid token", async ({
  settingsPage,
  page,
}) => {
  await settingsPage.open();
  await settingsPage.enterToken("abcdQWERTY1234");
  await settingsPage.toggleTokenVisibility();
  expect(await settingsPage.getTokenValue()).toBe("abcdQWERTY1234");
  const [clickUpSetupApiResponse] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("api/settings/clickup") &&
        res.request().method() === "POST",
    ),
    settingsPage.saveToken(),
  ]);
  expect(clickUpSetupApiResponse.status()).toBe(500);
  const body = await clickUpSetupApiResponse.json();

  expect(body.error).toBe("Failed to fetch workspaces: Oauth token not found");
  await settingsPage.saveToken();
  await expect(settingsPage.errorToast).toBeVisible();
  await expect(settingsPage.errorToast).toContainText(
    "Failed to fetch workspaces: Oauth token not found",
  );
});

import { test } from "../src/fixtures/base-fixture";
import { expect } from "@playwright/test";
import { HistoryPage } from "../src/pages/history-page";

test("Signout and try to Login with invalid credentials", async ({
  loginPage,
  page,
}) => {
  await page.goto("/dashboard");
  await loginPage.signOut();
  await loginPage.enterLoginCredentials(
    process.env.WRONG_USERNAME!,
    process.env.PASS_WORD!,
  );

  const [loginResponse] = await Promise.all([
    page.waitForResponse((res) => res.url().includes("/api/auth/login")),
    loginPage.clickToLogin(),
  ]);

  expect(loginResponse.status()).toBe(401);
  //await expect(loginPage.errorMsg).toBeVisible();
});

test("Explore all the pages and sign out sucessfully", async ({
  loginPage,
  dashboardPage,
  settingsPage,
  knowledgeBasePage,
  tasksPage,
  historyPage,
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/dashboard/);
  await expect(dashboardPage.uploadFile).toBeVisible();
  await expect(dashboardPage.tasksPageLink).toBeVisible();
  await dashboardPage.tasksPageLink.click();
  await expect(page).toHaveURL(/tasks/);
  await expect(tasksPage.tasksHeading).toBeVisible();
  await dashboardPage.knowledgeBasePageLink.click();
  await expect(page).toHaveURL(/knowledge-base/);
  await expect(knowledgeBasePage.knowledgeBaseDescriptorText).toBeVisible();
  await dashboardPage.settingsPageLink.click();
  await expect(page).toHaveURL(/settings/);
  await expect(settingsPage.settingsHeading).toBeVisible();
  await expect(settingsPage.settingsDescriptorText).toBeVisible();
  await dashboardPage.historyPageLink.click();
  await expect(page).toHaveURL(/history/);
  await expect(historyPage.historyHeading).toBeVisible();
  await expect(historyPage.historyDescriptorText).toBeVisible();
  await loginPage.signOut();
});


test("Cancel Signout and verify user is still logged in", async ({
  loginPage,
  page,
}) => {
  await page.goto("/dashboard");
  await loginPage.cancelSignOut();
  await expect(page).toHaveURL(/dashboard/);
});


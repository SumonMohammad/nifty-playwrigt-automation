import { test } from "../src/fixtures/base-fixture";
import { expect } from "@playwright/test";

test("Upload transcript file and analyze", async ({ dashboardPage, page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/dashboard/);

  const [fileUploadResponse] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("api/recordings/upload") &&
        res.request().method() === "POST",
    ),
    dashboardPage.uploadTranscriptFile("transcript-file.txt"),
  ]);
  expect(fileUploadResponse.status()).toBe(200);
  const body = await fileUploadResponse.json();
  expect(body.message).toBe("File uploaded successfully");
  await expect(dashboardPage.successfulUploadToast).toBeVisible();
  await expect(dashboardPage.uploadedFileName).toBeVisible();
});

test("Try to upload invalid file type and verify error message", async ({
  dashboardPage,
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/dashboard/);
  await dashboardPage.uploadTranscriptFile("nifty-test.pdf");
  await expect(dashboardPage.failedUploadToast).toBeVisible();
});

test("Upload file , choose project , select destination and finally analyze", async ({
  dashboardPage,
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/dashboard/);

  const [fileUploadResponse] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("api/recordings/upload") &&
        res.request().method() === "POST",
    ),
    dashboardPage.uploadTranscriptFile("transcript-file.txt"),
  ]);
  expect(fileUploadResponse.status()).toBe(200);
  
  await expect(dashboardPage.choseProjectOption).toBeVisible();
  await dashboardPage.openChoseProjectModal();
  await expect(dashboardPage.manualRadioOption).toBeVisible();
  await dashboardPage.selectManualRadioOption();
  await expect(dashboardPage.manualRadioOption).toBeChecked();
  await dashboardPage.selectProjectFromDropdown("Denowatts");
  await expect(dashboardPage.confirmSelectionButton).toBeEnabled();
  await dashboardPage.submitFileSelection();
  await expect(dashboardPage.choseDestination).toBeVisible();

  await dashboardPage.openDestinationModal();
  await expect(dashboardPage.choseDestinitionModal).toBeVisible();
  await dashboardPage.selectSpaceFromDropdown("Portal 2.0");
  await dashboardPage.selectFolderFromDropdown("Morpheus");
  await dashboardPage.selectListFromDropdown("Portal 2");
  // await dashboardPage.submitDestinationSelection();
});

test("Delete Uploaded transcript file", async ({ dashboardPage, page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/dashboard/);
  await dashboardPage.openDeleteModal("transcript-file.txt");

  const [fileDeleteResponse] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("api/recordings/uploaded") &&
        res.request().method() === "DELETE",
    ),
    dashboardPage.deleteConfirmationButton.click(),
  ]);
  expect(fileDeleteResponse.status()).toBe(200);
  const body = await fileDeleteResponse.json();
  expect(body.message).toBe("File deleted successfully");
  await expect(dashboardPage.successfulDeletionToast).toBeVisible();
});

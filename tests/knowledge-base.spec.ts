import { test } from "../src/fixtures/base-fixture";
import { expect } from "@playwright/test";

test("User can upload .txt file succesfully to knowledge base", async ({
  knowledgeBasePage,
  page,
}) => {
  await page.goto("/knowledge-base");
  await expect(page).toHaveURL(/knowledge-base/);
  await knowledgeBasePage.uploadKnowledgeBaseFile("nifty-test.txt");
  await knowledgeBasePage.selectProject("Denowatts");
  const [fileUploadResponse] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("api/knowledge-base/upload") &&
        res.request().method() === "POST",
    ),
    knowledgeBasePage.submitToUpload(),
  ]);
  expect(fileUploadResponse.status()).toBe(201);
  await expect(knowledgeBasePage.uploadedTxtFileName).toBeVisible();
});

test("User can upload .pdf file succesfully to knowledge base", async ({
  knowledgeBasePage,
  page,
}) => {
  await page.goto("/knowledge-base");
  await expect(page).toHaveURL(/knowledge-base/);
  await knowledgeBasePage.uploadKnowledgeBaseFile("nifty-test.pdf");
  await knowledgeBasePage.selectProject("Denowatts");
  const [fileUploadResponse] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("api/knowledge-base/upload") &&
        res.request().method() === "POST",
    ),
    knowledgeBasePage.submitToUpload(),
  ]);
  expect(fileUploadResponse.status()).toBe(201);
  await expect(knowledgeBasePage.uploadedPdfFileName).toBeVisible();
});
test("User can't upload other file type except [.pdf & .txt] type to knowledge base", async ({
  knowledgeBasePage,
  page,
}) => {
  await page.goto("/knowledge-base");
  await expect(page).toHaveURL(/knowledge-base/);
  await knowledgeBasePage.uploadKnowledgeBaseFile("nifty-test.docx");
  await expect(knowledgeBasePage.failedFileUploadToast).toBeVisible();
});

test("User can delete uploaded file from knowledge base", async ({
  knowledgeBasePage,
  page,
}) => {
  await page.goto("/knowledge-base");
  await expect(page).toHaveURL(/knowledge-base/);
  await knowledgeBasePage.openDeleteModal()
  const [deleteFileApiResponse] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("api/knowledge-base/documents") &&
        res.request().method() === "DELETE",
    ),
    knowledgeBasePage.confirmDeletion()
  ]);
  expect(deleteFileApiResponse.status()).toBe(200);
  const body = await deleteFileApiResponse.json();
  expect(body.message).toBe("Document deleted successfully");
  await expect(knowledgeBasePage.deleteFileToast).toBeVisible();

});

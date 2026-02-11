import { Locator, Page } from "@playwright/test";

export class KnowledgeBasePage {
  readonly page: Page;
  readonly knowledgeBaseHeading: Locator;
  readonly knowledgeBaseDescriptorText: Locator;
  readonly uploadFIleOption: Locator;
  readonly selectProjectDropdown: Locator;
  readonly selectOption: Locator;
  readonly uploadKnowledgeBaseButton: Locator;
  readonly uploadedTxtFileName: Locator;
  readonly uploadedPdfFileName: Locator;
  readonly deleteFileButton: Locator;
  readonly deleteConfirmationButton: Locator;
  readonly deleteCancelButton: Locator;
  readonly deleteCloseButton: Locator;
  readonly deleteConfirmationModal: Locator;
  readonly failedFileUploadToast: Locator;
  readonly deleteFileToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.knowledgeBaseHeading = page.getByRole("heading", {
      name: "Knowledge Base",
    });
    this.knowledgeBaseDescriptorText = page.getByText(
      "Upload and manage project context documents for better AI matching",
    );
    this.uploadFIleOption = page.locator(
      'input[type="file"][accept=".pdf,.txt"]',
    );
    this.selectProjectDropdown = page
      .getByText("Select Project", { exact: true })
      .locator("..")
      .locator(".ant-select");
    this.selectOption = page.getByRole("option", { name: /NewTest/i });
    this.uploadKnowledgeBaseButton = page.getByRole("button", {
      name: "Upload to Knowledge Base",
    });
    this.uploadedTxtFileName = page.getByText("nifty-test.txt", {
      exact: true,
    });
    this.uploadedPdfFileName = page.getByText("nifty-test.pdf", {
      exact: true,
    });
    this.deleteFileButton = page
      .getByRole("button", {
        name: "Delete",
        exact: true,
      })
      .first();
    this.deleteConfirmationModal = page
      .locator(".ant-modal")
      .filter({ hasText: "Delete Document" });
    this.deleteConfirmationButton = this.deleteConfirmationModal.getByRole(
      "button",
      {
        name: "Delete",
      },
    );
    this.deleteCancelButton = this.deleteConfirmationModal.getByRole("button", {
      name: "Cancel",
    });
    this.deleteCloseButton = this.deleteConfirmationModal.getByRole("button", {
      name: "Close",
    });
    this.failedFileUploadToast = page.getByText(
      "Invalid file type. Only PDF and TXT files are allowed.",
    );
    this.deleteFileToast = page.getByText("Document deleted successfully");
  }

  async uploadKnowledgeBaseFile(fileName: string): Promise<void> {
    await this.uploadFIleOption.setInputFiles(
      `src/test-data/files/${fileName}`,
    );
  }
  async selectProject(projectName: string) {
    await this.selectProjectDropdown.click();
    await this.page.keyboard.type(projectName, { delay: 50 });
    await this.page.keyboard.press("Enter");
  }
  async submitToUpload(): Promise<void> {
    await this.uploadKnowledgeBaseButton.click();
  }

  async openDeleteModal(): Promise<void> {
    await this.deleteFileButton.click();
    await this.deleteConfirmationModal.waitFor({ state: "visible" });
  }
  async confirmDeletion(): Promise<void> {
    await this.deleteConfirmationButton.click();
    await this.deleteConfirmationModal.waitFor({ state: "hidden" });
  }
}

//{"message":"Document deleted successfully"}

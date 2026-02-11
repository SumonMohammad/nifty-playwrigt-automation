import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly tasksPageLink: Locator;
  readonly historyPageLink: Locator;
  readonly knowledgeBasePageLink: Locator;
  readonly settingsPageLink: Locator;
  readonly dashboardPageLink: Locator;
  readonly uploadFile: Locator;
  readonly choseProjectOption: Locator;
  readonly analyzeButton: Locator;
  readonly successfulUploadToast: Locator;
  readonly failedUploadToast: Locator;
  readonly uploadedFileName: Locator;
  readonly deleteConfirmationModal: Locator;
  readonly deleteConfirmationButton: Locator;
  readonly deleteCancelButton: Locator;
  readonly successfulDeletionToast: Locator;
  readonly choseProjectModal: Locator;
  readonly manualRadioOption: Locator;
  readonly confirmSelectionButton: Locator;
  readonly projectDropdown: Locator;

  // initalize all the locators for the Chose Destinition madal
  readonly choseDestination: Locator;
  readonly choseDestinitionModal: Locator;
  readonly spaceSelectorFromDropdown: Locator;
  readonly folderSelectorFromDropdown: Locator;
  readonly listSelectorFromDropdown: Locator;
  readonly confirmDestinationSelectionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tasksPageLink = page.getByRole("link", { name: "Tasks" });
    this.historyPageLink = page.getByRole("link", { name: "History" });
    this.knowledgeBasePageLink = page.getByRole("link", {
      name: "Knowledge Base",
    });
    this.settingsPageLink = page.getByRole("link", { name: "Settings" });
    this.dashboardPageLink = page.getByRole("link", {
      name: "Dashboard",
      exact: true,
    });
    this.uploadFile = page.getByText("Upload Transcript File");
    this.choseProjectOption = page.getByText("Choose Project");
    this.choseDestination = page.getByText("Choose Destination", {
      exact: true,
    });
    this.analyzeButton = page.getByRole("button", { name: "Analyze Now" });
    this.successfulUploadToast = page.getByText("File uploaded successfully");
    this.failedUploadToast = page.getByText(
      "Invalid file type. Only .vtt and .txt files are allowed.",
    );
    this.uploadedFileName = page
      .getByText("transcript-file-new.txt", { exact: true })
      .first();
    this.deleteConfirmationModal = page
      .locator(".ant-modal")
      .filter({ hasText: "Delete File" });
    this.deleteConfirmationButton = this.deleteConfirmationModal.getByRole(
      "button",
      { name: "Delete" },
    );
    this.deleteCancelButton = this.deleteConfirmationModal.getByRole("button", {
      name: "Cancel",
    });
    this.successfulDeletionToast = page.getByText("File deleted successfully");

    this.choseProjectModal = page.getByRole("dialog", {
      name: "Choose Project",
    });
    this.manualRadioOption = this.choseProjectModal.getByRole("radio", {
      name: "I'll choose manually",
    });

    this.confirmSelectionButton = this.choseProjectModal.getByRole("button", {
      name: "Confirm Selection",
    });

    this.projectDropdown = this.choseProjectModal.getByRole("combobox", {
      name: "Select Project",
    });

    // initialize locators for the Chose Destinition madal
    this.choseDestinitionModal = page.getByRole("dialog", {
      name: "Choose Destination",
    });
    
    this.confirmDestinationSelectionButton =
      this.choseDestinitionModal.getByRole("button", {
        name: "Confirm Selection",
      });
    this.folderSelectorFromDropdown = this.choseDestinitionModal
      .locator(".ant-form-item", { hasText: "Folder (Optional)" })
      .getByRole("combobox");
    this.spaceSelectorFromDropdown = this.choseDestinitionModal
      .locator(".ant-form-item", { hasText: "Space" })
      .getByRole("combobox");
    this.listSelectorFromDropdown = this.choseDestinitionModal
      .locator(".ant-form-item", { hasText: "List" })
      .getByRole("combobox");
  }

  async selectSpaceFromDropdown(spaceName: string): Promise<void> {
    await this.spaceSelectorFromDropdown.click();
    await this.insertData(spaceName);
  }
  async insertData(data: string): Promise<void> {
    await this.page.keyboard.type(data, { delay: 50 });
    await this.page.keyboard.press("Enter");
  }

  async selectListFromDropdown(listName: string): Promise<void> {
    await this.listSelectorFromDropdown.click();
    await this.insertData(listName);
  }

  async selectFolderFromDropdown(folderName: string): Promise<void> {
    await this.folderSelectorFromDropdown.click();
    await this.insertData(folderName);
  }

  async openDestinationModal(): Promise<void> {
    await this.choseDestination.click();
    await this.choseDestinitionModal.waitFor({ state: "visible" });
  }

  async submitDestinationSelection(): Promise<void> {
    await this.confirmDestinationSelectionButton.click();
  }

  async selectManualRadioOption(): Promise<void> {
    await this.manualRadioOption.click();
  }

  async uploadTranscriptFile(
    fileName: string = "transcript-file-new.txt",
  ): Promise<void> {
    await this.uploadFile.click();
    const filePath = `src/test-data/files/${fileName}`;
    await this.page.setInputFiles('input[type="file"]', filePath);
  }
  async openDeleteModal(fileName: string): Promise<void> {
    await this.fileDeleteButton(fileName).click();
    await this.deleteConfirmationModal.waitFor({ state: "visible" });
  }

  async submitFileSelection(): Promise<void> {
    await this.confirmSelectionButton.click();
  }

  async openChoseProjectModal(): Promise<void> {
    await this.choseProjectOption.click();
  }
  async selectProjectFromDropdown(projectName: string): Promise<void> {
    await this.projectDropdown.click();
    await this.insertData(projectName);
  }

  fileItem(fileName: string) {
    return this.page.locator("li.ant-list-item", {
      has: this.page.getByText(fileName),
    });
  }

  fileDeleteButton(fileName: string) {
    return this.fileItem(fileName).locator("button.ant-btn-icon-only");
  }
}

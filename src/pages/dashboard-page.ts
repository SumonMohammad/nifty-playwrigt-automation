import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly tasksPageLink: Locator;
  readonly historyPageLink: Locator;
  readonly knowledgeBasePageLink: Locator;
  readonly settingsPageLink: Locator;
  readonly dashboardPageLink: Locator;
  readonly uploadFile: Locator;
  readonly choseProject: Locator;
  readonly choseDestination: Locator;
  readonly analyzeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tasksPageLink = page.getByRole('link', { name: 'Tasks' })
    this.historyPageLink = page.getByRole('link', { name: 'History' })
    this.knowledgeBasePageLink = page.getByRole('link', { name: 'Knowledge Base' })
    this.settingsPageLink = page.getByRole('link', { name: 'Settings' })
    this.dashboardPageLink = page.getByRole('link', { name: 'Dashboard', exact: true }) 
    this.uploadFile = page.getByText('Upload Transcript File')
    this.choseProject = page.getByText('Choose Project')
    this.choseDestination = page.getByText('Choose Destination', { exact: true }) 
    this.analyzeButton = page.getByRole('button', { name: 'Analyze Now' })

  }

  async uploadTranscriptFile() {
    await this.uploadFile.click();
    const filePath = 'src/test-data/files/nifty-test.txt';
    await this.page.setInputFiles('input[type="file"]', filePath);
    // await this.choseProject.click();
    // await this.choseDestination.click();
    // await this.analyzeButton.click();
  }
 

}

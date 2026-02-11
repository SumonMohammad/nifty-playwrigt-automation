import { Locator, Page } from "@playwright/test";

export class HistoryPage {
  readonly page: Page;
  readonly historyHeading: Locator;
  readonly historyDescriptorText: Locator;


  

  constructor(page: Page) {
    this.page = page;
    this.historyHeading = page.getByRole('heading', { name: 'Meeting History' });
    this.historyDescriptorText = page.getByText('View and explore meeting transcripts');

  }

}
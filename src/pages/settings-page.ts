import { Locator, Page } from "@playwright/test";

export class SettingsPage {
  private readonly page: Page;

  private readonly settingsLink: Locator;
  private readonly title: Locator;
  private readonly tokenInput: Locator;
  private readonly showTokenIcon: Locator;
  private readonly hideTokenIcon: Locator;
  private readonly saveButton: Locator;
  public readonly errorToast: Locator;
  readonly settingsHeading: Locator;
  readonly settingsDescriptorText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsHeading = page.getByRole('heading', { name: 'Settings' });
    this.settingsDescriptorText = page.getByText('Manage your application settings');

    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.title = page.getByText('ClickUp Configuration', { exact: true });
    this.tokenInput = page.getByRole('textbox', { name: 'pk_...' });

    this.showTokenIcon = page.locator('[data-icon="eye"]');
    this.hideTokenIcon = page.locator('[data-icon="eye-invisible"]');

    this.saveButton = page.getByRole('button', { name: 'Save API Token & Sync' });
   // this.errorToast = page.getByRole('alert');
    this.errorToast = page.getByText('Failed to fetch workspaces: Oauth token not found')
  }

  async open() {
    await this.page.goto("/");
    await this.settingsLink.click();
    await this.page.waitForURL(/settings/);
    await this.title.waitFor({ state: 'visible' });
  }

  async enterToken(token: string) {
    await this.tokenInput.fill(token);
  }

  async toggleTokenVisibility() {
    await this.hideTokenIcon.click();
    await this.showTokenIcon.click();
  }

  async saveToken() {
    await this.saveButton.click();
  }

  async getTokenValue() {
    return this.tokenInput.inputValue();
  }

}


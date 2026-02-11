import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMsg: Locator;
  readonly signInLink: Locator;
  readonly signOutButton: Locator;
  readonly modalSignOutButton: Locator;
  readonly signOutModal: Locator;
  readonly signOutCancelButton: Locator;
  readonly signOutCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.signInLink = page.getByRole("link", { name: "Sign In", exact: true });
    this.loginButton = page.getByRole("button", { name: "Sign In" });
    this.errorMsg = page.getByText("Username or password is incorrect");
    this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
    this.signOutModal = page.getByRole('dialog');
    this.modalSignOutButton = this.signOutModal.getByRole('button', { name: 'Sign Out' });
    this.signOutCancelButton = this.signOutModal.getByRole('button', { name: 'Cancel' });
    this.signOutCloseButton = this.signOutModal.getByRole('button', { name: 'Close' });
  }

  async openSignIn(): Promise<void> {
    await this.page.goto("/");
    await this.signInLink.click();
  }
  async clickToLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async enterLoginCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async signOut(): Promise<void> {
    await this.signOutButton.click();
    await this.signOutModal.waitFor({ state: 'visible' });
    await this.modalSignOutButton.click();
  }
  async cancelSignOut(): Promise<void> {
    await this.signOutButton.click();
    await this.signOutModal.waitFor({ state: 'visible' });
    await this.signOutCancelButton.click();
    await this.signOutModal.waitFor({ state: 'hidden' });
    await this.signOutButton.click();
    await this.signOutModal.waitFor({ state: 'visible' });
    await this.signOutCloseButton.click();
  }
}

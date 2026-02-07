import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMsg: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.signInLink = page.getByRole("link", { name: "Sign In", exact: true });
    this.loginButton = page.getByRole("button", { name: "Sign In" });
    this.errorMsg = page.getByText("Username or password is incorrect");
  }

  async goToUrl(): Promise<void> {
    await this.page.goto("https://meet.hub.niftyai.net/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    const [loginResponse] = await Promise.all([
      this.page.waitForResponse((res) => res.url().includes("/api/auth/login")),
      this.loginButton.click(),
    ]);
    return {
      status: loginResponse.status()
    };
  }
}

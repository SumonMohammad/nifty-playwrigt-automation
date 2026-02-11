import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "../pages/login-page";


async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: process.env.BASE_URL,
  });

  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  await loginPage.openSignIn();
  await loginPage.enterLoginCredentials(
    process.env.USER_NAME!,
    process.env.PASS_WORD!
  );
  await loginPage.clickToLogin();

  //Ensure auth persisted
  await page.waitForFunction(() => {
    const auth = localStorage.getItem("persist:auth");
    if (!auth) return false;
    const parsed = JSON.parse(auth);
    return parsed.token && parsed.token !== "null";
  });

  await context.storageState({ path: "storage/auth.json" });
  await browser.close();
}
export default globalSetup;


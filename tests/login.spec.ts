import { test} from '../src/fixtures/base-fixture';
import { expect } from '@playwright/test';

test.beforeEach("Login with admin credentials", async ({loginPage, page})=>{   
   await loginPage.goToUrl();
   await loginPage.signInLink.click()
   const res = await loginPage.login(`${process.env.USER_NAME}`, `${process.env.PASS_WORD}`);
   expect(res.status).toBe(200)
   await expect(page).toHaveURL(/dashboard/)
})

// test("Login with in valid credentials , visit all the pages and logout", async ({loginPage, page})=>{   
//    await loginPage.goToUrl();
//    await loginPage.signInLink.click()
//    const res = await loginPage.login(`${process.env.WRONG_USERNAME}`, `${process.env.PASS_WORD}`);
//    expect(res.status).toBe(401)
//   // await expect(loginPage.errorMsg).toBeVisible({timeout: 1000})
// })



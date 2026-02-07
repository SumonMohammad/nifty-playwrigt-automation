import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page';
import {LoginPage} from '../pages/login-page';

export const test = base.extend<{
    dashboardPage: DashboardPage;
    loginPage: LoginPage;
   
}>({
    
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);      
        await use(dashboardPage );
    }
   
});
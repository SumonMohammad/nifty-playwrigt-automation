import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page';
import {LoginPage} from '../pages/login-page';
import { SettingsPage } from '../pages/settings-page';
import { TasksPage } from '../pages/tasks-page';
import { KnowledgeBasePage } from '../pages/knowledge-base-page';
import { HistoryPage } from '../pages/history-page';

export const test = base.extend<{
    dashboardPage: DashboardPage;
    loginPage: LoginPage;
    settingsPage: SettingsPage;
    tasksPage: TasksPage;
    knowledgeBasePage: KnowledgeBasePage;
    historyPage: HistoryPage;
   
}>({
    
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);      
        await use(dashboardPage );
    },
    settingsPage: async ({ page }, use) => {
        const settingsPage = new SettingsPage(page);
        await use(settingsPage);
    },
    tasksPage: async ({ page }, use) => {
        const tasksPage = new TasksPage(page);
        await use(tasksPage);
    },
    knowledgeBasePage: async ({ page }, use) => {
        const knowledgeBasePage = new KnowledgeBasePage(page);
        await use(knowledgeBasePage);
    },
    historyPage: async ({ page }, use) => {
        const historyPage = new HistoryPage(page);
        await use(historyPage);
    },  
     
});
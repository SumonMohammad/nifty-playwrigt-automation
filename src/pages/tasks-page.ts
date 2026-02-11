import { Locator, Page } from "@playwright/test";

export class TasksPage {
  readonly page: Page;
  readonly tasksHeading: Locator;
  readonly viewMeetingTasksText: Locator;


  

  constructor(page: Page) {
    this.page = page;
    this.tasksHeading = page.getByRole('heading', { name: 'Tasks' });
    this.viewMeetingTasksText = page.getByText('View tasks created from meetings');

  }


}


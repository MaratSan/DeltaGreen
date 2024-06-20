import { test, expect } from '@playwright/test';
import { LoginPagePOM } from '../poms/login/deltaGreenLoginPOM';
import { TodoListPagePOM } from '../poms/todo/todoListPOM';
import { standardUserCredentials } from '../test-data/login';
import { getRandomNumber, waitPage } from '../helpers';

test.describe('Create, Edit, Complete and Delete Task', () => {

  test('Create, Edit, Complete, and Delete Task', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);
    await loginPage.navigate();
    await loginPage.login(standardUserCredentials.username, standardUserCredentials.password);

    const todoListPage = new TodoListPagePOM(page);
    //await todoListPage.navigate();

    const randomNum = getRandomNumber();
    const taskName = `Test Task ${randomNum}`;
    const taskDescription = `Test Description ${randomNum}`;
    

    // Create Task
    await todoListPage.createTask(taskName, taskDescription);
    await expect(page.locator(`xpath=//*[text()="${taskName}"]`)).toBeVisible();

    // Edit Task
    const updatedTaskName = `Updated Test Task ${randomNum}`;
    const updatedTaskDescription = `Updated Test Description ${randomNum}`;
    await todoListPage.editTask(taskName, updatedTaskName, updatedTaskDescription);
    await expect(page.locator(`xpath=//*[text()="${updatedTaskName}"]`)).toBeVisible();
    await expect(page.locator(`xpath=//*[text()="${updatedTaskDescription}"]`)).toBeVisible();

    // Complete Task
    await todoListPage.completeTask(updatedTaskName);
    await expect(page.locator(`xpath=//html/body/main/div/div[5]/div[1]/div[1]/p[2]`)).toBeVisible();

    // Delete Task
    await todoListPage.deleteTask(taskName, taskDescription);
    //await waitPage(page, 10000);
    await expect(page.locator(`xpath=//*[text()="${taskName}"]`)).not.toBeVisible();
  })});

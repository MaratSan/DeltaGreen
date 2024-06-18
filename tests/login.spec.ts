import { test, expect } from '@playwright/test';
import { LoginPagePOM } from '../poms/login/deltaGreenLoginPOM';
import { TodoListPagePOM } from '../poms/todo/todoListPOM';
import { standardUserCredentials } from '../test-data/login';

test.describe('Login and To-Do List Tests', () => {

  test('Login Page - Validate Components', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);
    await loginPage.navigate();
    await loginPage.validateAllComponents();
  });

  test('Login and Navigate to To-Do List', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);
    await loginPage.navigate();
    await loginPage.login(standardUserCredentials.username, standardUserCredentials.password);
    const todoListPage = new TodoListPagePOM(page);
    await todoListPage.validateAllComponents();
  });

  test('To-Do List Page - Validate Components', async ({ page }) => {
    const todoListPage = new TodoListPagePOM(page);
    await todoListPage.navigate();
    await todoListPage.validateAllComponents();
  });

});

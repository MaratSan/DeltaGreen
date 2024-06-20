import { test, expect } from '@playwright/test';
import { LoginPagePOM } from '../poms/login/deltaGreenLoginPOM';
import { standardUserCredentials } from '../test-data/login';
import { TodoListPagePOM } from '../poms/todo/todoListPOM';

test.describe('Logout Test', () => {

  test('Logout', async ({ page }) => {
    const loginPage = new LoginPagePOM(page);
    await loginPage.navigate();
    await loginPage.login(standardUserCredentials.username, standardUserCredentials.password);

    const todoListPage = new TodoListPagePOM(page);
    //await todoListPage.navigate();
    await todoListPage.logout();

    // Validate logout by checking if the login page is shown
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    
  });
});
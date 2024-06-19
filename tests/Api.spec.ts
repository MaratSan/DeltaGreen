import { test, expect, request } from '@playwright/test';
import { standardUserCredentials } from '../test-data/login';

const baseURL = 'https://todos.dev.deltagreen.cz/api/tasks';
const authHeader = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + Buffer.from(standardUserCredentials.username + ":" + standardUserCredentials.password).toString('base64') 
};

test.describe('API tests for tasks', () => {
  let taskId: string;

  test('Create task', async ({ request }) => {
    const response = await request.post(baseURL, {
      headers: authHeader,
      data: {
        name: 'some name',
        description: 'some description'
      }
    });
    expect(response.status()).toBe(201); // Assuming 201 Created status code
    const responseBody = await response.json();
    taskId = responseBody.id;
    expect(responseBody.name).toBe('some name');
    expect(responseBody.description).toBe('some description');
  });

  test('Complete task', async ({ request }) => {
    const response = await request.post(`${baseURL}/${taskId}/complete`, {
      headers: authHeader,
      data: {}
    });
    expect(response.status()).toBe(200); // Assuming 200 OK status code
    const responseBody = await response.json();
    expect(responseBody.completed).toBe(true);
  });

  test('List tasks', async ({ request }) => {
    const response = await request.get(baseURL, {
      headers: authHeader
    });
    expect(response.status()).toBe(200); // Assuming 200 OK status code
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
  });

  test('Get task detail', async ({ request }) => {
    const response = await request.get(`${baseURL}/${taskId}`, {
      headers: authHeader
    });
    expect(response.status()).toBe(200); // Assuming 200 OK status code
    const responseBody = await response.json();
    expect(responseBody.id).toBe(taskId);
    expect(responseBody.name).toBe('some name');
    expect(responseBody.description).toBe('some description');
  });

  test('Update task', async ({ request }) => {
    const response = await request.patch(`${baseURL}/${taskId}`, {
      headers: authHeader,
      data: {
        name: 'some updated name',
        description: 'some updated description'
      }
    });
    expect(response.status()).toBe(200); // Assuming 200 OK status code
    const responseBody = await response.json();
    expect(responseBody.name).toBe('some updated name');
    expect(responseBody.description).toBe('some updated description');
  });

  test('Delete task', async ({ request }) => {
    const response = await request.delete(`${baseURL}/${taskId}`, {
      headers: authHeader
    });
    expect(response.status()).toBe(204); // Assuming 204 No Content status code
  });
});

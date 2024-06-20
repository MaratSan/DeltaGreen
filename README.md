# DeltaGreen

# Todo List Test Suite

This project contains automated tests for the Todo List application, written using Playwright and TypeScript. The tests cover basic operations such as creating, editing, completing, and deleting tasks, as well as logging out of the system.

## Project Structure

- `poms/` - Page Object Models (POMs) that abstract page elements and interactions.
  - `login/` - POM for the login page.
    - `deltaGreenLoginPOM.ts`
  - `todo/` - POM for the todo list page.
    - `todoListPOM.ts`
- `components/` - Components for interacting with page elements.
  - `button/`
    - `buttonInterface.ts`
  - `label/`
    - `labelInterface.ts`
  - `input/`
    - `inputInterface.ts`
  - `factory/`
    - `componentsFactory.ts`
- `utils/` - Utilities and helper functions.
  - `random.ts` - Function for generating random numbers.
- `test-data/` - Test data.
  - `login.ts`
- `tests/` - Test files.
  - `todoTests.ts`

## Installation

1. Ensure you have Node.js installed (the latest version is recommended).

2. Install dependencies:
   ```bash
   npm install

## Running Tests
1. To run the tests, use the following command:
    ```bash
    npm test

2. To open UI mode, run the following command in your terminal:
    ```bash
    npm run debug  

3. List reporter is default (except on CI where the dot reporter is default). It prints a line for each test being run.
    ```bash
    npm run report
import { Page } from "@playwright/test";
import { POM } from "../pom";
import { ComponentFactory } from "../../components/factory/componentsFactory";
import { LabelInterface } from "../../components/label/labelInterface";
import { ButtonInterface } from "../../components/button/buttonInterface";
import { PropertiesManager } from "../../properties/propertiesManager";
import { InputInterface } from "../../components/input/inputInterface";

export class TodoListPagePOM extends POM {
  private todoList_label: LabelInterface;
  private newTask_button: ButtonInterface;
  private logout_button: ButtonInterface;
  private taskName_input: InputInterface;
  private taskNameEdit_input: InputInterface;
  private taskDescription_input: InputInterface;
  private save_button: ButtonInterface;
  private complete_button: ButtonInterface;
  private edit_button: ButtonInterface;
  private saveEdit_button: ButtonInterface;
  private delete_button: ButtonInterface;

  constructor(page: Page) {
    super(page);

    this.todoList_label = ComponentFactory.createLabel().setLocator(
      this.page.locator('xpath=//*[text()="Your Todo list"]')
    );

    this.newTask_button = ComponentFactory.createButton()
    .setLocator(this.page.locator('xpath=//*[text()="New Task"]'))
    .setVisible(true);

    this.logout_button = ComponentFactory.createButton()
    .setLocator(this.page.locator('xpath=//*[text()="Logout"]'))

    this.taskName_input = ComponentFactory.createInput().setLocator(
      this.page.getByPlaceholder("Some task title"))

    this.taskDescription_input = ComponentFactory.createInput().setLocator(
      this.page.getByPlaceholder("Some description"))

    this.save_button = ComponentFactory.createButton()
      .setLocator(this.page.locator('xpath=//*[text()="Create"]'))

    this.complete_button = ComponentFactory.createButton()
      .setLocator(this.page.locator('xpath=//html/body/main/div/div[2]/div[1]/aside/button[1]'))
      
    this.edit_button = ComponentFactory.createButton()
      .setLocator(this.page.locator('xpath=//html/body/main/div/div[2]/div[1]/aside/button[2]'))

    this.delete_button = ComponentFactory.createButton()
      .setLocator(this.page.locator('xpath=//html/body/main/div/div[2]/div[1]/aside/button[3]'))

    this.saveEdit_button = ComponentFactory.createButton()
      .setLocator(this.page.locator('xpath=//*[text()="Save changes"]'))
    }

  async navigate(): Promise<void> {
    await this.page.goto(PropertiesManager.getProperty('DELTAGREEN_URL'));
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async validateAllComponents(): Promise<void> {
    await this.todoList_label.validateSelf();
    await this.newTask_button.validateSelf();
    await this.logout_button.validateSelf();
  }

  async createTask(name: string, description: string): Promise<void> {
    await this.newTask_button.click();
    await this.taskName_input.sendTextToInput(name);
    await this.taskDescription_input.sendTextToInput(description);
    await this.save_button.click();
  }

  async editTask(oldName: string, newName: string, newDescription: string): Promise<void> {
    await this.edit_button.click();
    //const editButton = this.page.locator(`xpath=//*[text()="${oldName}"]/..//button[@aria-label="Edit"]`);
    //await editButton.click();
    await this.page.getByLabel('Title').click();
    await this.page.getByLabel('Title').fill(newName);
    await this.taskDescription_input.sendTextToInput(newDescription);
    await this.saveEdit_button.click();  
  }

  async completeTask(name: string): Promise<void> {
    await this.complete_button.click();
  }

  async deleteTask(name: string, description: string): Promise<void> {
    await this.newTask_button.click();
    await this.taskName_input.sendTextToInput(name);
    await this.taskDescription_input.sendTextToInput(description);
    await this.save_button.click();
    await this.delete_button.click();
  }

  async logout() {
    const logoutButton = this.page.locator('button:has-text("Logout")');
    await logoutButton.click();
  }
}

import { Page } from "@playwright/test";
import { POM } from "../pom";
import { ComponentFactory } from "../../components/factory/componentsFactory";
import { LabelInterface } from "../../components/label/labelInterface";
import { ButtonInterface } from "../../components/button/buttonInterface";
import { PropertiesManager } from "../../properties/propertiesManager";

export class TodoListPagePOM extends POM {
  private todoList_label: LabelInterface;
  private newTask_button: ButtonInterface;
  private logout_button: ButtonInterface;

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
}

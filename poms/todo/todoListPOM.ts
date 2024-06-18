import { Page } from "@playwright/test";
import { POM } from "../pom";
import { ComponentFactory } from "../../components/factory/componentsFactory";
import { LabelInterface } from "../../components/interfaces/labelInterface";
import { ButtonInterface } from "../../components/interfaces/buttonInterface";
import { PropertiesManager } from "../../properties/propertiesManager";

export class TodoListPagePOM extends POM {
  private todoList_label: LabelInterface;
  private newTask_button: ButtonInterface;

  constructor(page: Page) {
    super(page);

    this.todoList_label = ComponentFactory.createLabel().setLocator(
      this.page.getByRole('heading', { name: 'Your Todo list' })
    );

    this.newTask_button = ComponentFactory.createButton()
      .setLocator(this.page.getByRole("button", { name: "New Task" }))
      .setVisible(true);
  }

  async navigate(): Promise<void> {
    await this.page.goto(PropertiesManager.getProperty(DELTAGREEN_URL));
  }

  async validateAllComponents(): Promise<void> {
    await this.todoList_label.validateSelf();
    await this.newTask_button.validateSelf();
  }
}

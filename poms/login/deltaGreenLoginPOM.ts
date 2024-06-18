import { Page } from "@playwright/test";
import { InputInterface } from "../../components/interfaces/inputInterface";
import { POM } from "../pom";
import { ComponentFactory } from "../../components/factory/componentsFactory";
import { ButtonInterface } from "../../components/interfaces/buttonInterface";
import { LabelInterface } from "../../components/interfaces/labelInterface";
import { PropertiesManager } from "../../properties/propertiesManager";

export class LoginPagePOM extends POM {
  private login_label: LabelInterface;
  private username_input: InputInterface;
  private password_input: InputInterface;
  private login_button: ButtonInterface;
  private signUp_link: ButtonInterface;

  constructor(page: Page) {
    super(page);

    this.login_label = ComponentFactory.createLabel().setLocator(
      this.page.getByRole('heading', { name: 'Login' })
    );

    this.username_input = ComponentFactory.createInput().setLocator(
      this.page.getByPlaceholder("Your username")
    );

    this.password_input = ComponentFactory.createInput().setLocator(
      this.page.getByPlaceholder("Your password")
    );

    this.login_button = ComponentFactory.createButton()
      .setLocator(this.page.getByRole("button", { name: "Login" }))
      .setVisible(true);

    this.signUp_link = ComponentFactory.createButton()
      .setLocator(this.page.getByRole("link", { name: "No account? Create one here." }))
      .setVisible(true);
  }

  async navigate(): Promise<void> {
    await this.page.goto(PropertiesManager.getProperty("DELTAGREEN_URL"));
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async validateAllComponents(): Promise<void> {
    await this.login_label.validateSelf();
    await this.username_input.validateSelf();
    await this.password_input.validateSelf();
    await this.login_button.validateSelf();
    await this.signUp_link.validateSelf();
  }

  async login(username: string, password: string): Promise<void> {
    await this.username_input.sendTextToInput(username);
    await this.password_input.sendTextToInput(password);
    await this.login_button.click();
  }
}

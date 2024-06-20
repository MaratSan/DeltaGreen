import { Page } from "@playwright/test";
import { InputInterface } from "../../components/input/inputInterface";
import { POM } from "../pom";
import { ComponentFactory } from "../../components/factory/componentsFactory";
import { ButtonInterface } from "../../components/button/buttonInterface";
import { LabelInterface } from "../../components/label/labelInterface";
import { PropertiesManager } from "../../properties/propertiesManager";

export class SignUpPagePOM extends POM {
  private signUp_label: LabelInterface;
  private username_input: InputInterface;
  private password_input: InputInterface;
  private signUp_link: ButtonInterface;
  private login_link: ButtonInterface;
  private signUp_button: ButtonInterface;

  constructor(page: Page) {
    super(page);

    this.signUp_label = ComponentFactory.createLabel().setLocator(
      this.page.getByRole('heading', { name: 'Sign Up' })
    );

    this.username_input = ComponentFactory.createInput().setLocator(
      this.page.getByPlaceholder("Your username")
    );

    this.password_input = ComponentFactory.createInput().setLocator(
      this.page.getByPlaceholder("Your password")
    );

    this.login_link = ComponentFactory.createButton()
      .setLocator(this.page.getByRole("link", { name: "Already have account? Login." }))
      .setVisible(true);

    this.signUp_button = ComponentFactory.createButton()
      .setLocator(this.page.getByRole("button", { name: "Sign up" }))
      .setVisible(true);

  }

  async navigate(): Promise<void> {
    await this.page.goto(PropertiesManager.getProperty("DELTAGREEN_URL_SIGNUP"));
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async validateAllComponents(): Promise<void> {
    await this.signUp_label.validateSelf();
    await this.username_input.validateSelf();
    await this.password_input.validateSelf();
    await this.signUp_button.validateSelf();
    await this.login_link.validateSelf();
  }

  async signUp(username: string, password: string): Promise<void> {
    await this.username_input.sendTextToInput(username);
    await this.password_input.sendTextToInput(password);
    await this.signUp_button.click();
  }
}

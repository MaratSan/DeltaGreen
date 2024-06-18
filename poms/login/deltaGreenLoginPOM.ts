import { Page } from "@playwright/test";
import { InputInterface } from "../../components/interfaces/inputInterface";
import { POM } from "../pom";
import { ComponentFactory } from "../../components/factory/componentsFactory";
import { ButtonInterface } from "../../components/interfaces/buttonInterface";
import { PropertiesManager } from "../../properties/propertiesManager";
import { LabelInterface } from "../../components/interfaces/labelInterface";

export class LoginPagePOM extends POM {
  private signUp_label: LabelInterface;
  private loginUserName_input: InputInterface;
  private loginPassword_input: InputInterface;
  private loginSubmit_button: ButtonInterface;
  private signUp_button: ButtonInterface;

  constructor(page: Page) {
    super(page);

    this.signUp_label = ComponentFactory.createLabel().setLocator(
        this.page.getByRole('heading', { name: 'Sign Up' })
    );

    this.loginUserName_input = ComponentFactory.createInput().setLocator(
      this.page.getByPlaceholder("Your username")
    );

    this.loginPassword_input = ComponentFactory.createInput().setLocator(
      this.page.getByPlaceholder("Your password")
    );

    this.loginSubmit_button = ComponentFactory.createButton()
      .setLocator(this.page.getByRole("button", { name: "Login" }))
      .setVisible(true);

    this.signUp_button = ComponentFactory.createButton()
      .setLocator(
        this.page.getByRole("link", { name: "No account? Create one here." }))
      .setVisible(true);
  }

  async navigate(): Promise<void> {
    await this.page.goto(PropertiesManager.getProperty("DELTAGREEN_URL"));
  }
  async goBack(): Promise<void> {
    await this.page.goBack();
  }
  async validateAllComponents(): Promise<void> {
    await this.signUp_label.validateSelf();
    await this.loginUserName_input.validateSelf();
    await this.loginPassword_input.validateSelf();
    await this.loginSubmit_button.validateSelf();
    await this.signUp_button.validateSelf();
  }
}

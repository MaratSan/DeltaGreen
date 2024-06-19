import { ButtonInterface } from './buttonInterface'
import { CommonComponent } from '../commonComponents/commonComponents'

export class Button extends CommonComponent<Button> implements ButtonInterface {
  private buttonText: string = ''

  public static newInstance() {
    return new Button()
  }

  async click(): Promise<ButtonInterface> {
    await this.locator.click()
    return this
  }

  validateText(): void {
    throw new Error('Method not implemented.')
  }
}

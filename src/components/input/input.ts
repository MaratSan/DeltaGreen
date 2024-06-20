import { Locator, expect } from '@playwright/test'
import { InputInterface } from './inputInterface'
import { CommonComponent } from '../commonComponents/commonComponents'

export class Input extends CommonComponent<Input> implements InputInterface {
  private inputText: string = ''
  private placeholder: string = ''


  public static newInstance() {
    return new Input()
  }

  setPlaceholder(placeholder: string): Input {
    this.placeholder = placeholder
    return this
  }

  setInputText(inputText: string): Input {
    this.inputText = inputText
    return this
  }

  async sendTextToInput(inputText: string): Promise<Input> {
    await this.locator.fill(inputText)
    this.inputText = inputText
    return this
  }

  async validateText(): Promise<void> {
    await expect(this.locator.getAttribute('placeholder')).toEqual(this.placeholder)
    await expect(this.locator).toHaveText(this.inputText)
  }
}

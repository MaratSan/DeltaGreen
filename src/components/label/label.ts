import { expect } from '@playwright/test'
import { CommonComponent } from '../commonComponents/commonComponents'
import { LabelInterface } from './labelInterface'

export class Label extends CommonComponent<Label> implements LabelInterface {
  private labelText: string = ''

  public static newInstance() {
    return new Label()
  }

  setLabelText(labelText: string): Label {
    this.labelText = labelText
    return this
  }

  async validateText() {
    await expect(this.locator).toHaveText(this.labelText)
  }
}

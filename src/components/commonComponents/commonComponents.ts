import { Locator, expect } from '@playwright/test'

export abstract class CommonComponent<C extends CommonComponent<C>> {
  protected locator!: Locator
  protected translationKey: string = ''
  protected timeout?: number
  protected visible?: boolean
  protected enabled?: boolean
  protected readonly?: boolean

  /**
   * Ensures callback from parent class to subclass which instantiated current object.
   * @returns Returns sub-class that instantiated object
   */
  protected child(): C {
    return this as any
  }

  async readElementText(): Promise<string> {
    return (await this.locator.allInnerTexts()) + ''
  }

  setLocator(locator: Locator): C {
    this.locator = locator
    return this.child()
  }

  setTimeout(timeout: number): C {
    this.timeout = timeout
    return this.child()
  }

  setVisible(visible: boolean): C {
    this.visible = visible
    return this.child()
  }

  setEnabled(enabled: boolean): C {
    this.enabled = enabled
    return this.child()
  }

  setReadonly(readonly: boolean): C {
    this.readonly = readonly
    return this.child()
  }

  setTranslationKey(translationKey: string): C {
    this.translationKey = translationKey
    return this.child()
  }

  async waitToAppear(optionalTimeout?: number, state?: string) {
    await this.locator.waitFor(this.buildProperties(optionalTimeout, state))
    return this.child()
  }

  async waitToDisappear(optionalTimeout?: number) {
    await expect(this.locator).not.toBeVisible(this.buildProperties(optionalTimeout))
    return this.child()
  }

  async validateVisible(): Promise<boolean> {
    if (this.visible === undefined) throw Error('Expected visibility for element was not set yet.')
    return (await this.locator.isVisible()) === this.visible
  }

  async validateEnabled(): Promise<boolean> {
    if (this.enabled === undefined) throw Error('Expected visibility for element was not set yet.')
    return (await this.locator.isEnabled()) === this.enabled
  }

  async validateReadonly(): Promise<boolean> {
    if (this.readonly === undefined) throw Error('Expected visibility for element was not set yet.')
    return (await this.locator.isEditable()) === this.readonly
  }

  validateText(): void {
    throw Error('Text validation is not yet defined for elements in QA framework.')
  }

  async validateSelf(): Promise<void> {
    if (this.visible === true) {
      await this.waitToAppear()
    }
    if (this.visible === false) {
      await this.waitToDisappear()
    }

    if (this.visible !== undefined) expect(await this.validateVisible()).toBeTruthy()
    if (this.enabled !== undefined) expect(await this.validateEnabled()).toBeTruthy()
    if (this.readonly !== undefined) expect(await this.validateReadonly()).toBeTruthy()
  }

  private buildProperties(optionalTimeout?: number, state?: string): {} {
    var properties: { [k: string]: any } = {}
    if (optionalTimeout !== undefined) properties.timeout = optionalTimeout
    else if (this.timeout !== undefined) properties.timeout = this.timeout
    if (state !== undefined) properties.state = state
    return properties
  }
}

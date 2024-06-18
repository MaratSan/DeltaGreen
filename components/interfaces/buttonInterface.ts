import { DefaultComponentInterface } from './defaultComponentInterface'

/**
 * Represents general behavior of button.
 */
export interface ButtonInterface extends DefaultComponentInterface<ButtonInterface> {
  /**
   * Performs clicks in the browser on the element.
   * @returns self reference
   */
  click(): Promise<ButtonInterface>
}

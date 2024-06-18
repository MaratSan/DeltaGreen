import { Button } from '../impl/button'
import { Input } from '../impl/input'
import { Label } from '../impl/label'
/**
 * Facilitates static creation of web-element representation objects used for
 * web testing purposes.
 */
export class ComponentFactory {
  public static createLabel() {
    return Label.newInstance()
  }
  public static createButton() {
    return Button.newInstance()
  }
  public static createInput() {
    return Input.newInstance()
  }
}

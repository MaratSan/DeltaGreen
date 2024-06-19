import { Button } from '../button/button'
import { Input } from '../input/input'
import { Label } from '../label/label'
/**
 * Facilitates static creation of web-element representation objects used for
 * web testing purposes.
 */
export class ComponentFactory {
  // public static createLabel() {
  //   return Label.newInstance()
  // }
  public static createLabel() {
    return new Label();
  }
  public static createButton() {
    return new Button()
  }
  public static createInput() {
    return new Input();
  }
}

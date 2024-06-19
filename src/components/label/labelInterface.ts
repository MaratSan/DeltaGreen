import { DefaultComponentInterface } from '../commonComponents/defaultComponentInterface'

/**
 * Represents common behavior of label, of common text fields(headings,
 * titles, input labels, ...).
 */
export interface LabelInterface extends DefaultComponentInterface<LabelInterface> {
  /**
   * Sets expected text value of the label.
   * @param labelText text value of label
   */
  setLabelText(labelText: string): LabelInterface
}

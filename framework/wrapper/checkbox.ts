import { BaseElement } from './baseElement';

export class Checkbox extends BaseElement {
  override get typeOf(): string {
    return 'Checkbox';
  }
}

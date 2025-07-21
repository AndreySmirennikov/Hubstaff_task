import { BaseElement } from './baseElement';

export class Button extends BaseElement {
  override get typeOf(): string {
    return 'Button';
  }
}

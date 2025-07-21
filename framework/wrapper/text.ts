import { BaseElement } from './baseElement';

export class Text extends BaseElement {
  override get typeOf(): string {
    return 'Text';
  }
}

import { BaseElement } from './baseElement';

export class Title extends BaseElement {
  override get typeOf(): string {
    return 'Title';
  }
}

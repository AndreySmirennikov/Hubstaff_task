import { BaseElement } from './baseElement';

export class Link extends BaseElement {
  override get typeOf(): string {
    return 'Link';
  }
}

import { Locator } from '@playwright/test';

import { BaseElement } from './baseElement';

export class Input extends BaseElement {
  override get typeOf(): string {
    return 'Input';
  }

  async fill(text: string, options?: Parameters<Locator['fill']>[1]) {
    return this.step(`fill "${text}"`, () => this.el.fill(text, options));
  }
}

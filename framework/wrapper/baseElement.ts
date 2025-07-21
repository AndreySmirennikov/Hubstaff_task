import { expect, Locator, Page, test } from '@playwright/test';

export class BaseElement {
  el: Locator;
  protected locator: string;
  protected page: Page;
  protected name: string;

  public constructor(page: Page, locator: string, name: string) {
    this.page = page;
    this.locator = locator;
    this.el = page.locator(locator);
    this.name = name;
  }

  static fromSelector<T extends BaseElement>(
    this: new (page: Page, locator: string, name: string) => T,
    page: Page,
    selector: string,
    name: string,
  ): T {
    return new this(page, selector, name);
  }

  static fromLocator<T extends BaseElement>(
    this: new (page: Page, locator: string, name: string) => T,
    locator: Locator,
    name: string,
  ): T {
    const inst = new this(locator.page(), '', name);
    inst.el = locator;
    return inst;
  }

  get typeOf(): string {
    return 'WebElement';
  }

  get webElementName(): string {
    if (!this.name) {
      throw Error('Provide "name" property to use "componentName"');
    }

    return this.name;
  }

  nth(index: number) {
    this.el = this.el.nth(index);
    return this;
  }

  first() {
    this.el = this.el.nth(0);
    return this;
  }

  protected step<T>(action: string, fn: () => Promise<T>): Promise<T> {
    return test.step(
      `${this.typeOf} with name "${this.webElementName}" ${action}`,
      fn,
    );
  }

  async click(options?: Parameters<Locator['click']>[0]) {
    return this.step('click', () => this.el.click(options));
  }

  async type(text: string, options?: Parameters<Locator['type']>[1]) {
    return this.step(`type "${text}"`, () => this.el.type(text, options));
  }

  async press(key: string, options?: Parameters<Locator['press']>[1]) {
    return this.step(`press "${key}"`, () => this.el.press(key, options));
  }

  async hover(options?: Parameters<Locator['hover']>[0]) {
    return this.step('hover', () => this.el.hover(options));
  }

  async check(options?: Parameters<Locator['check']>[0]) {
    return this.step('check', () => this.el.check(options));
  }

  async uncheck(options?: Parameters<Locator['uncheck']>[0]) {
    return this.step('uncheck', () => this.el.uncheck(options));
  }

  async selectOption(
    values: Parameters<Locator['selectOption']>[0],
    options?: Parameters<Locator['selectOption']>[1],
  ) {
    const vals = JSON.stringify(values);
    return this.step(`selectOption(${vals})`, () =>
      this.el.selectOption(values, options),
    );
  }

  async shouldBeAttached(options?: {
    attached?: boolean;

    timeout?: number;
  }): Promise<void> {
    return this.step('should be attached', () =>
      expect(this.el).toBeAttached(options),
    );
  }

  async shouldBeChecked(options?: {
    checked?: boolean;
    indeterminate?: boolean;
    timeout?: number;
  }): Promise<void> {
    return this.step('should be checked', () =>
      expect(this.el).toBeChecked(options),
    );
  }

  async shouldBeDisabled(options?: {
    disabled?: boolean;
    timeout?: number;
  }): Promise<void> {
    return this.step('should be disabled', () =>
      expect(this.el).toBeDisabled(options),
    );
  }

  async shouldBeEditable(options?: {
    editable?: boolean;
    timeout?: number;
  }): Promise<void> {
    return this.step('should be editable', () =>
      expect(this.el).toBeEditable(options),
    );
  }

  async shouldBeEmpty(options?: { timeout?: number }): Promise<void> {
    return this.step('should be empty', () =>
      expect(this.el).toBeEmpty(options),
    );
  }

  async shouldBeEnabled(options?: {
    enabled?: boolean;
    timeout?: number;
  }): Promise<void> {
    return this.step('should be enabled', () =>
      expect(this.el).toBeEnabled(options),
    );
  }

  async shouldBeFocused(options?: { timeout?: number }): Promise<void> {
    return this.step('should be focused', () =>
      expect(this.el).toBeFocused(options),
    );
  }

  async shouldBeHidden(options?: { timeout?: number }): Promise<void> {
    return this.step('should be hidden', () =>
      expect(this.el).toBeHidden(options),
    );
  }

  async shouldBeInViewport(options?: {
    ratio?: number;
    timeout?: number;
  }): Promise<void> {
    return this.step('should be in viewport', () =>
      expect(this.el).toBeInViewport(options),
    );
  }

  async shouldBeVisible(options?: {
    timeout?: number;
    visible?: boolean;
  }): Promise<void> {
    return this.step('should be visible', () =>
      expect(this.el).toBeVisible(options),
    );
  }

  async shouldHaveAccessibleDescription(
    description: string | RegExp,
    options?: {
      ignoreCase?: boolean;
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should have accessible description', () =>
      expect(this.el).toHaveAccessibleDescription(description, options),
    );
  }

  async shouldHaveAccessibleName(
    name: string | RegExp,
    options?: {
      ignoreCase?: boolean;
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should have accessible name', () =>
      expect(this.el).toHaveAccessibleName(name, options),
    );
  }

  async shouldHaveAttribute(
    name: string,
    value: string | RegExp,
    options?: {
      ignoreCase?: boolean;
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should have attribute', () =>
      expect(this.el).toHaveAttribute(name, value, options),
    );
  }

  async shouldHaveClass(
    expected: string | RegExp | ReadonlyArray<string | RegExp>,
    options?: {
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should have class', () =>
      expect(this.el).toHaveClass(expected, options),
    );
  }

  async shouldHaveCount(
    count: number,
    options?: {
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should have count', () =>
      expect(this.el).toHaveCount(count, options),
    );
  }

  async shouldHaveCSS(
    name: string,
    value: string | RegExp,
    options?: {
      timeout?: number;
    },
  ): Promise<void> {
    return this.step(`should have CSS ${name} = ${value}`, () =>
      expect(this.el).toHaveCSS(name, value, options),
    );
  }

  async shouldHaveId(
    id: string | RegExp,
    options?: {
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should have id', () =>
      expect(this.el).toHaveId(id, options),
    );
  }

  async shouldHaveJSProperty(
    name: string,
    value: unknown,
    options?: {
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should have JS property', () =>
      expect(this.el).toHaveJSProperty(name, value, options),
    );
  }

  async shouldHaveRole(
    role:
      | 'alert'
      | 'alertdialog'
      | 'application'
      | 'article'
      | 'banner'
      | 'blockquote'
      | 'button'
      | 'caption'
      | 'cell'
      | 'checkbox'
      | 'columnheader'
      | 'combobox'
      | 'complementary'
      | 'contentinfo'
      | 'definition'
      | 'dialog'
      | 'directory'
      | 'document'
      | 'feed'
      | 'figure'
      | 'form'
      | 'grid'
      | 'gridcell'
      | 'group'
      | 'heading'
      | 'img'
      | 'link'
      | 'list'
      | 'listitem'
      | 'log'
      | 'main'
      | 'marquee'
      | 'math'
      | 'menu'
      | 'menubar'
      | 'menuitem'
      | 'menuitemcheckbox'
      | 'menuitemradio'
      | 'navigation'
      | 'none'
      | 'note'
      | 'option'
      | 'presentation'
      | 'progressbar'
      | 'radio'
      | 'radiogroup'
      | 'region'
      | 'row'
      | 'rowgroup'
      | 'rowheader'
      | 'scrollbar'
      | 'search'
      | 'searchbox'
      | 'separator'
      | 'slider'
      | 'spinbutton'
      | 'status'
      | 'switch'
      | 'tab'
      | 'table'
      | 'tablist'
      | 'tabpanel'
      | 'term'
      | 'textbox'
      | 'timer'
      | 'toolbar'
      | 'tooltip'
      | 'tree'
      | 'treegrid'
      | 'treeitem',
    options?: {
      checked?: boolean;
      includeHidden?: boolean;
      level?: number;
      name?: string | RegExp;
      pressed?: boolean;
      selected?: boolean;
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should have role', () =>
      expect(this.el).toHaveRole(role, options),
    );
  }

  async shouldHaveScreenshot(
    name: string | ReadonlyArray<string>,
    options?: {
      animations?: 'disabled' | 'allow';
      caret?: 'hide' | 'initial';
      mask?: Array<Locator>;
      maskColor?: string;
      maxDiffPixelRatio?: number;
      maxDiffPixels?: number;
      omitBackground?: boolean;
      scale?: 'css' | 'device';
      stylePath?: string | Array<string>;
      threshold?: number;
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should have screenshot', () =>
      expect(this.el).toHaveScreenshot(name, options),
    );
  }

  async shouldContainText(
    expected: string | RegExp | ReadonlyArray<string | RegExp>,
    options?: {
      ignoreCase?: boolean;
      timeout?: number;
      useInnerText?: boolean;
    },
  ): Promise<void> {
    return this.step(`should contain text: ${expected}`, () =>
      expect(this.el).toContainText(expected, options),
    );
  }

  async shouldHaveText(
    expected: string | RegExp | ReadonlyArray<string | RegExp>,
    options?: {
      ignoreCase?: boolean;
      normalizeWhiteSpace?: boolean;
      timeout?: number;
    },
  ): Promise<void> {
    return this.step(`should have text: ${expected}`, () =>
      expect(this.el).toHaveText(expected, options),
    );
  }

  async shouldHaveValue(
    value: string | RegExp,
    options?: {
      timeout?: number;
    },
  ): Promise<void> {
    return this.step(`should have value: ${value}`, () =>
      expect(this.el).toHaveValue(value, options),
    );
  }

  async shouldHaveValues(
    values: ReadonlyArray<string | RegExp>,
    options?: {
      timeout?: number;
    },
  ): Promise<void> {
    return this.step(`should have values: ${values}`, () =>
      expect(this.el).toHaveValues(values, options),
    );
  }

  async shouldMatchAriaSnapshot(
    expected: string,
    options?: {
      timeout?: number;
    },
  ): Promise<void> {
    return this.step('should match aria snapshot', () =>
      expect(this.el).toMatchAriaSnapshot(expected, options),
    );
  }
}

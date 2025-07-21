import { Page, test } from '@playwright/test';
import { Button } from '../wrapper';

export abstract class BasePage {
  protected page: Page;
  readonly acceptCookieButton: Button;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookieButton = Button.fromLocator(this.page.getByRole('button', { name: 'OK' }), 'Accept Cookie Button');
  }

  async extractOrgIdAfterSignIn(): Promise<string> {
    return await test.step('Extract org id after sign in', async () => {
      await this.page.waitForURL('**/getting_started/**');
      return this.page.url().split('/').pop()!;
    });
  }

  abstract verifyPageLoaded(): Promise<void>;
}
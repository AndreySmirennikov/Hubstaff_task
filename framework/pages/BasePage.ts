import { Page, test } from '@playwright/test';
import { Button } from '../wrapper';

export abstract class BasePage {
  protected page: Page;
  readonly acceptCookieButton: Button;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookieButton = new Button(
      this.page,
      'button[id*="ButtonAccept"]',
      'OK Button Accept terms'
    );
  }

  async acceptCookie() {
    await test.step('Accept cookie', async () => {
      await this.acceptCookieButton.click();
    });
  }

  async extractOrgIdAfterSignIn(): Promise<string> {
    return await test.step('Extract org id after sign in', async () => {
      await this.page.waitForURL('**/getting_started/**');
      return this.page.url().split('/').pop()!;
    });
  }

  abstract verifyPageLoaded(): Promise<void>;
}

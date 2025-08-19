import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { Button, Input, Text } from '../wrapper';

export class LoginPage extends BasePage {
  readonly workEmailInput: Input;
  readonly passwordInput: Input;
  readonly signInButton: Button;
  readonly pageHeading: Text;

  constructor(page: Page) {
    super(page);
    this.workEmailInput = Input.fromLocator(
      this.page.getByRole('textbox', { name: 'Work email *' }),
      'Work Email Input'
    );
    this.passwordInput = Input.fromLocator(
      this.page.getByRole('textbox', { name: 'Password *' }),
      'Password Input'
    );
    this.signInButton = Button.fromLocator(
      this.page.getByRole('button', { name: 'Sign in' }),
      'Sign in Button'
    );
    this.pageHeading = Text.fromLocator(
      this.page.getByRole('heading', { name: 'Sign in to Hubstaff' }),
      'Page Heading'
    );
  }

  async fillLoginForm(email: string, password: string) {
    await test.step('Fill login form', async () => {
      await this.workEmailInput.fill(email);
      await this.passwordInput.fill(password);
    });
  }

  async clickSignInButton() {
    await test.step('Click "Sign in" button', async () => {
      await this.signInButton.click();
    });
  }

  async verifyPageLoaded() {
    await test.step('Verify login page is loaded', async () => {
      await this.pageHeading.shouldBeVisible();
      await this.workEmailInput.shouldBeVisible();
      await this.passwordInput.shouldBeVisible();
      await this.signInButton.shouldBeVisible();
    });
  }
}

import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { Button, Input, Checkbox, Text } from '../wrapper';
import { UserData } from '../utils/test-data-generator';

export class SignupPage extends BasePage {
  readonly firstNameInput: Input;
  readonly lastNameInput: Input;
  readonly emailInput: Input;
  readonly passwordInput: Input;
  readonly termsCheckbox: Checkbox;
  readonly createAccountButton: Button;
  readonly pageTitle: Text;
  readonly errorDialog: Button;
  readonly okButton: Button;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = new Input(this.page, '[data-testid="first_name"]', 'First Name Input');
    this.lastNameInput = new Input(this.page, '[data-testid="last_name"]', 'Last Name Input');
    this.emailInput = new Input(this.page, '[data-testid="email"]', 'Email Input');
    this.passwordInput = new Input(this.page, '[data-testid="password"]', 'Password Input');
    this.termsCheckbox = new Checkbox(this.page, '[data-testid="accept_terms"]', 'Terms Checkbox');
    this.createAccountButton = new Button(
      this.page,
      '[data-testid="create_my_account"]',
      'Create My Account Button'
    );
    this.pageTitle = new Text(this.page, 'div[class*=heading]', 'Page Title');
    this.errorDialog = new Button(
      this.page,
      'dialog:has-text("This domain is prevented")',
      'Error Dialog'
    );
    this.okButton = new Button(this.page, 'button:has-text("OK")', 'OK Button');
  }

  async fillSignupForm(userData: UserData) {
    await test.step('Fill registration form', async () => {
      await this.firstNameInput.fill(userData.firstName);
      await this.lastNameInput.fill(userData.lastName);
      await this.emailInput.fill(userData.email!);
      await this.passwordInput.fill(userData.password);
    });
  }

  async acceptTerms() {
    await test.step('Accept terms', async () => {
      await this.page.evaluate(() => {
        const checkbox = document.querySelector('[data-testid="accept_terms"]') as HTMLInputElement;
        if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
  }

  async clickCreateAccount() {
    await test.step('Click "Create my account" button', async () => {
      await this.createAccountButton.click();
    });
  }

  async verifyPageLoaded() {
    await test.step('Verify signup page is loaded and all form fields are present', async () => {
      await this.firstNameInput.shouldBeVisible();
      await this.lastNameInput.shouldBeVisible();
      await this.emailInput.shouldBeVisible();
      await this.passwordInput.shouldBeVisible();
      await this.termsCheckbox.shouldBeVisible();
      await this.createAccountButton.shouldBeVisible();
      await this.pageTitle.shouldBeVisible();
    });
  }
}

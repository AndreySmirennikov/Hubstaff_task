import { Page, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { Input, Button, Link, DropDown, Text } from '../wrapper';

export class TeamPaymentsPage extends BasePage {
  readonly oneTimeAmountTab: Link;
  readonly membersDropdown: Link; // Adjust based on actual element
  readonly amountInput: Input;
  readonly noteInput: Input;
  readonly createPaymentButton: Button;
  readonly createPaymentInModal: Button;
  readonly notNowButton: Button;
  readonly memberNames: Text;
  readonly paymentSummaryModal: Text;
  readonly markedAsPaidNotice: Text;
  readonly exportTabModal: Button;
  readonly sendTabModal: Button;

  constructor(page: Page) {
    super(page);
    this.oneTimeAmountTab = new Link(this.page, 'a[href*="bonus"]', 'One-time amount tab');
    this.membersDropdown = new DropDown(this.page, "select[name*='team_payment[member_ids]']", 'Members dropdown');
    this.memberNames = new Text(this.page, 'span[class=selection] li[title]', 'Member names');
    this.amountInput = new Input(this.page, '[id=team_payment_total_amount]', 'Amount per member');
    this.noteInput = new Input(this.page, '[id=team_payment_note]', 'Note');
    this.createPaymentButton = new Button(this.page, 'a[class*=bonus-payment]', 'Create payment');
    this.createPaymentInModal = new Button(this.page, 'input[type="submit"][name]', 'Create payment in modal');
    this.notNowButton = Button.fromLocator(this.page.locator('//button[contains(text(), "Not now")]').first(), 'Not now');
    this.paymentSummaryModal = new Text(this.page, '[id="#payment-wizard-modal-form"]', 'Payment Summary Modal');
    this.markedAsPaidNotice = new Text(this.page, 'div.notice:has-text("Marked as paid")', 'Marked as Paid Notice');
    this.exportTabModal = new Button(this.page, 'li[class*=export]', 'Export tab at Modal');
    this.sendTabModal = new Button(this.page, 'li[class*=send]', 'Send tab at Modal');
  }

  async clickOneTimeAmountTab() {
    await test.step('Click One-Time Amount Tab', async () => {
      await this.oneTimeAmountTab.click();
      await this.page.waitForURL('**/bonus');
    });
  }

  async verifyOneTimeAmountTabLoaded() {
    await test.step('Verify One-Time Amount Tab Loaded', async () => {
      await this.amountInput.shouldBeVisible();
    });
  }

  async selectMember(memberName: string) {
    await test.step(`Select Member: ${memberName}`, async () => {
      await this.membersDropdown.selectOption(memberName);
    });
  }

  async verifyMemberSelected(memberName: string) {
    await test.step(`Verify Member Selected: ${memberName}`, async () => {
      await this.memberNames.shouldHaveText(memberName);
    });
  }

  async fillAmount(amount: string) {
    await test.step(`Fill Amount: ${amount}`, async () => {
      await this.amountInput.fill(amount);
      await this.amountInput.shouldHaveValue(amount);
    });
  }

  async fillNote(note: string) {
    await test.step(`Fill Note: ${note}`, async () => {
      await this.noteInput.fill(note);
      await this.noteInput.shouldHaveValue(note);
    });
  }

  async clickCreatePayment() {
    await test.step('Click Create Payment', async () => {
      await this.createPaymentButton.click();
    });
  }

  async clickCreatePaymentInModal() {
    await test.step('Click Create Payment in Modal', async () => {
      await this.createPaymentInModal.click();
    });
  }

  async clickNotNowInExportModal() {
    await test.step('Click "Not Now" in Export Modal', async () => {
      await this.notNowButton.click();
    });
  }

  async verifyPaymentSummaryModalDetails(amount: string, org: string) {
    await test.step('Verify Payment Summary Modal details', async () => {
      await this.paymentSummaryModal.shouldBeVisible();
      await this.paymentSummaryModal.shouldContainText(amount);
      await this.paymentSummaryModal.shouldContainText(org);
      await this.paymentSummaryModal.shouldContainText("After you create the payment, you can find it in the 'Past payments' menu. From there, you have the option to export or send the payment in the next step.");
    });
  }

  async verifyExportSendModalIsVisible() {
    await test.step('Verify modal with Export and Send tabs is visible', async () => {
      await this.sendTabModal.shouldBeVisible();
      await this.exportTabModal.shouldBeVisible();
    });
  }

  async verifyPaymentSummary(member: string, rateType: string, hours: string, status: string, amount: string) {
    await test.step(`Verify Payment Summary for: ${member}`, async () => {
      const row = this.page.locator(`//tr[td[text()="${member}"]]`);
      await expect(row.locator('td').nth(0)).toHaveText(member);
      await expect(row.locator('td').nth(1)).toContainText(rateType);
      await expect(row.locator('td').nth(2)).toContainText(hours);
      await expect(row.locator('td').nth(3)).toContainText(status);
      await expect(row.locator('td').nth(4)).toHaveText(amount);
    });
  }

  async verifyPageLoaded(): Promise<void> {
    await test.step('Verify Team Payments Page Loaded', async () => {
      await this.page.waitForSelector('//h2[contains(text(), "Create payments")]');
    });
  }
}
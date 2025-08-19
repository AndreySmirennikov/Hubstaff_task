import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { Text } from '../wrapper';

export class DashboardPage extends BasePage {
  readonly dashboardHeading: Text;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = Text.fromLocator(
      this.page.locator('h2[class*=heading]'),
      'Dashboard Heading'
    );
  }

  async verifyPageLoaded() {
    await test.step('Verify dashboard page is loaded', async () => {
      await this.dashboardHeading.shouldBeVisible();
    });
  }
}

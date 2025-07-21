import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { Text } from '../wrapper';

export class EmailVerificationPage extends BasePage {
    readonly pageTitle: Text;


    constructor(page: Page) {
        super(page);
        this.pageTitle = new Text(this.page, 'h1[class*=title]', 'Page Title');
    }

    async verifyPageLoaded() {
        await test.step('Verify email verification page is loaded', async () => {
            await this.pageTitle.shouldBeVisible();
        });
    }
}

export default EmailVerificationPage; 
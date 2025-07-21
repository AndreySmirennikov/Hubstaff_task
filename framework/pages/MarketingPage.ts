import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { Button, Input, Text, Link } from '../wrapper';

export class MarketingPage extends BasePage {
    readonly freeTrialButton: Button;
    readonly mainHeading: Text;
    readonly signInButton: Link;

    constructor(page: Page) {
        super(page);
        this.freeTrialButton = Button.fromLocator(this.page.locator('a[href*=signup][data-name="Free 14-day trial"]').first(), 'Free 14-day trial Button');
        this.mainHeading = Text.fromLocator(this.page.getByRole('heading', { name: 'Time tracking software for' }), 'Main Heading');
        this.signInButton = Link.fromLocator(this.page.getByRole('link', { name: 'Sign in' }), 'Sign in Button');
    }

    async clickFreeTrialButton() {
        await test.step('Click "Free 14-day trial" button', async () => {
            await this.freeTrialButton.click();
        });
    }

    async clickSignInButton() {
        await test.step('Click "Sign in" button', async () => {
            await this.signInButton.click();
        });
    }
    
    async verifyPageLoaded() {
        await test.step('Verify marketing page is loaded', async () => {
            await this.mainHeading.shouldBeVisible();
        });
    }
}
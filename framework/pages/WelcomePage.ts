import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { Button, Text } from '../wrapper';

export class WelcomePage extends BasePage {
    readonly pageTitle: Text;
    readonly welcomeMessage: Text;
    readonly createOrganizationButton: Button;

    constructor(page: Page) {
        super(page);
        this.pageTitle = new Text(this.page, 'h1[class="title"]', 'Page Title');
        this.welcomeMessage = Text.fromLocator(this.page.locator('div[class=text]').first(), 'Welcome Message');
        this.createOrganizationButton = new Button(this.page, 'a[class*=primary]', 'Create Organization Button');
    }

    async verifyPageLoaded(): Promise<void> {
        await test.step('Verify dashboard page is loaded', async () => {
            await this.pageTitle.shouldBeVisible();
            await this.welcomeMessage.shouldContainText("It looks like you're new to Hubstaff")
            await this.pageTitle.shouldHaveText("Welcome to Hubstaff!");
            await this.createOrganizationButton.shouldBeVisible();
        });
    }
}
import { test as base } from '@playwright/test';
import { PageFactory } from '../pages/PageFactory';
import { PagesName } from '../utils/pagesName';
import * as allure from 'allure-js-commons';

type OpenPageFixture = (pageType: PagesName, orgId: string) => Promise<void>;
type SignInFixture = (email: string, password: string) => Promise<string>;

type TestFixtures = {
  autoOpenBaseUrl: void;
  pages: PageFactory;
  openPage: OpenPageFixture;
  signIn: SignInFixture;
  setAllureId: void;
};

export const test = base.extend<TestFixtures>({
  autoOpenBaseUrl: [
    async ({ page }, use) => {
      await page.goto('/');
      await use();
    },
    { auto: true },
  ],
  pages: async ({ page }, use) => {
    await use(new PageFactory(page));
  },
  openPage: async ({ page }, use) => {
    const openPage: OpenPageFixture = async (pageType, orgId) => {
      await page.goto(`/organizations/${orgId}/${pageType}`);
    };
    await use(openPage);
  },
  signIn: async ({ pages }, use) => {
    const signIn: SignInFixture = async (email, password) => {
      return test.step('Sign in', async () => {
        await pages.marketingPage.clickSignInButton();
        await pages.loginPage.fillLoginForm(email, password);
        await pages.loginPage.clickSignInButton();
        return await pages.loginPage.extractOrgIdAfterSignIn();
      });
    };
    await use(signIn);
  },
  setAllureId: [
    async ({}, use, testInfo) => {
      const numericTag = testInfo.tags.find(t => /^@\d{1,6}$/.test(t));
      if (!numericTag)
        throw new Error(`Test "${testInfo.title}" must have a AllureId @tag. Example: @123456`);
      await allure.allureId(numericTag.slice(1));
      await use();
    },
    { auto: true },
  ],
});

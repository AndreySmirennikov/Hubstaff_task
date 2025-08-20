import { test } from '../../framework/fixtures/base';

test(
  'Sign in from the Marketing page navigation bar',
  { tag: ['@100', '@smoke'] },
  async ({ pages }) => {
    // TODO: IMPLEMENT GENERATE TEST USERS THROUG API
    const testEmail = 'hubstafftestemail+64214@gmail.com';
    const testPassword = 'TestY^yXRDQk';

    await pages.marketingPage.verifyPageLoaded();
    await pages.marketingPage.clickSignInButton();
    await pages.loginPage.verifyPageLoaded();
    await pages.loginPage.fillLoginForm(testEmail, testPassword);
    await pages.loginPage.clickSignInButton();
    await pages.welcomePage.verifyPageLoaded();
  }
);

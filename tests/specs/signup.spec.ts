import { test } from '../../framework/fixtures/base';
import TestDataGenerator from '../../framework/utils/test-data-generator';
import gmailHelper from '../../framework/utils/gmail-helper';

const testDataGenerator = new TestDataGenerator();

test(
  'Should sign up for free trial via top navigation',
  { tag: ['@83', '@smoke'] },
  async ({ pages }) => {
    const userData = testDataGenerator.generateUserData();
    console.log(userData);
    await pages.marketingPage.clickFreeTrialButton();
    await pages.signupPage.verifyPageLoaded();
    await pages.signupPage.fillSignupForm(userData);
    await pages.signupPage.acceptTerms();
    await pages.signupPage.clickCreateAccount();
    await pages.emailVerificationPage.verifyPageLoaded();
    try {
      await gmailHelper.connect();
      const confirmationLink = await gmailHelper.waitForHubstaffEmail(userData.email!);
      await pages.page.goto(confirmationLink!);

      await pages.welcomePage.verifyPageLoaded();
    } finally {
      await gmailHelper.disconnect();
    }
  }
);

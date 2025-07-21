import { test } from '../../framework/fixtures/base';

test('Sign in from the Marketing page navigation bar', { tag: ['@100'] }, async ({ pages }) => {
    // TODO: IMPLEMENT GENERATE TEST USERS THROUG API
    const testEmail = 'hubstafftestemail+37647@gmail.com';
    const testPassword = 'Test7h&A%!!d';

    await pages.marketingPage.verifyPageLoaded();
    await pages.marketingPage.clickSignInButton();
    await pages.loginPage.verifyPageLoaded();
    await pages.loginPage.fillLoginForm(testEmail, testPassword);
    await pages.loginPage.clickSignInButton();
    // TEST SHOULD FAIL HERE BECAUSE WE ARE NOT IN THE DASHBOARD PAGE AFTER SIGN IN, 
    // AS IT IS DESCRIBED IN THE TEST CASE  
    await pages.dashboardPage.verifyPageLoaded();
});

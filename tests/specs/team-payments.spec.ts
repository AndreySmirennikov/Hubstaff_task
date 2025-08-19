import { test } from '../../framework/fixtures/base';
import { PagesName } from '../../framework/utils/pagesName';

test.beforeEach(async ({ pages, openPage, signIn }) => {
  // TODO: IMPLEMENT GENERATE TEST DATA THROUG API
  const testEmail = 'hubstafftestemail+17443@gmail.com';
  const testPassword = 'Testv6Mr$gpR';

  const orgId = await signIn(testEmail, testPassword);
  await openPage(PagesName.TEAM_PAYMENTS, orgId);
  await pages.teamPaymentsPage.clickOneTimeAmountTab();
  await pages.teamPaymentsPage.verifyOneTimeAmountTabLoaded();
});

test(
  'Create a team payment: one-time amount aka “bonus” payment',
  { tag: ['@93'] },
  async ({ pages }) => {
    await pages.teamPaymentsPage.selectMember('John Doe');
    await pages.teamPaymentsPage.fillAmount('1.00');
    await pages.teamPaymentsPage.fillNote('Test bonus');
    await pages.teamPaymentsPage.clickCreatePayment();
    await pages.teamPaymentsPage.verifyPaymentSummaryModalDetails('$1.00', "John's Organization");
    await pages.teamPaymentsPage.clickCreatePaymentInModal();
    //TODO: THERE SHOULD BE THE MARKED AS PAID NOTICE IN THE MODAL. BUT I DID NOT FOUND IT. NEED CLARIFICATION
    await pages.teamPaymentsPage.verifyExportSendModalIsVisible();
    await pages.teamPaymentsPage.clickNotNowInExportModal();
    await pages.teamPaymentsPage.verifyPaymentSummary(
      'John Doe',
      'Bonus',
      '0:00:00',
      'Pending',
      '$1.00'
    );
  }
);

test.afterEach(async ({}) => {
  // TODO: Implement payment deletion: prefer the API approach
});

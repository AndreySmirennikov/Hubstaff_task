import { test } from '../../framework/fixtures/base';
import { PagesName } from '../../framework/utils/pagesName';

let projectName: string;

test.beforeEach(async ({ pages, openPage, signIn }) => {
  // TODO: IMPLEMENT GENERATE TEST USERS THROUG API
  const testEmail = 'hubstafftestemail+17443@gmail.com';
  const testPassword = 'Testv6Mr$gpR';
  const orgId = await signIn(testEmail, testPassword);
  await openPage(PagesName.PROJECTS, orgId);
  await pages.projectsPage.verifyPageLoaded();
});

test('Add/create project', { tag: ['@69'] }, async ({ pages }) => {
  projectName = 'UniqueTestProject' + Date.now();

  await pages.projectsPage.clickAddProject();
  await pages.projectsPage.fillProjectName(projectName);
  await pages.projectsPage.clickSave();
  await pages.projectsPage.verifyProjectCreatedNotification();
  await pages.projectsPage.verifyProjectInList(projectName);
});

test.afterEach(async ({ pages }) => {
  await pages.projectsPage.deleteProject(projectName);
});

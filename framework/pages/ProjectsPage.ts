import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { Input, Button, Text } from '../wrapper';

export class ProjectsPage extends BasePage {
  readonly addProjectButton: Button;
  readonly projectNameInput: Input;
  readonly saveButton: Button;
  readonly notification: Text;
  readonly title: Text;

  constructor(page: Page) {
    super(page);
    this.addProjectButton = new Button(page, 'text=Add project', 'Add project Button');
    this.projectNameInput = new Input(page, 'textarea[placeholder="Add project names separated by new lines"]', 'Project Name Input');
    this.saveButton = new Button(page, 'button:has-text("Save")', 'Save Button');
    this.notification = new Text(page, 'div[class*="notification"] div[class*="message"]', 'Notification Message');
    this.title = new Text(page, 'h2[class="page-heading"]', 'Tittle "Projects"');
  }

  async clickAddProject() {
    await test.step('Click Add project button', async () => {
      await this.addProjectButton.click();
    });
  }

  async fillProjectName(name: string) {
    await test.step('Enter project name', async () => {
      await this.projectNameInput.fill(name);
    });
  }

  async clickSave() {
    await test.step('Click Save button', async () => {
      await this.saveButton.click();
    });
  }

  async verifyProjectCreatedNotification() {
    await test.step('Verify "Project created" notification is visible', async () => {
      await this.notification.shouldHaveText('Project created');
    });
  }

  async verifyProjectInList(projectName: string) {
    await test.step('Verify project is in the list', async () => {
      await this.page.getByText(projectName).waitFor({ state: 'visible' });
    });
  }

  async verifyPageLoaded(): Promise<void> {
    await test.step('Verify Projects page is loaded', async () => {
      await this.addProjectButton.shouldBeVisible();
    });
  }

  async deleteProject(projectName: string) {
    await test.step(`Delete project: ${projectName}`, async () => {
      // TODO: Implement project deletion: prefer the API approach
    });
  }
}
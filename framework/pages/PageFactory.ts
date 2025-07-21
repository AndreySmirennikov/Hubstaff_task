import { Page } from '@playwright/test';
import { MarketingPage } from './MarketingPage';
import { SignupPage } from './SignupPage';
import { LoginPage } from './LoginPage';
import { EmailVerificationPage } from './EmailVerificationPage';
import { DashboardPage } from './DashboardPage';
import { ProjectsPage } from './ProjectsPage';
import { TeamPaymentsPage } from './TeamPaymentsPage';
import { WelcomePage } from './WelcomePage';

export class PageFactory {
    readonly page: Page;
    readonly marketingPage: MarketingPage;
    readonly signupPage: SignupPage;
    readonly emailVerificationPage: EmailVerificationPage;
    readonly dashboardPage: DashboardPage;
    readonly projectsPage: ProjectsPage;
    readonly teamPaymentsPage: TeamPaymentsPage;
    readonly welcomePage: WelcomePage;
    readonly loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.marketingPage = new MarketingPage(page);
        this.signupPage = new SignupPage(page);
        this.emailVerificationPage = new EmailVerificationPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.projectsPage = new ProjectsPage(page);
        this.teamPaymentsPage = new TeamPaymentsPage(page);
        this.welcomePage = new WelcomePage(page);
        this.loginPage = new LoginPage(page);
    }
} 
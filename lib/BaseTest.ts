import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '../src/BDI3_PageFactory/pageRepository/LoginPage';
import { ElementsPage } from '../src/BDI3_PageFactory/pageRepository/ElementsPage';
import { AlertsFrameWindowsPage } from '../src/BDI3_PageFactory/pageRepository/AlertsFrameWindowsPage';
import { WidgetsPage } from '../src/BDI3_PageFactory/pageRepository/WidgetsPage';
import { InteractionsPage } from '../src/BDI3_PageFactory/pageRepository/InteractionsPage';
import { WebActions } from '@lib/WebActions';
import AxeBuilder from '@axe-core/playwright';

import { BDI3_LoginPage } from 'src/BDI3_PageFactory/pageRepository/BDI3_LoginPage';
import { BDI3_DashBoardPage } from 'src/BDI3_PageFactory/pageRepository/BDI3_DashboardPage';
import { BDI3_ChildPage } from 'src/BDI3_PageFactory/pageRepository/BDI3_ChildPage';

const test = baseTest.extend<{
    webActions: WebActions;
    loginPage: LoginPage;
    elementsPage: ElementsPage;
    alertsFrameWindowsPage: AlertsFrameWindowsPage;
    widgetsPage: WidgetsPage;
    interactionsPage: InteractionsPage;
    makeAxeBuilder: AxeBuilder;
    testInfo: TestInfo;

    bdi3LoginPage: BDI3_LoginPage;
    bdi3DashBoardPAge: BDI3_DashBoardPage;
    bdi3ChildPage: BDI3_ChildPage;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    elementsPage: async ({ page, context }, use) => {
        await use(new ElementsPage(page, context));
    },
    alertsFrameWindowsPage: async ({ page, context }, use) => {
        await use(new AlertsFrameWindowsPage(page, context));
    },
    widgetsPage: async ({ page, context }, use) => {
        await use(new WidgetsPage(page, context));
    },
    interactionsPage: async ({ page, context }, use) => {
        await use(new InteractionsPage(page, context));
    },
    makeAxeBuilder: async ({ page }, use) => {
        await use(new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .exclude('#commonly-reused-element-with-known-issue'));
    },


    bdi3LoginPage: async ({ page, context }, use) => {
        await use(new BDI3_LoginPage(page, context));
    },
    bdi3DashBoardPAge: async ({ page, context }, use) => {
        await use(new BDI3_DashBoardPage(page, context));
    },
    bdi3ChildPage: async ({ page, context }, use) => {
        await use(new BDI3_ChildPage(page, context));
    },


})

export default test;
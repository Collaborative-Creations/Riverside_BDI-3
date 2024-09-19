import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import path from 'path';

export class BDI3_LoginPage {
    private readonly page: Page;
    private readonly ELEMENTS_TITLE: Locator;
    private readonly context: BrowserContext;
    private readonly TEXT_BOX_TITLE: Locator;
    private readonly USERNAME_INPUTBOX: Locator;
    private readonly PASSWORD_INPUTBOX: Locator;
    private readonly SIGNIN_BUTTON: Locator;
    private readonly BDI3_TILE: Locator;
    private readonly BDI3_WELCOME_TEXT: Locator;
    private readonly HOME_SELECTED_TEXT: Locator;
    private readonly NO_RADIO_BUTTON: Locator;
    private readonly WEB_TABLES_HEADER: Locator;
    private readonly WEB_TABLES_EDIT_ICON: Locator;
    private readonly REGISTRATION_FORM_HEADER: Locator;
    private readonly REGISTRATION_FORM_CLOSE_BUTTON: Locator;
    private readonly DOUBLE_CLICK_BUTTON: Locator;
    private readonly DOUBLE_CLICK_TEXT: Locator;
    private readonly RIGHT_CLICK_BUTTON: Locator;
    private readonly RIGHT_CLICK_TEXT: Locator;
    private readonly HOME_LINK: Locator;
    private readonly DOWNLOAD_BUTTON: Locator;
    private readonly UPLOAD_BUTTON: Locator;
    private readonly UPLOADED_FILE_TEXT: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.USERNAME_INPUTBOX = page.getByPlaceholder('Username');
        this.PASSWORD_INPUTBOX = page.getByPlaceholder('Password');
        this.SIGNIN_BUTTON = page.getByRole('button', { name: 'Sign In' });
        this.BDI3_WELCOME_TEXT = page.getByRole('heading', { name: 'Welcome to BDI-3!' });
        this.BDI3_TILE = page.getByLabel('Battelle Development Inventory');
        this.NO_RADIO_BUTTON = page.locator(`#noRadio`); // Using CSS Selector
        this.WEB_TABLES_HEADER = page.getByRole('columnheader');
        this.WEB_TABLES_EDIT_ICON = page.getByRole('row', { name: 'Cierra' }).getByTitle('Edit').locator('svg'); // Chaining Locators
        this.REGISTRATION_FORM_HEADER = page.getByText('Registration Form');
        this.REGISTRATION_FORM_CLOSE_BUTTON = page.getByRole('button', { name: 'Close' });
        this.DOUBLE_CLICK_BUTTON = page.locator('#doubleClickBtn');
        this.DOUBLE_CLICK_TEXT = page.getByText('You have done a double click');
        this.RIGHT_CLICK_BUTTON = page.locator('#rightClickBtn');
        this.RIGHT_CLICK_TEXT = page.getByText('You have done a right click');
        this.HOME_LINK = page.getByText('Home', { exact: true });
        this.DOWNLOAD_BUTTON = page.locator(`#downloadButton`);
        this.UPLOAD_BUTTON = page.locator(`#uploadFile`)
        this.UPLOADED_FILE_TEXT = page.getByText('sampleFile.jpeg');
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/");
    }

    async loginToBDI3(){
        await this.USERNAME_INPUTBOX.fill("bharathi.product9399");
        await this.PASSWORD_INPUTBOX.fill("Adep@1234");
        await this.SIGNIN_BUTTON.click();
        await this.BDI3_TILE.click();
        await this.BDI3_WELCOME_TEXT.waitFor({state:"visible", timeout:30000});
    }


    async verifyHomeCheckboxSelectedText(): Promise<void> {
        await expect(this.HOME_SELECTED_TEXT).toContainText('home'); // Verifies if the locator contains text
    }

    async verifyNoRadioButtonDisabled(): Promise<void> {
        expect(this.NO_RADIO_BUTTON).toBeDisabled()
    }

    async verifyFirstColumnTableHeader(header: String): Promise<void> {
        const headerText = await this.WEB_TABLES_HEADER.allTextContents(); // Get all Text from WebTable Header
        expect(headerText[0] == header).toBeTruthy(); // Verify the First Column Header here we are comparing string values
    }

    async editCierraEntry(): Promise<void> {
        await this.WEB_TABLES_EDIT_ICON.click();
    }

    async verifyRegistrationForm(): Promise<void> {
        await expect(this.REGISTRATION_FORM_HEADER).toBeVisible();
    }

    async registrationFormClose(): Promise<void> {
        await this.REGISTRATION_FORM_CLOSE_BUTTON.click();
    }

    async doubleClickButton(): Promise<void> {
        await this.DOUBLE_CLICK_BUTTON.dblclick();
    }

    async verifyDoubleClickText(): Promise<void> {
        await expect(this.DOUBLE_CLICK_TEXT).toBeVisible();
    }

    async rightClickButton(): Promise<void> {
        await this.RIGHT_CLICK_BUTTON.click({ button: 'right' }); // Right Click on button
    }

    async verifyRightClickText(): Promise<void> {
        await expect(this.RIGHT_CLICK_TEXT).toBeVisible();
    }

    async verifyNewBrowserTab(newPageURLExpected): Promise<void> {
        // Start waiting for new page before clicking.
        const pagePromise = this.context.waitForEvent('page');
        await this.HOME_LINK.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        const newPageURLActual = newPage.url();
        expect(newPageURLActual == newPageURLExpected).toBeTruthy();
    }

    async verifyFileDownload(): Promise<void> {
        // Start waiting for download before clicking. Note no await.
        const downloadPromise = this.page.waitForEvent('download');
        await this.DOWNLOAD_BUTTON.click();
        // Wait for the download process to complete.
        const download = await downloadPromise;
        // File will be downloaded in the Downloads folder of thos project
        await download.saveAs(path.join(__dirname, `../../Downloads`, download.suggestedFilename()));
    }

    async verifyFileUpload(): Promise<void> {
        // Select one file
        const uploadFilePath = path.join(__dirname, `../../utils/functional/sampleFile.jpeg`);
        await this.UPLOAD_BUTTON.setInputFiles(uploadFilePath);
        await expect(this.UPLOADED_FILE_TEXT).toBeVisible();
    }
}
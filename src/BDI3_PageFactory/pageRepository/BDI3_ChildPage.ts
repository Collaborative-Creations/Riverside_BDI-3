import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import path from 'path';

export class BDI3_ChildPage {
    private readonly page: Page;
    private readonly context: BrowserContext;
    private readonly CHILD_ADMINISTRATION_MENU_DROPDOWN: Locator;
    private readonly ADD_CHILD_MENU_DROPDOWN_OPTION: Locator;
    private readonly CHILD_FIRST_NAME_INPUTBOX: Locator;
    private readonly CHILD_LAST_NAME_INPUTBOX: Locator;
    private readonly SAVE_BUTTON: Locator;
    private readonly BDI3_TILE: Locator;
    private readonly BDI3_WELCOME_TEXT: Locator;
    private readonly SAVED_SUCCESSFUL_POPUP: Locator;
    private readonly OK_BUTTON: Locator;
    private readonly CHILD_INFORMATION_HEADING: Locator;
    private readonly CONTENT_LOADING_ICON: Locator;
    private readonly GENDER_DROPDOWN: Locator;






    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.CHILD_ADMINISTRATION_MENU_DROPDOWN = page.getByLabel('Child Administration');
        this.ADD_CHILD_MENU_DROPDOWN_OPTION = page.getByRole('menuitem', { name: 'Add Child' });
        this.CHILD_FIRST_NAME_INPUTBOX = page.getByPlaceholder('Enter child first name');
        this.CHILD_LAST_NAME_INPUTBOX = page.getByPlaceholder('Enter child last name');
        this.SAVE_BUTTON = page.getByRole('button', { name: 'Save', exact: true });
        this.SAVED_SUCCESSFUL_POPUP = page.getByText('Save successful!OK');
        this.OK_BUTTON = page.getByRole('button', { name: 'OK' });
        this.CHILD_INFORMATION_HEADING = page.getByLabel('Child Information');
        this.CONTENT_LOADING_ICON = page.getByLabel('Content Loading');
        this.GENDER_DROPDOWN = page.locator('//div[@class="placeholder"][text()="Select child gender"]');

    }

    async createNewExaminee(){
        await this.CHILD_FIRST_NAME_INPUTBOX.fill("ChildFirstNameHAri");
        await this.CHILD_LAST_NAME_INPUTBOX.fill("ChildLAstNAmeLN");
        await this.selectChildGender("Male"); // optins: Male, Female, Unspecified 

    }

    async selectChildGender(gender: string){
        await this.GENDER_DROPDOWN.click();
        await this.page.locator(`//li[@role="option"]/div[text()="${gender}"]`).click();
    } 

}
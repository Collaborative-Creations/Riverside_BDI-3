import { expect, Locator, Page, BrowserContext } from "@playwright/test";
import path from "path";
import { faker } from "@faker-js/faker";

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
  private readonly LOCATION_DROPDOWN: Locator;
  private readonly DATE_OF_BIRTH_TEXT: Locator;
  private readonly CHILD_NAME: Locator;


  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.CHILD_ADMINISTRATION_MENU_DROPDOWN = page.getByLabel(
      "Child Administration"
    );
    this.ADD_CHILD_MENU_DROPDOWN_OPTION = page.getByRole("menuitem", {
      name: "Add Child",
    });
    this.CHILD_FIRST_NAME_INPUTBOX = page.getByPlaceholder(
      "Enter child first name"
    );
    this.CHILD_LAST_NAME_INPUTBOX = page.getByPlaceholder(
      "Enter child last name"
    );
    this.SAVE_BUTTON = page.locator("//button[text()= 'Save']");
    this.SAVED_SUCCESSFUL_POPUP = page.locator(
      "//div[@class='textGray' and text()='Save successful!']"
    );
    this.OK_BUTTON = page.getByRole("button", { name: "OK" });
    this.CHILD_INFORMATION_HEADING = page.getByLabel("Child Information");
    this.CONTENT_LOADING_ICON = page.getByLabel("Content Loading");
    this.GENDER_DROPDOWN = page.locator(
      '//div[@class="placeholder"][text()="Select child gender"]'
    );
    this.LOCATION_DROPDOWN = page.locator("//button[@role='tree']");
    this.DATE_OF_BIRTH_TEXT = page.locator(
      "(//input[@class='text-input with-icon'])[1]"
    );
    this.CHILD_NAME = page.locator('.heading-child-name');
  }

  async createNewExaminee(): Promise<string[]> {
    const randomString = generateRandomString();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    await this.CHILD_FIRST_NAME_INPUTBOX.fill(firstName);
    await this.CHILD_LAST_NAME_INPUTBOX.fill(lastName);
    console.log(`Examniee firstname and lastname is ${firstName},${lastName}`);
    await this.selectChildGender("Female"); // optins: Male, Female, Unspecified
    await this.DATE_OF_BIRTH_TEXT.fill("09/06/2018");
    await this.selectlocation("product"); // options: root location, sub locations
    await this.SAVE_BUTTON.scrollIntoViewIfNeeded();
    await this.clickSaveButton();
    await this.acceptSavePopup();

    return [firstName, lastName];
  }

  async validateCreatedExaminee(firstName: string, lastName: string) {    
    const childName = await this.CHILD_NAME.textContent();
    expect(childName).toContain(firstName);
    expect(childName).toContain(lastName);
  }

  async selectChildGender(gender: string) {
    await this.GENDER_DROPDOWN.click();
    await this.page
      .locator(`//li[@role="option"]/div[text()="${gender}"]`)
      .click();
  }

  async selectlocation(_Location: string) {
    await this.LOCATION_DROPDOWN.click();
    // await this.page.locator(`//div[@class='item-text single-select'][text()='bha33']`).click();
  }
  async clickSaveButton() {
    await this.SAVE_BUTTON.click();
  }
  async acceptSavePopup() {
    await this.SAVED_SUCCESSFUL_POPUP.waitFor({
      state: "visible",
      timeout: 60000,
    });
    await this.OK_BUTTON.click();
    await this.page.waitForLoadState('load',{timeout: 60000});
  }
}
function generateRandomString(): string {
  const getRandomDigit = () => Math.floor(Math.random() * 10).toString();
  const getRandomCapitalLetter = () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26));

  let randomString = "";

  // Generate 4 random numbers
  for (let i = 0; i < 4; i++) {
    randomString += getRandomDigit();
  }

  // Generate 1 random capital letter
  randomString += getRandomCapitalLetter();

  // Generate 4 more random numbers
  for (let i = 0; i < 4; i++) {
    randomString += getRandomDigit();
  }

  // Generate 1 more random capital letter
  randomString += getRandomCapitalLetter();

  return randomString;
}

// Example usage

import test from '@lib/BaseTest';

// We can use Steps like in Cucmber format as shown below

test(`Verify BDI3 Login`, { tag: '@Smoke'}, async ({ bdi3LoginPage }) => {
    await test.step(`Navigate to Prod Url`, async () => {
        await bdi3LoginPage.navigateToURL();
    });
    await test.step(`Login to BDI3 product`, async () => {
        await bdi3LoginPage.loginToBDI3();
    });
    // await test.step(`Click on Login button in Main page`, async () => {
    //     await loginPage.clickOnLoginMainButton();
    // });
    // await test.step(`Login to Book Store application`, async () => {
    //     await loginPage.loginToApplication();
    // });
    // await test.step(`Verify User is logged in and navigated to Profile page`, async () => {
    //     await loginPage.verifyProfilePage();
    // });
}); 
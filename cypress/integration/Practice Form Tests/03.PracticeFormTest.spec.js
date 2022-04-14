/// <reference types ="cypress"/>
import HomePage from "../../pages/homepage";
import PracticeFormPage from "../../pages/Practice Forms/practiceForm.page";
const homePage = new HomePage();
const practiceFormPage = new PracticeFormPage();
const { faker } = require("@faker-js/faker");

describe("Should test Practice Form", () => {
  before("Visit app", () => {
    homePage.vistPage();
    homePage.navigateToThePage("Forms", "Practice Form");
  });
  it.only("should fill in student registration form", () => {
    const firstname = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const mobile = faker.datatype.number(10000000000);
    const currentAddress = faker.address.streetName();
    const dateOfBirth = "3/12/1993";
    const imagePath =
      "/Users/marijamilosavljevic/Desktop/cypress-workshop/5.jpg";
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    practiceFormPage.fillInRegistrationForm(
      firstname,
      lastName,
      email,
      mobile,
      dateOfBirth,
      currentAddress,
      imagePath
    );
    practiceFormPage.verifyRegistrationFormTable(
      firstname,
      lastName,
      email,
      mobile,
      dateOfBirth,
      currentAddress,
      imagePath
    );
  });
});

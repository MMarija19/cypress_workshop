/// <reference types ="cypress"/>
import HomePage from "../../pages/homepage";
import TextBoxPage from "../../pages/Elements/textbox.page";
import CheckboxPage from "../../pages/Elements/checkbox.page";
import RadioButtonPage from "../../pages/Elements/radiobuttons.page";
import WebTablesPage from "../../pages/Elements/webtables.page";

const homePage = new HomePage();
const textBoxPage = new TextBoxPage();
const checkboxPage = new CheckboxPage();
const radioButtonPage = new RadioButtonPage();
const webTablesPage = new WebTablesPage();
const { faker } = require("@faker-js/faker");

describe("Test1", () => {
  before("Visit app", () => {
    homePage.vistPage();
  });

  it("Should verify entered data", () => {
    homePage.navigateToThePage("Elements", "Text Box");
    textBoxPage.verifyThatSubmitedDataIsDisplayed(
      "marija milosavljevic",
      "milosavljevicmarija19@gmail.com",
      "Krajiska14",
      "Nade Tomic 15/12"
    );
  });
});

describe("Test2", () => {
  before("Visit app", () => {
    homePage.vistPage();
  });

  it("should expand and collapse all", () => {
    homePage.navigateToThePage("Elements", "Check Box");
    checkboxPage.verifyThatUserCanExpandAndCollapseAll();
  });
});

describe("test3", () => {
  before("Visit app", () => {
    homePage.vistPage();
  });
  it("should check all", () => {
    homePage.navigateToThePage("Elements", "Check Box");
    checkboxPage.verifyThatUserCanCheckAll();
  });

  describe("test4", () => {
    before("Visit app", () => {
      homePage.vistPage();
      cy.log(faker.name.findName());
    });
    it("should check radioButton", () => {
      homePage.navigateToThePage("Elements", "Radio Button");
      radioButtonPage.verifyThatUserCanCheckRadioButton1And2();
      radioButtonPage.verifyThatRadioButton3IsDisabled();
    });
  });
});

describe("test5", () => {
  before("Visit app", () => {
    homePage.vistPage();
  });
  it("should check if the data is added to the table", () => {
    const name = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const age = faker.datatype.number(1, 100);
    const salary = faker.datatype.number(10, 1000);
    const departmant = faker.word.adjective(8);
    homePage.navigateToThePage("Elements", "Web Tables");
    webTablesPage.getAddButton().click();
    webTablesPage.fillInAndSubmitRegistrationForm(
      name,
      lastName,
      email,
      age,
      salary,
      departmant
    );
    webTablesPage.verifySubmitedDataInTable(
      name,
      lastName,
      email,
      age,
      salary,
      departmant
    );
  });
});

describe("test6", () => {
  before("Visit app", () => {
    homePage.vistPage();
    homePage.navigateToThePage("Elements", "Web Tables");
  });

  it("should check if the data are deleted from the table", () => {
    const name = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const age = faker.datatype.number(1, 100);
    const salary = faker.datatype.number(10, 1000);
    const departmant = faker.word.adjective(8);
    webTablesPage.getAddButton().click();
    webTablesPage.fillInAndSubmitRegistrationForm(
      name,
      lastName,
      email,
      age,
      salary,
      departmant
    );
    webTablesPage.deleteDataFromTableAndVerify(name);
  });
});

describe("test6", () => {
  before("Visit app", () => {
    homePage.vistPage();
    homePage.navigateToThePage("Elements", "Web Tables");
  });

  it("shoud check edited data", () => {
    const name = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const age = faker.datatype.number(1, 100);
    const salary = faker.datatype.number(10, 1000);
    const departmant = faker.word.adjective(8);
    const changedName = faker.name.firstName();
    const changedLastName = faker.name.lastName();
    const changedEmail = faker.internet.email();
    const changedAge = faker.datatype.number(1, 100);
    const changedSalary = faker.datatype.number(10, 1000);
    const changedDepartmant = faker.word.adjective(8);
    webTablesPage.getAddButton().click();
    webTablesPage.fillInAndSubmitRegistrationForm(
      name,
      lastName,
      email,
      age,
      salary,
      departmant
    );
    webTablesPage.editDataInTable(
      name,
      changedName,
      changedLastName,
      changedEmail,
      changedAge,
      changedSalary,
      changedDepartmant
    );
    webTablesPage.verifySubmitedDataInTable(
      changedName,
      changedLastName,
      changedEmail,
      changedAge,
      changedSalary,
      changedDepartmant
    );
  });
});

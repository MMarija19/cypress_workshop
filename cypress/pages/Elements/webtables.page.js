/// <reference types ="cypress"/>

import WebTablesPageElements from "../../elements/Elements/webtables.page.elements";

export default class WebTablesPage {
  constructor() {
    this.webtablesElements = new WebTablesPageElements();
  }

  getAddButton() {
    return cy.get(this.webtablesElements.addButton);
  }

  getSearchField() {
    return cy.get(this.webtablesElements.searchField);
  }

  getSingleFieldInTable() {
    return cy.get(this.webtablesElements.singleFiledInTable);
  }

  getSubmitButton() {
    return cy.get(this.webtablesElements.submitButton);
  }

  getFirstNameField() {
    return cy.get(this.webtablesElements.firstNameField);
  }

  getLastNameField() {
    return cy.get(this.webtablesElements.lastNameField);
  }

  getEmailField() {
    return cy.get(this.webtablesElements.emailField);
  }

  getAgeField() {
    return cy.get(this.webtablesElements.ageField);
  }

  getSalaryField() {
    return cy.get(this.webtablesElements.salaryField);
  }

  getDepartmentField() {
    return cy.get(this.webtablesElements.departmentField);
  }

  getListOfDataInTheSameRowAsName(name) {
    return this.getSingleFieldInTable().contains(name).siblings();
  }

  getListOfDeleteButtons() {
    return cy.get(this.webtablesElements.deleteButton);
  }

  getListOfEditButtons() {
    return cy.get(this.webtablesElements.editButton);
  }
  fillInAndSubmitRegistrationForm(
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  ) {
    this.getFirstNameField().type(firstName).should("have.value", firstName);
    this.getLastNameField().type(lastName).should("have.value", lastName);
    this.getEmailField().type(email).should("have.value", email);
    this.getAgeField().type(age).should("have.value", age);
    this.getSalaryField().type(salary).should("have.value", salary);
    this.getDepartmentField().type(department).should("have.value", department);
    this.getSubmitButton().click();
  }

  clearAllFieldsInRegistrationForm() {
    this.getFirstNameField().clear();
    this.getLastNameField().clear();
    this.getEmailField().clear();
    this.getAgeField().clear();
    this.getSalaryField().clear();
    this.getDepartmentField().clear();
  }

  verifySubmitedDataInTable(
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  ) {
    this.getListOfDataInTheSameRowAsName(firstName)
      .eq(0)
      .should("have.text", lastName);
    this.getListOfDataInTheSameRowAsName(firstName)
      .eq(1)
      .should("have.text", age);
    this.getListOfDataInTheSameRowAsName(firstName)
      .eq(2)
      .should("have.text", email);
    this.getListOfDataInTheSameRowAsName(firstName)
      .eq(3)
      .should("have.text", salary);
    this.getListOfDataInTheSameRowAsName(firstName)
      .eq(4)
      .should("have.text", department);
  }

  deleteDataFromTableAndVerify(firstName) {
    this.getSingleFieldInTable()
      .contains(firstName)
      .parent()
      .within(() => {
        this.getListOfDeleteButtons().click();
      });
    this.getSingleFieldInTable().contains(firstName).should("not.exist");
  }

  editDataInTable(
    firstName,
    changedName,
    changedLastName,
    changedEmail,
    changedAge,
    changedSalary,
    changedDepartment
  ) {
    this.getSingleFieldInTable()
      .contains(firstName)
      .parent()
      .within(() => {
        this.getListOfEditButtons().click();
      });
    this.clearAllFieldsInRegistrationForm();
    this.fillInAndSubmitRegistrationForm(
      changedName,
      changedLastName,
      changedEmail,
      changedAge,
      changedSalary,
      changedDepartment
    );
    this.getSingleFieldInTable().contains(firstName).should("not.exist");
  }
}

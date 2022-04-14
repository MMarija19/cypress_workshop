/// <reference types = "cypress"/>
import TextBoxPageElements from "../../elements/Elements/textbox.page.elements";
export default class TextBoxPage {
  constructor() {
    this.textBoxPageElements = new TextBoxPageElements();
  }

  getFullNameField() {
    return cy.get(this.textBoxPageElements.fullNameField);
  }

  getEmailField() {
    return cy.get(this.textBoxPageElements.emailField);
  }

  getCurrentAddresField() {
    return cy.get(this.textBoxPageElements.currentAddressField);
  }

  getPermanentAddresField() {
    return cy.get(this.textBoxPageElements.permanentAddressField);
  }

  getSubmitButton() {
    return cy.get(this.textBoxPageElements.submitButton);
  }

  getResultName() {
    return cy.get(this.textBoxPageElements.resultName);
  }

  getResultEmail() {
    return cy.get(this.textBoxPageElements.resultEmail);
  }

  getResultCurrentAddress() {
    return cy.get(this.textBoxPageElements.resultCurrentAdress);
  }

  getResultPermanentAddress() {
    return cy.get(this.textBoxPageElements.resultPermanentAddres);
  }

  enterName(name) {
    this.getFullNameField().type(name).should("have.value", name);
  }

  enterEmail(email) {
    this.getEmailField().type(email).should("have.value", email);
  }

  enterCurrentAddress(currentAddres) {
    this.getCurrentAddresField()
      .type(currentAddres)
      .should("have.value", currentAddres);
  }

  enterPermanentAddress(permanentAddress) {
    this.getPermanentAddresField()
      .type(permanentAddress)
      .should("have.value", permanentAddress);
  }

  submitData() {
    this.getSubmitButton().click();
  }

  enterAllDataAndSubmit(name, email, currentAddres, permanentAddres) {
    this.enterName(name);
    this.enterEmail(email);
    this.enterCurrentAddress(currentAddres);
    this.enterPermanentAddress(permanentAddres);
    this.submitData();
  }

  verifyThatSubmitedDataIsDisplayed(
    name,
    email,
    currentAddres,
    permanentAddres
  ) {
    this.enterAllDataAndSubmit(name, email, currentAddres, permanentAddres);
    this.getResultName().should("contain", name);
    this.getResultEmail().should("contain", email);
    this.getResultCurrentAddress().should("contain", currentAddres);
    this.getResultPermanentAddress().should("contain", permanentAddres);
  }
}

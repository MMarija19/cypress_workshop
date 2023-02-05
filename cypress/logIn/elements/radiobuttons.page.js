/// <reference types ="cypress"/>

import RadioButtonPageElements from "../../elements/Elements/radiobutton.page.elements";

export default class RadioButtonPage {
  constructor() {
    this.radioButtonElements = new RadioButtonPageElements();
  }

  getRadioButton1() {
    return cy.get(this.radioButtonElements.radioButton1);
  }

  getRadioButton1Text() {
    return cy.get(this.radioButtonElements.radioButton1Text);
  }

  getRadioButton2() {
    return cy.get(this.radioButtonElements.radioButton2);
  }

  getRadioButton2Text() {
    return cy.get(this.radioButtonElements.radioButton2Text);
  }

  getRadioButton3() {
    return cy.get(this.radioButtonElements.radioButton3);
  }

  getNameOfSelectedButton() {
    return cy.get(this.radioButtonElements.selectedButtonResult);
  }

  verifyThatUserCanCheckRadioButton1And2() {
    this.getRadioButton1().click({ force: true }).should("be.checked");
    this.getRadioButton1Text().then((radioButton) => {
      this.getNameOfSelectedButton().should("have.text", radioButton.text());
    });
    this.getRadioButton2().click({ force: true }).should("be.checked");
    this.getRadioButton2Text().then((radioButton) => {
      this.getNameOfSelectedButton().should("have.text", radioButton.text());
    });
  }

  verifyThatRadioButton3IsDisabled() {
    this.getRadioButton3().should("be.disabled");
  }
}

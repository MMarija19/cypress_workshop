/// <reference types= "cypress"/>

import PracticeFormPageElements from "../../elements/PracticeForms/practiceform.page.elements";
var moment = require("moment");
export default class PracticeFormPage {
  constructor() {
    this.practiceFormPage = new PracticeFormPageElements();
  }

  getFirtsNameField() {
    return cy.get(this.practiceFormPage.firstNameField);
  }

  getLastNameField() {
    return cy.get(this.practiceFormPage.LastNameField);
  }

  getEmailField() {
    return cy.get(this.practiceFormPage.emailField);
  }

  getGenderRadioButton() {
    return cy.get(this.practiceFormPage.genderRadioButton);
  }

  getMobileField() {
    return cy.get(this.practiceFormPage.mobileField);
  }

  getDateOfBirdField() {
    return cy.get(this.practiceFormPage.dateOfBirthField);
  }

  getMonthDropdown() {
    return cy.get(this.practiceFormPage.monthDropdown);
  }

  getYearDropdown() {
    return cy.get(this.practiceFormPage.yearDropdown);
  }

  getSubjectsField() {
    return cy.get(this.practiceFormPage.subjectsField);
  }

  getSubjectOptions() {
    return cy.get(this.practiceFormPage.subjectOptions);
  }

  getSelectedSubjects() {
    return cy.get(this.practiceFormPage.selectedSubjects);
  }

  getHobbiesCheckBox() {
    return cy.get(this.practiceFormPage.hobbiesCheckBox);
  }

  getChooseFileButton() {
    return cy.get(this.practiceFormPage.chooseFileButton);
  }

  getCurrentAddressField() {
    return cy.get(this.practiceFormPage.currentAdressField);
  }

  getSelectedState() {
    return cy.get(this.practiceFormPage.selectedState);
  }

  getStateDropdownArrow() {
    return cy.get(this.practiceFormPage.stateDropdownArrow);
  }

  getStateOptions() {
    return cy.get(this.practiceFormPage.stateOptions);
  }

  getSelectedCity() {
    return cy.get(this.practiceFormPage.selectedCity);
  }

  getCityOptions() {
    return cy.get(this.practiceFormPage.cityOptions);
  }

  getCityDropdownArrow() {
    return cy.get(this.practiceFormPage.cityDropdownArrow);
  }

  getSubmitButton() {
    return cy.get(this.practiceFormPage.submitButton);
  }

  getSingleFieldInTable() {
    return cy.get(this.practiceFormPage.singleFieldInTable);
  }

  // date of birth should be in format dd/mm/yyyy
  selectDateOfBirth(dateOfBirth) {
    const month = moment()
      .month(dateOfBirth.split("/")[1] - 1)
      .format("MMMM");
    const day = dateOfBirth.split("/")[0];
    const year = dateOfBirth.split("/")[2];
    cy.wrap(`${moment().dayOfYear(day).format("DD")} ${month},${year}`).as(
      "dateOfBirth"
    );
    this.getDateOfBirdField().click();
    this.getMonthDropdown().click();
    cy.get(".react-datepicker__month-select").select(month);
    this.getYearDropdown().click();
    cy.get(".react-datepicker__year-select").select(year);
    let shouldStop = false;
    cy.get(".react-datepicker__day.react-datepicker__day").each((element) => {
      cy.then(() => {
        if (shouldStop) {
          return;
        }
        cy.wrap(element)
          .invoke("attr", "aria-label")
          .then((atribut) => {
            if (atribut.includes(`${month} ${day}`)) {
              cy.wrap(element).click();
              shouldStop = true;
            }
          });
      });
    });
  }

  checkRandomGender() {
    this.getGenderRadioButton()
      .its("length")
      .then((length) => {
        const random = this.getRandomInt(length - 1);
        this.getGenderRadioButton().eq(random).check({ force: true });
        this.getGenderRadioButton().eq(random).should("be.checked");
        this.getGenderRadioButton()
          .eq(random)
          .siblings()
          .then((element) => {
            cy.wrap(element.text()).as("Gender");
          });
      });
  }
  checkRandomHobby() {
    this.getHobbiesCheckBox()
      .its("length")
      .then((length) => {
        const random = this.getRandomInt(length - 1);
        this.getHobbiesCheckBox().eq(random).check({ force: true });
        this.getHobbiesCheckBox().eq(random).should("be.checked");
        this.getHobbiesCheckBox()
          .eq(random)
          .siblings()
          .then((element) => {
            cy.wrap(element.text()).as("Hobby");
          });
      });
  }

  chooseState() {
    this.getStateDropdownArrow().click({ force: true });
    this.getStateOptions()
      .its("length")
      .then((length) => {
        const random = this.getRandomInt(length - 1);
        this.getStateOptions()
          .eq(random)
          .then((element) => {
            let state = element.text();
            this.getStateOptions().eq(random).click({ force: true });
            this.getSelectedState().should("have.text", state);
            cy.wrap(state).as("state");
          });
      });
  }

  chooseCity() {
    this.getCityDropdownArrow().click({ force: true });
    this.getCityOptions()
      .its("length")
      .then((length) => {
        const random = this.getRandomInt(length - 1);
        this.getCityOptions()
          .eq(random)
          .then((element) => {
            let city = element.text();
            this.getCityOptions().eq(random).click({ force: true });
            this.getSelectedCity().should("have.text", city);
            cy.wrap(city).as("city");
          });
      });
  }

  chooseSubject() {
    this.getSubjectsField().type("a");
    this.getSubjectOptions()
      .its("length")
      .then((length) => {
        const random = this.getRandomInt(length - 1);
        this.getSubjectOptions()
          .eq(random)
          .then((element) => {
            this.getSubjectOptions().eq(random).click({ force: true });
            const subject = element.text();
            this.getSelectedSubjects().eq(0).should("have.text", subject);
            cy.wrap(subject).as("subject");
          });
      });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  uploadPicture(imagePath) {
    this.getChooseFileButton().selectFile(imagePath);
  }

  verifyRegistrationFormTable(
    firstName,
    lastName,
    email,
    mobile,
    dateOfBirth,
    currentAddress,
    imagePath
  ) {
    this.getSingleFieldInTable()
      .contains("Student Name")
      .siblings()
      .should("have.text", `${firstName} ${lastName}`);
    this.getSingleFieldInTable()
      .contains("Student Email")
      .siblings()
      .should("have.text", email);
    cy.get("@Gender").then((gender) => {
      this.getSingleFieldInTable()
        .contains("Gender")
        .siblings()
        .should("have.text", gender);
    });
    this.getSingleFieldInTable()
      .contains("Mobile")
      .siblings()
      .should("have.text", mobile);
    cy.get("@dateOfBirth").then((dateOfBirth) => {
      this.getSingleFieldInTable()
        .contains("Date of Birth")
        .siblings()
        .should("have.text", dateOfBirth);
    });
    cy.get("@subject").then((subject) => {
      this.getSingleFieldInTable()
        .contains("Subjects")
        .siblings()
        .should("have.text", subject);
    });
    cy.get("@Hobby").then((hobby) => {
      this.getSingleFieldInTable()
        .contains("Hobbies")
        .siblings()
        .should("have.text", hobby);
    });
    this.getSingleFieldInTable()
      .contains("Picture")
      .siblings()
      .should(
        "have.text",
        imagePath.split("/")[imagePath.split("/").length - 1]
      );
    this.getSingleFieldInTable()
      .contains("Addres")
      .siblings()
      .should("have.text", currentAddress);
    cy.get("@state").then((state) => {
      cy.get("@city").then((city) => {
        this.getSingleFieldInTable()
          .contains("State and City")
          .siblings()
          .should("have.text", `${state} ${city}`);
      });
    });
  }

  fillInRegistrationForm(
    firstName,
    lastName,
    email,
    mobile,
    dateOfBirth,
    currentAddress,
    imagePath
  ) {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    this.getFirtsNameField().type(firstName).should("have.value", firstName);
    this.getLastNameField().type(lastName).should("have.value", lastName);
    this.getEmailField().type(email).should("have.value", email);
    this.checkRandomGender();
    this.getMobileField().type(mobile).should("have.value", mobile);
    this.getCurrentAddressField()
      .type(currentAddress)
      .should("have.value", currentAddress);
    this.selectDateOfBirth(dateOfBirth);
    this.checkRandomHobby();
    this.chooseState();
    this.chooseCity();
    this.chooseSubject();
    this.uploadPicture(imagePath);
    this.getSubmitButton().click({ force: true });
  }
}

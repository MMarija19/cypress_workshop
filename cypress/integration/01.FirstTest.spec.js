/// <reference types ="cypress"/>

describe("Test1", () => {
  before("Visit app", () => {
    cy.visit("");
  });
  it("Should check labels in text box", () => {
    cy.get("h5").contains("Elements").click();
    cy.url().should("contain", "elements");
    cy.get("ul.menu-list").contains("Text Box").click();
    cy.url().should("contain", "text-box");
    cy.get("#userName-label").should("be.visible");
    cy.get("#userEmail-label").should("be.visible");
    cy.get("#currentAddress-label").should("be.visible");
    cy.get("#permanentAddress-label").should("be.visible");
  });
});

describe("Test2", () => {
  before("Visit app", () => {
    cy.visit("");
  });

  it("Should check the visibility of entered values after subimitting the form", () => {
    const FULL_NAME = "Full Name";
    const EMAIL = "fullname@hchc.ccc";
    const CURRENT_ADRESS = "Current Address";
    const PERMANENT_ADRESS = "Permanent Address";
    cy.get("h5").contains("Elements").click();
    cy.url().should("contain", "elements");
    cy.get("ul.menu-list").contains("Text Box").click();
    cy.url().should("contain", "text-box");
    cy.get("#userName")
      .type(`${FULL_NAME}`)
      .should("have.value", `${FULL_NAME}`);
    cy.get("#userEmail").type(`${EMAIL}`).should("have.value", `${EMAIL}`);
    cy.get("#currentAddress")
      .type(`${CURRENT_ADRESS}`)
      .should("have.value", `${CURRENT_ADRESS}`);
    cy.get("#permanentAddress")
      .type(`${PERMANENT_ADRESS}`)
      .should("have.value", `${PERMANENT_ADRESS}`);
    cy.get("#submit").click();
    cy.get("#name").should("have.text", `Name:${FULL_NAME}`);
    cy.get("#email").should("have.text", `Email:${EMAIL}`);
    cy.get("p#currentAddress").should(
      "have.text",
      `Current Address :${CURRENT_ADRESS} `
    );
    cy.get("p#permanentAddress").should(
      "have.text",
      `Permanent Address :${PERMANENT_ADRESS}`
    );
  });
});

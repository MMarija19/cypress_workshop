/// <reference types = "cypress"/>
import HomePageElements from "../elements/home.page.elements";

export default class HomePage {
  constructor() {
    this.homePageElements = new HomePageElements();
  }

  vistPage() {
    cy.visit("");
  }
  getCategoryCardsList() {
    return cy.get(this.homePageElements.categoryCards);
  }

  chooseCategoryCard(category) {
    this.getCategoryCardsList().contains(category).click();
  }

  getMenuOptionsList() {
    return cy.get(this.homePageElements.menuOptionsList);
  }

  chooseMenuOptions(text) {
    this.getMenuOptionsList().contains(text).click();
  }

  getSubMenuOptionsList() {
    return cy.get(this.homePageElements.subMenuOptionsList);
  }

  chooseSubMenuOption(text) {
    this.getSubMenuOptionsList().contains(text).click();
  }

  navigateToThePage(category, subcategory) {
    this.getCategoryCardsList();
    this.chooseCategoryCard(category);
    this.chooseSubMenuOption(subcategory);
  }
}

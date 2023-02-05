/// <reference types ="cypress"/>

import CheckBoxPageElements from "../../elements/Elements/checkbox.page.elements";

export default class CheckboxPage {
  constructor() {
    this.checkboxElements = new CheckBoxPageElements();
  }

  getCheckBoxList() {
    return cy.get(this.checkboxElements.checkbox);
  }

  getExpandAllButton() {
    return cy.get(this.checkboxElements.expandAllButton);
  }

  getCollapseAllButton() {
    return cy.get(this.checkboxElements.collapseAllButton);
  }

  getExpandCollaspeArrowList() {
    return cy.get(this.checkboxElements.expandCollapseArrow);
  }

  getListOfDisplayedFolderOrFileNames() {
    return cy.get(this.checkboxElements.folderOrFileName);
  }

  getResultOfCheckedFoldersAndFiles() {
    return cy.get(this.checkboxElements.result);
  }

  getListOfDisplayedFolders() {
    return cy.get(this.checkboxElements.folderIcon);
  }

  getListOfDisplayedFiles() {
    return cy
      .get(this.checkboxElements.fileIcon)
      .siblings(this.checkboxElements.folderOrFileName);
  }

  expandAll() {
    this.getExpandAllButton().click();
  }

  collapseAll() {
    this.getCollapseAllButton().click();
  }

  verifyThatUserCanExpandAndCollapseAll() {
    this.expandAll();
    this.getListOfDisplayedFolderOrFileNames()
      .last()
      .should("have.text", "Excel File.doc");
    this.collapseAll();
    this.getListOfDisplayedFolderOrFileNames().should("have.length", 1);
  }

  verifyThatUserCanCheckAll() {
    this.expandAll();
    this.getListOfDisplayedFolderOrFileNames()
      .last()
      .should("have.text", "Excel File.doc");
    this.getCheckBoxList().first().check({ force: true });
    this.getResultOfCheckedFoldersAndFiles().then((list) => {
      this.getListOfDisplayedFolderOrFileNames().each((element) => {
        cy.log(element.text());
        expect(list.text()).contain(
          element.text().charAt(0).toLowerCase() +
            element.text().substring(1, element.text().length)
        );
      });
    });
  }
}

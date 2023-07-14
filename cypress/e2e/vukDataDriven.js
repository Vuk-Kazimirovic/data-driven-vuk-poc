/// <reference types="cypress" />

import * as data from "../fixtures/vukForm.json";

describe("vukovi testovi", () => {
    data.postiveCases.forEach((test) => {
    it(test.case, () => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
        });
      cy.visit('https://demoqa.com/automation-practice-form',
      { failonStatusCode: false});
      cy.get('[id="firstName"]').type(test.payload.firstName);
      cy.get('[id="lastName"]').type(test.payload.lastName);
      cy.get('[id="userEmail"]').clear().type(test.payload.email);
      cy.contains(test.payload.gender).click();
      cy.get('[id="userNumber"]').type(test.payload.mobilePhone);
      cy.contains(test.payload.subjects).click();
      cy.get('[id="currentAddress"]').type(test.payload.address);
      cy.get('[id="submit"]').click({force: true});
      cy.contains(test.successMsg.text).should('be.visible');
        });
    });
    data.negativeCases.forEach((test) => {
    it(test.case, () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
          return false;
          });
        cy.visit('https://demoqa.com/automation-practice-form',
        { failonStatusCode: false});
        cy.get('[id="firstName"]').type(test.payload.firstName);
        cy.get('[id="lastName"]').type(test.payload.lastName);
        cy.get('[id="userEmail"]').clear().type(test.payload.email);
        cy.contains(test.payload.gender).click();
        cy.get('[id="userNumber"]').type(test.payload.mobilePhone);
        cy.contains(test.payload.subjects).click();
        cy.get('[id="currentAddress"]').type(test.payload.address);
        cy.get('[id="submit"]').click({force: true}); 
        
        cy.get('[id="firstName"]').then((firstNameField) => { 
            if(firstNameField.text().includes('First Name')) {
        cy.get('[id="firstName"]').should('have.css', 'border', test.errorDisplayed.redBorder);
            }
         });

        cy.get('[id="lastName"]').then((lastNameField) => { 
            if(lastNameField.text().includes('Last Name')) {
        cy.get('[id="lastName"]').should('have.css', 'border', test.errorDisplayed.redBorder);
            }
         });

         cy.get('[id="userNumber"]').then((userNumberField) => { 
            if(userNumberField.text().includes('Mobile Number')) {
        cy.get('[id="userNumber"]').should('have.css', 'border', test.errorDisplayed.redBorder);
            }
         }); 
         cy.contains(test.successMsg.text).should('not.exist');
       });
    });




});
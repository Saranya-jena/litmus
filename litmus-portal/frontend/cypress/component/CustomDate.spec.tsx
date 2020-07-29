/// <reference types="Cypress" />
import { mount } from 'cypress-react-unit-test';
import React from 'react';
import CustomDate from '../../src/components/DateTime/CustomDate';

describe('Date pickers', () => {
  it('picks a day', () => {
    mount(<CustomDate disabled={false} />);

    cy.viewport(500, 600);
    cy.log('**type date**');
    cy.get('input#date-picker-inline').clear().type('31 13 1999');

    cy.contains('#date-picker-inline-helper-text', 'Invalid Date');

    // use calendar widget
    cy.get('[aria-label="change date"]').first().click();
    cy.contains('Su').should('be.visible');

    cy.get('button.MuiPickersCalendarHeader-iconButton').eq(1).click();

    cy.contains('Su').should('be.visible');

    cy.log('**close the date picker**');
    cy.get('body').click('topLeft');
    cy.contains('January 2000').should('not.exist');
  });
});

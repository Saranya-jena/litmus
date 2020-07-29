/// <reference types="Cypress" />
import { mount } from 'cypress-react-unit-test';
import React from 'react';
import CustomTime from '../../src/components/DateTime/CustomTime';

describe('Date pickers', () => {
  it('picks time', () => {
    mount(<CustomTime disabled={false} ampm={true} />);

    cy.log('**check time**');
    cy.get('[aria-label="change-time"]').first().click();
    cy.get('.MuiPickersClock-clock').should('be.visible').wait(500);

    cy.get('body').click();
    cy.get('.MuiPickersClock-clock').should('not.exist');
  });
});

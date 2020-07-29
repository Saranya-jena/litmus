import React from 'react';

import CustomText from '../../src/components/CustomText';
import { mount } from 'cypress-react-unit-test';
const width = 299;
describe('Editable Text Field', () => {
  it('picks time', () => {
    mount(<CustomText value="hi" id="test" width={width} />);
    cy.log('**type text**');
    cy.get('.MuiSvgIcon-root').click().log('editing enabled');
    cy.get('[data-cy=text]').click().type('Hello world');
    cy.get('#test').should('have.value', 'hiHello world').log('succesful');
  });
});

describe('form inputs', () => {
  it('can navigate to the site', () => {
    cy.visit('http://localhost:3000/');
    cy.url().should('include', 'localhost');
  });

  it('can navigate to the pizza form', () => {
    cy.visit('http://localhost:3000/pizza-builder');
    cy.url().should('include', 'pizza');
  });

//   it('button is disabled', () => {
//     cy.get('button').should('be.disabled');
//   });

  it('can type a name', () => {
    // cy.visit('http://localhost:3000/pizza-builder');
    cy.get('.name-input > label > input')
      .type('Nic')
      .should('have.value', 'Nic');
  });

//   it('can choose a size', () => {
//     cy.get('select').select('small');
//   });

  it('can select multiple toppings', () => {
    cy.get(':nth-child(1) > :nth-child(1) > input').check();
    cy.get(':nth-child(1) > :nth-child(4) > input').check();
    cy.get('.toppings > :nth-child(2) > :nth-child(1) > input').check();
  });

//   it('can add special instructions', () => {
//     cy.get('.instructions > label > input')
//       .type('Ring the doorbell')
//       .should('have.value', 'Ring the doorbell');
//   });

  it('can submit the form', () => {
    cy.get('button').click();
  });
});
describe('form inputs', () => {
  it('can navigate to the site', () => {
    cy.visit('http://localhost:3000/');
    cy.url().should('include', 'localhost');
  });

  it('can navigate to the pizza form', () => {
    cy.visit('http://localhost:3000/pizza');
    cy.url().should('include', 'pizza');
  });

  it('can type a name', () => {
    cy.get('.name-input > label > input')
      .type('Nic')
      .should('have.value', 'Nic');
  });

  it('can select multiple toppings', () => {
    cy.get(':nth-child(1) > :nth-child(1) > input').check();
    cy.get(':nth-child(1) > :nth-child(4) > input').check();
  });

  it('can submit the form', () => {
    cy.get('button').click({force:true});
  });
});
describe('Navigation', () => {
  it('should visit root', () => {
    cy.visit('/');
  });

  it('should navigate to Tuesday', () => {
    // Find the list item that contains text = "Tuesday", click it, and check for the expected background colour
    cy.visit('/').contains("[data-testid=day]", 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected');
  });
});

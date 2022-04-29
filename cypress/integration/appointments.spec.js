describe('Appointments', () => {
  beforeEach(() => {
    // Reset API server
    cy.request('GET', '/api/debug/reset');

    // Visit homepage, make sure it contains a list element with the text "Monday"
    cy.visit('/').contains('li', 'Monday');

    // Verify there is one interview
    cy.get('.appointment__card--show').should('have.length', 1);
  });

  it('should book an interview', () => {
    // Click on the first image that has alt text "Add"
    cy.get('img[alt="Add"]').first().click();

    // Enter student name
    cy.get('input[data-testid=student-name-input]').type('Lydia Miller-Jones');

    // Select an interviewer
    cy.get('ul.interviewers__list > li:has(img[alt="Sylvia Palmer"])').click();

    // Save the interview
    cy.get('button.button--confirm').contains(/save/i).click();

    // Verify the existence of an appointment card with the student and interviewer names
    cy.contains(
      '.appointment__card--show',
      'Lydia Miller-Jones',
      'Sylvia Palmer'
    );
  });

  it('should edit an interview', () => {
    // The edit button is not visible by default
    cy.get('img[alt="Edit"]').should('be.not.visible');

    // Click edit button
    cy.get('img[alt="Edit"]').click({ force: true });

    // Select different interviewer
    cy.get('ul.interviewers__list > li:has(img[alt="Tori Malcolm"])').click();

    // Clear student name input field
    cy.get('input[data-testid=student-name-input]').clear().type('Hugh Jasz');

    // Save the updated interview
    cy.get('button.button--confirm').contains(/save/i).click();

    cy.contains('.appointment__card--show', 'Tori Malcolm', 'Hugh Jasz');
  });

  it('should cancel an interview', () => {
    // Click delete button
    cy.get('[alt="Delete"]').click({ force: true });

    // Click confirm button
    cy.contains(/confirm/i).click();

    // Check for one instance of "Deleting" process indicator which then disappears
    cy.contains(/deleting/i).should('exist');
    cy.contains(/deleting/i).should('not.exist');

    // Verify that the interview was deleted
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});

describe('List of blog posts', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.url().should('eq', `http://localhost:4300/blog`);
  });

  it('shows the list of blog posts', () => {
    cy.get('app-blog-card').each((blogCard) => {
      cy.wrap(blogCard).should('exist');
    });
  });

  it('should have copyright in footer', () => {
    cy.contains(
      `BrunoElo ${new Date().getFullYear()}. All rights reserved`
    ).should('exist');
  });
});

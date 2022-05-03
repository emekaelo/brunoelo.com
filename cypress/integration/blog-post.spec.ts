describe('List of blog posts', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.url().should('eq', `http://localhost:4200/blog`);
  });

  it('should navigate to a blog post', () => {
    cy.get('.blog__link').first().as('blogPost');

    cy.get('@blogPost')
      .should('have.attr', 'href')
      .then((href) => {
        cy.get('@blogPost').click();
        cy.url().should('eq', `http://localhost:4200${href}`);

        cy.get('.blog-category__list').should('exist');
        cy.get('.article__date').should('exist');
        cy.get('.article__title').should('exist');
        cy.get('.article__subtitle').should('exist');
      });
  });

  it('should have a filled read progress bar', () => {
    cy.wait(2000); // needed to wait for scully content
    cy.scrollTo('bottom');
    cy.get('.read-progress-bar')
      .should('have.attr', 'style')
      .and('include', 'width: 100%');
  });

  it('should navigate to blog list page from blog post', () => {
    cy.get('.blog__header').contains('Blog').click();
    cy.url().should('eq', 'http://localhost:4200/blog');
  });
});

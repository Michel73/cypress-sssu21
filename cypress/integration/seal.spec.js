describe('seal homepage', () => {
  before(() => {
    cy.visit('https://www.sealsystems.de');
    Cypress.Cookies.defaults({
      preserve: 'borlabs-cookie'
    });
  });

  after(() => {
    Cypress.Cookies.defaults({
      preserve: ''
    });
    cy.clearCookies();
  });

  it('should load seal homepage', () => {
    cy.url().should('contain', 'sealsystems.de');
  });

  describe('Cookie Dialog', () => {
    it('should exist', () => {
      cy.get('#CookieBoxTextHeadline').should('exist');
    });

    it('language should not be selectable', { defaultCommandTimeout: 500 }, () => {
      cy.get('.nav-languages > :nth-child(1) > .menu-item-has-children > [href="https://www.sealsystems.de/"] > img').trigger('mouseover');
      cy.once('fail', (err) => {
        expect(err.message).to.include('is being covered by another element:');
      })
    });

    it('should disappear after save', () => {
      cy.get('#CookieBoxSaveButton').click();
    });
  });

  describe('search', () => {
    it('should show some result', () => {
      cy.get('.header-inner > .shell > .search-form > label > #s').type('COM').type('{enter}');
      cy.get(':nth-child(1) > .article-head > .article-title').should('contain', '"COM"');
    });
  });
});
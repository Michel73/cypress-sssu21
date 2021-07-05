import CookieDialog from '../support/page-objects/CookieDialog';
import SealContentPage from '../support/page-objects/SealContentPage';
import SealHeaderPage from '../support/page-objects/SealHeaderPage';

describe('seal homepage', () => {
  const cookieDialog = new CookieDialog();
  const sealHeaderPage = new SealHeaderPage();
  const sealContentPage = new SealContentPage();

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
      cy.get(cookieDialog.cookieBoxHeadline).should('exist');
    });

    it('language should not be selectable', { defaultCommandTimeout: 500 }, () => {
      cy.get(sealHeaderPage.languageSelection).trigger('mouseover');
      cy.once('fail', (err) => {
        expect(err.message).to.include('is being covered by another element:');
      })
    });

    it('should disappear after save', () => {
      cy.get(cookieDialog.saveButton).click();
    });
  });

  describe('search', () => {
    it('should show some result', () => {
      cy.get(sealHeaderPage.searchField).type('COM').type('{enter}');
      cy.get(sealContentPage.searchResultHeadline).should('contain', '"COM"');
    });
  });
});
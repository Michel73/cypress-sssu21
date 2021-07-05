class SealHeaderPage {
  get languageSelection() {
    return '.nav-languages > :nth-child(1) > .menu-item-has-children > [href="https://www.sealsystems.de/"] > img';
  }

  get searchField() {
    return '.header-inner > .shell > .search-form > label > #s';
  }
}

export default SealHeaderPage;

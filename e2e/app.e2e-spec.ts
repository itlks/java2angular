import { JsfToAngularPage } from './app.po';

describe('jsf-to-angular App', () => {
  let page: JsfToAngularPage;

  beforeEach(() => {
    page = new JsfToAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

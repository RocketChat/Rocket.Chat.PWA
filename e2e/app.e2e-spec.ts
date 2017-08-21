import { RocketchatPwaPage } from './app.po';

describe('rocketchat-pwa App', () => {
  let page: RocketchatPwaPage;

  beforeEach(() => {
    page = new RocketchatPwaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

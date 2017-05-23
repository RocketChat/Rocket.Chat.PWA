import { RocketChatPage } from './app.po';

describe('rocket-chat App', () => {
  let page: RocketChatPage;

  beforeEach(() => {
    page = new RocketChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { ProjectpokemonPage } from './app.po';

describe('projectpokemon App', function() {
  let page: ProjectpokemonPage;

  beforeEach(() => {
    page = new ProjectpokemonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

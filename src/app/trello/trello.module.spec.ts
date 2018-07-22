import { TrelloModule } from './trello.module';

describe('TrelloModule', () => {
  let trelloModule: TrelloModule;

  beforeEach(() => {
    trelloModule = new TrelloModule();
  });

  it('should create an instance', () => {
    expect(trelloModule).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApiPokemonService } from './api-pokemon.service';

describe('ApiPokemonService', () => {
  let service: ApiPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { expect } from 'chai';
import { TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent (unit)', () => {
  beforeEach(() => {
    // No TestBed used here; test the search emitter directly
  });

  it('debe emitir searchChange cuando se ejecuta onSearch', (done) => {
    const comp = new SearchBarComponent();

    comp.searchChange.subscribe((value: string) => {
      expect(value).to.equal('hola');
      done();
    });

    comp.onSearch('hola');
  });
});

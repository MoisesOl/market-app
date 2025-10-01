import { expect } from 'chai';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { InstrumentService } from './services/instrument.service';

describe('AppComponent', () => {
  it('should create the app (instancia manual con stub)', async () => {
    const stubService = {
      getInstrumentList: () => [],
      initDefaultInstrument: async () => {}
    } as any;

    const app = new AppComponent(stubService);
    expect(app).to.exist;
  });

  it('should call onSearchChange safely', () => {
    const stubService = {
      getInstrumentList: () => [],
      initDefaultInstrument: async () => {}
    } as any;

    const app = new AppComponent(stubService);
    // Llamar método que delega a instrumentListRef (vacío por prueba)
    app.onSearchChange('x');
    expect(app.selectedIndex).to.exist;
  });
});

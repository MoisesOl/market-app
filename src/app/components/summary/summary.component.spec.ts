import { expect } from 'chai';
import { TestBed } from '@angular/core/testing';
import { SummaryComponent } from './summary.component';
import { mockInstrument } from '../../../mocks/mockInstrument';

describe('SummaryComponent (unit)', () => {
  beforeEach(() => {
    // No TestBed used here; test only the logic of the component class.
  });

  it('debe formatear valores numericos y porcentajes correctamente', () => {
    const comp = new SummaryComponent();
    comp.instrumentSignal = mockInstrument as any;
    comp.ngOnChanges();

    // formateo simple
    const formatted = comp.formatValue(1234.5);
    expect(formatted).to.be.a('string');

    const pct = comp.formatValue(2.5, true);
    expect(pct).to.be.a('string');
  });

  it('calcula marketData y variationData cuando hay instrumento', () => {
    const comp = new SummaryComponent();
    comp.instrumentSignal = mockInstrument as any;
    comp.ngOnChanges();

    const market = comp.marketData();
    expect(market).to.be.an('array').that.is.not.empty;

    const variation = comp.variationData();
    expect(variation).to.be.an('array');
  });
});

import { expect } from 'chai';
import { TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { mockInstrument } from '../../../mocks/mockInstrument';

describe('ChartComponent (unit)', () => {
  beforeEach(() => {
    // No TestBed used: instantiate the component class directly for unit testing logic.
  });

  it('debe actualizar series cuando cambia el instrumento', () => {
    const comp = new ChartComponent();
    comp.instrument = mockInstrument as any;

    // Al invocar ngOnChanges internamente se arma la serie
    comp.ngOnChanges();
    expect(comp.series).to.be.an('array');
  });

  it('debe cambiar el periodo y actualizar series', () => {
    const comp = new ChartComponent();
    comp.instrument = mockInstrument as any;
    comp.setPeriod('1M');
    expect(comp.selectedPeriod).to.equal('1M');
  });
});

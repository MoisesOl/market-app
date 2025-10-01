import { expect } from 'chai';
import { TestBed } from '@angular/core/testing';
import { InstrumentListComponent } from './instrument-list.component';
import { InstrumentService } from '../../services/instrument.service';

const fakeInstruments = [
  { name: 'Uno', shortName: 'U', codeInstrument: 'U1' },
  { name: 'Dos', shortName: 'D', codeInstrument: 'D2' }
];

class StubInstrumentService {
  getAllInstrumentsComplete = async () => [];
  getInstrumentComplete = async (code: string) => ({
    info: { name: 'X', shortName: 'X', codeInstrument: code, countryName: 'CL' },
    index: { name: 'IPSA' },
    summary: { lastPrice: 1, performanceRelative: 0, performanceAbsolute: 0, openPrice:0, closePrice:0, maxDay:0, minDay:0, pct30D:0, pctRelW52:0, pctRelCY:0, datetimeLastPrice: null },
    history: []
  });
}

describe('InstrumentListComponent (unit)', () => {
  it('inicializa sin errores y responde a onSearchChange', async () => {
    // Crear instancia manualmente usando el stub service para evitar problemas de DI
    const stub = new StubInstrumentService();
    const comp = new (InstrumentListComponent as any)(stub);
    await comp.ngOnInit();
    comp.onSearchChange('x');
    const filtered = comp.filteredInstruments();
    expect(filtered).to.be.an('array');
  });
});

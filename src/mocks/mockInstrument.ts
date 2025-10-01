import { Instrument } from '../app/services/instrument.service';

export const mockInstrument: Instrument = {
  info: {
    name: 'Instrumento de prueba',
    shortName: 'ABC',
    codeInstrument: 'ABC123',
    countryName: 'Chile',
    marketName: 'IPSA',
  },
  index: { name: 'IPSA' },
  summary: {
    lastPrice: 123.45,
    performanceRelative: 0.5,
    performanceAbsolute: -0.78,
    openPrice: 124.00,
    closePrice: 123.45,
    maxDay: 125.00,
    minDay: 122.50,
    pct30D: 2.5,
    pctRelW52: 15.0,
    pctRelCY: 10.0,
    datetimeLastPrice: '2025-09-30T16:00:00Z'
  },
  history: [
    { datetimeLastPrice: '2025-09-28T16:00:00Z', datetimeLastPriceTs: 1695907200, lastPrice: 121.5 },
    { datetimeLastPrice: '2025-09-29T16:00:00Z', datetimeLastPriceTs: 1695993600, lastPrice: 122.8 },
    { datetimeLastPrice: '2025-09-30T16:00:00Z', datetimeLastPriceTs: 1696080000, lastPrice: 123.45 }
  ]
};

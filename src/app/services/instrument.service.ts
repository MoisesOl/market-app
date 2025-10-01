// src/app/services/instrument.service.ts
import { Injectable, signal } from '@angular/core';
import constituentsList from '../../assets/constituyentes/constituensList.json';

export interface HistoryPoint {
  datetimeLastPrice: string;
  datetimeLastPriceTs: number;
  lastPrice: number;
}

export interface InstrumentInfo {
  name: string;
  shortName: string;
  codeInstrument: string;
  countryName: string;
  marketName?: string;
}

export interface InstrumentSummary {
  lastPrice: number;
  performanceRelative: number;
  performanceAbsolute: number;

  openPrice: number;
  closePrice: number;
  maxDay: number;
  minDay: number;
  pct30D: number;
  pctRelW52: number;
  pctRelCY: number;
}

export interface Instrument {
  info: InstrumentInfo;
  index: { name: string };
  summary: InstrumentSummary;
  history: HistoryPoint[];
}

@Injectable({ providedIn: 'root' })
export class InstrumentService {
  private instrumentList: InstrumentInfo[] = (constituentsList as any).data.constituents;
  private indexName: string = (constituentsList as any).data.info.name || 'IPSA';

  /** Signal global con el instrumento seleccionado */
  selectedInstrument = signal<Instrument | null>(null);

  /** Cache interna para instrumentos completos */
  private instrumentsCache: Record<string, Instrument> = {};

  /** Obtener lista de instrumentos básicos */
  getInstrumentList(): InstrumentInfo[] {
    return this.instrumentList;
  }

  /** Seleccionar instrumento y actualizar signal */
  async selectInstrument(code: string): Promise<void> {
    const instrument = await this.loadInstrument(code);
    this.selectedInstrument.set(instrument);
  }

  /** Cargar un instrumento completo y guardarlo en cache */
  private async loadInstrument(code: string): Promise<Instrument> {
    if (this.instrumentsCache[code]) return this.instrumentsCache[code];

    const info = this.instrumentList.find(i => i.codeInstrument === code);
    if (!info) throw new Error(`Instrumento con código ${code} no encontrado`);

    let summaryJson: any = null;
    let history: HistoryPoint[] = [];

    // Intentar cargar resumen, si no existe usar valores por defecto
    try {
      const summaryModule = await import(`../../assets/resumen/${code}.json`);
      summaryJson = summaryModule.data;
    } catch (err) {
      console.warn(`Resumen para ${code} no encontrado, usando datos básicos.`);
    }

    // Intentar cargar historial, si no existe usar array vacío
    try {
      const historyModule = await import(`../../assets/history/history-${code}.json`);
      history = historyModule.data.chart ?? [];
    } catch (err) {
      console.warn(`Historial para ${code} no encontrado.`);
    }

    const instrument: Instrument = {
      info: {
        name: summaryJson?.info?.name ?? info.name,
        shortName: summaryJson?.info?.shortName ?? info.shortName,
        codeInstrument: info.codeInstrument,
        countryName: summaryJson?.info?.countryName ?? 'N/A',
        marketName: summaryJson?.info?.marketName ?? 'N/A',
      },
      index: { name: this.indexName },
      summary: {
        lastPrice: summaryJson?.price?.lastPrice ?? 0,
        performanceRelative: summaryJson?.price?.performanceRelative ?? 0,
        performanceAbsolute: summaryJson?.price?.performanceAbsolute ?? 0,
        openPrice: summaryJson?.price?.openPrice ?? 0,
        closePrice: summaryJson?.price?.closePrice ?? 0,
        maxDay: summaryJson?.price?.maxDay ?? 0,
        minDay: summaryJson?.price?.minDay ?? 0,
        pct30D: summaryJson?.price?.pct30D ?? 0,
        pctRelW52: summaryJson?.price?.pctRelW52 ?? 0,
        pctRelCY: summaryJson?.price?.pctRelCY ?? 0,
      },
      history: history,
    };

    this.instrumentsCache[code] = instrument;
    return instrument;
  }

  /** Obtener un instrumento completo (para tabla) */
  async getInstrumentComplete(code: string): Promise<Instrument> {
    return await this.loadInstrument(code);
  }

  /** Obtener todos los instrumentos completos (para tabla) */
  async getAllInstrumentsComplete(): Promise<Instrument[]> {
    const promises = this.instrumentList.map(i => this.getInstrumentComplete(i.codeInstrument));
    return await Promise.all(promises);
  }

  /** Inicializa automáticamente el primer instrumento */
  async initDefaultInstrument() {
    const firstCode = this.instrumentList[0]?.codeInstrument;
    if (firstCode) await this.selectInstrument(firstCode);
  }
}

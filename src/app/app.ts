import { Component, computed, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ChartComponent } from './components/chart/chart.component';
import { SummaryComponent } from './components/summary/summary.component';
import { InstrumentService, Instrument, InstrumentInfo } from './services/instrument.service';
import { InstrumentListComponent } from './components/instrument-list/instrument-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ChartComponent,
    SummaryComponent,
    InstrumentListComponent,
    SearchBarComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  instruments = signal<InstrumentInfo[]>([]);

  /** Signal global del instrumento seleccionado */
  selectedInstrument = computed(() => this.instrumentService.selectedInstrument());

  /** Tabs: índice activo */
  selectedIndex = signal<'IPSA' | 'IGPA' | 'NASDAQ'>('IPSA');

  /** Referencia al componente de lista de instrumentos */
  @ViewChild('instrumentListRef') instrumentListRef!: InstrumentListComponent;

  constructor(private instrumentService: InstrumentService) {
    this.instruments.set(this.instrumentService.getInstrumentList());
    this.instrumentService.initDefaultInstrument();
  }

  /** Cambiar índice activo */
  setIndex(index: 'IPSA' | 'IGPA' | 'NASDAQ') {
    this.selectedIndex.set(index);
  }

  /** Actualizar instrumento seleccionado */
  onInstrumentSelected(instrument: Instrument) {
    this.instrumentService.selectedInstrument.set(instrument);
  }

  /** Recibe texto de búsqueda de SearchBar y llama al método de InstrumentListComponent */
  onSearchChange(term: string) {
    if (this.instrumentListRef) {
      this.instrumentListRef.onSearchChange(term);
    }
  }
}

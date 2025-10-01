import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ChartComponent } from './components/chart/chart.component';
import { SummaryComponent } from './components/summary/summary.component';
import { InstrumentService, Instrument, InstrumentInfo } from './services/instrument.service';
import { InstrumentItemComponent } from './components/instrument-item/instrument-item.component';
import { InstrumentListComponent } from './components/instrument-list/instrument-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ChartComponent,
    SummaryComponent,
    InstrumentItemComponent,
    InstrumentListComponent
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

  constructor(private instrumentService: InstrumentService) {
    // Cargar lista de instrumentos
    this.instruments.set(this.instrumentService.getInstrumentList());

    // Inicializar primer instrumento automáticamente
    this.instrumentService.initDefaultInstrument();
  }

  /** Cambiar índice activo */
  setIndex(index: 'IPSA' | 'IGPA' | 'NASDAQ') {
    this.selectedIndex.set(index);
  }

  /** Método público para actualizar el instrumento seleccionado desde el template */
  onInstrumentSelected(instrument: Instrument) {
    this.instrumentService.selectedInstrument.set(instrument);
  }
}

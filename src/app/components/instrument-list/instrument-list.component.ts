import { Component, signal, computed, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentItemComponent } from '../instrument-item/instrument-item.component';
import { InstrumentService, Instrument } from '../../services/instrument.service';

@Component({
  selector: 'app-instrument-list',
  standalone: true,
  imports: [CommonModule, InstrumentItemComponent],
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.scss'],
})
export class InstrumentListComponent implements OnInit {
  @Input() indexCode: string = 'IPSA';
  @Output() instrumentSelected = new EventEmitter<Instrument>();

  instruments = signal<Instrument[]>([]);
  searchTerm = signal('');

  filteredInstruments = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.instruments();
    return this.instruments().filter(inst =>
      inst.info.name.toLowerCase().includes(term) ||
      inst.info.shortName.toLowerCase().includes(term) ||
      inst.info.codeInstrument.toLowerCase().includes(term)
    );
  });

  firstHalf = computed(() => {
    const list = this.filteredInstruments();
    const half = Math.ceil(list.length / 2);
    return list.slice(0, half);
  });

  secondHalf = computed(() => {
    const list = this.filteredInstruments();
    const half = Math.ceil(list.length / 2);
    return list.slice(half);
  });

  constructor(private instrumentService: InstrumentService) {}

  async ngOnInit() {
    if (this.indexCode === 'IPSA') {
      const allInstruments = await this.instrumentService.getAllInstrumentsComplete();
      this.instruments.set(allInstruments);
    }
  }

  onInstrumentSelected(inst: Instrument) {
    this.instrumentSelected.emit(inst);
  }

  /** Método que se llama desde search bar */
  onSearchChange(term: string) {
    this.searchTerm.set(term);
  }
}

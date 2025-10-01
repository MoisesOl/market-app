import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument } from '../../services/instrument.service';

@Component({
  selector: 'app-instrument-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instrument-item.component.html',
  styleUrls: ['./instrument-item.component.scss'],
})
export class InstrumentItemComponent {
  @Input() instrument!: Instrument;

  /** Emite el instrumento completo al hacer click */
  @Output() instrumentSelected = new EventEmitter<Instrument>();

  hidden = false;

  selectInstrument() {
    this.instrumentSelected.emit(this.instrument);
  }

  getVariationColor(value: number) {
    if (value > 0) return 'variation-positive';
    if (value < 0) return 'variation-negative';
    return 'variation-neutral';
  }
}

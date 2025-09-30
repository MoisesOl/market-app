import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-instrument-item',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  template: `
    {{ instrument.name }} - {{ instrument['value'] | number:'1.2-2' }}
  `
})
export class InstrumentItemComponent {
  @Input() instrument: any;
}

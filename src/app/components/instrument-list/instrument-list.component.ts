import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { InstrumentItemComponent } from '../instrument-item/instrument-item.component';

@Component({
  selector: 'app-instrument-list',
  standalone: true,
  imports: [CommonModule, DecimalPipe, InstrumentItemComponent],
  template: `
    <div *ngFor="let instrument of instruments">
      <app-instrument-item [instrument]="instrument"></app-instrument-item>
    </div>
  `
})
export class InstrumentListComponent {
  @Input() instruments: any[] = [];
}

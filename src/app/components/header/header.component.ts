import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument } from '../../services/instrument.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() selectedInstrumentSignal: Instrument | null = null;

  get headerData() {
    const instrument = this.selectedInstrumentSignal;

    const cp = instrument?.summary.performanceAbsolute ?? 0;
    const cPerc = instrument?.summary.performanceRelative ?? 0;

    return {
      indexShortName: instrument?.index?.name ?? '', 
      name: instrument?.info.name ?? 'Instrumento',
      value: instrument?.summary.lastPrice ?? 0,
      changePercentage: Math.abs(cPerc) < 0.001 ? 0 : cPerc,
      changePoints: Math.abs(cp) < 0.001 ? 0 : cp,
    };
  }
}

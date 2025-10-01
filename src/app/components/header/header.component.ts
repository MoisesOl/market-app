import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument } from '../../services/instrument.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent {
  private _instrument: Instrument | null = null;

  @Input() 
  set selectedInstrumentSignal(inst: Instrument | null) {
    this._instrument = inst ? { ...inst } : null;
  }
  get selectedInstrumentSignal(): Instrument | null {
    return this._instrument;
  }

  get headerData() {
    const instrument = this._instrument;
    const cp = instrument?.summary.performanceAbsolute ?? 0;
    const cPerc = instrument?.summary.performanceRelative ?? 0;

    return {
      indexShortName: instrument?.index?.name ?? '', 
      name: instrument?.info.name ?? 'Instrumento',
      value: instrument?.summary.lastPrice ?? 0,       // número crudo
      changePercentage: Math.abs(cPerc) < 0.001 ? 0 : cPerc,
      changePoints: Math.abs(cp) < 0.001 ? 0 : cp,    // número crudo
    };
  }

  getColor(value: number): string {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-gray-400';
  }
}

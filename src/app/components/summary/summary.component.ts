import { Component, Input, signal, computed, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument } from '../../services/instrument.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnChanges {
  /** Recibimos el instrumento como signal para reactividad */
  @Input() instrumentSignal: Instrument | null = null;

  /** Signal interna */
  instrument = signal<Instrument | null>(null);

  /** Sincronizamos la signal interna cuando cambia la input */
  ngOnChanges() {
    this.instrument.set(this.instrumentSignal);
  }

  /** Formatea valores numéricos y deja los strings tal cual */
  formatValue(value: any, isPercent: boolean = false): string {
    if (value === null || value === undefined) return 'N/A';
    if (!isNaN(value)) {
      const num = Number(value);
      return isPercent
        ? `${num.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
        : num.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return value; // deja strings tal cual
  }

  /** Datos de mercado */
  marketData = computed(() => {
    const inst = this.instrument();
    if (!inst) return [];
    return [
      { label: 'Mercado', value: inst.info.marketName ?? 'N/A' },
      { label: 'Apertura', value: inst.summary.openPrice },
      { label: 'Cierre anterior', value: inst.summary.closePrice },
      { label: 'Máximo diario', value: inst.summary.maxDay },
      { label: 'Mínimo diario', value: inst.summary.minDay },
    ];
  });

  /** Datos de variación */
  variationData = computed(() => {
    const inst = this.instrument();
    if (!inst) return [];
    return [
      { label: '1 Mes', value: inst.summary.pct30D, raw: inst.summary.pct30D },
      { label: '1 Año', value: inst.summary.pctRelW52, raw: inst.summary.pctRelW52 },
      { label: 'Año a la fecha', value: inst.summary.pctRelCY, raw: inst.summary.pctRelCY },
    ];
  });

  /** Función para determinar el color de la variación */
  getVariationColor(value: number) {
    if (value > 0) return 'variation-positive';
    if (value < 0) return 'variation-negative';
    return 'variation-neutral';
  }
}

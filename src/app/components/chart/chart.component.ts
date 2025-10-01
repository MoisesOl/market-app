import { Component, Input, OnChanges } from '@angular/core';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexXAxis,
  ApexMarkers,
  ApexGrid,
  ApexYAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';

type Period = '1M' | '3M' | '6M' | '1A';

interface HistoryPoint {
  datetimeLastPrice: string;
  datetimeLastPriceTs: number; // en segundos
  lastPrice: number;
}

interface Instrument {
  info: { name: string; shortName: string; codeInstrument: string; countryName: string };
  summary: { lastPrice: number; performanceRelative: number; performanceAbsolute: number };
  history: HistoryPoint[];
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
  @Input() instrument!: Instrument;

  selectedPeriod: Period = '6M';
  series: ApexAxisChartSeries = [];

  chart: ApexChart = {
    type: 'area',
    height: 360,
    animations: { enabled: true },
    toolbar: { show: true },
  };

  xaxis: ApexXAxis = { type: 'datetime', labels: { datetimeUTC: false, style: { colors: '#f4f4f5' } } };
  yaxis: ApexYAxis = {
    decimalsInFloat: 2,
    labels: { style: { colors: '#f4f4f5' } },
    axisBorder: { show: true, color: '#444' }, // línea del eje Y
    axisTicks: { show: true, color: '#444' }   // ticks del eje Y
  };
  dataLabels: ApexDataLabels = { enabled: false };
  stroke: ApexStroke = { curve: 'smooth', width: 2 };
  markers: ApexMarkers = { size: 0 };
  grid: ApexGrid = {
    show: true,
    borderColor: '#333', // color del borde general del grid
    yaxis: {
      lines: { show: true } 
    }
  };
  fill: ApexFill = { type: 'solid', opacity: 0.25 };
  tooltip: ApexTooltip = {
    theme: 'dark',
    x: { format: 'dd MMM yyyy' },
    style: { fontSize: '12px', fontFamily: 'Inter, sans-serif' },
    marker: { show: true },
    y: { formatter: (val) => `$${val.toFixed(2)}` },
  };

  ngOnChanges(): void {
    if (this.instrument?.history?.length) {
      this.updateSeries();
    }
  }

  setPeriod(period: Period) {
    this.selectedPeriod = period;
    this.updateSeries();
  }

  private updateSeries() {
    const points = this.filterByPeriod(this.instrument.history, this.selectedPeriod).map((p) => ({
      x: p.datetimeLastPriceTs * 1000,
      y: p.lastPrice,
    }));

    this.series = [{ name: this.instrument.info.name, data: points }];
  }

  private filterByPeriod(data: HistoryPoint[], period: Period): HistoryPoint[] {
    if (!data.length) return [];
    const daysMap: Record<Period, number> = { '1M': 30, '3M': 90, '6M': 180, '1A': 365 };
    const days = daysMap[period];
    const total = data.length;
    const startIndex = Math.max(total - days, 0);
    return data.slice(startIndex, total);
  }
}
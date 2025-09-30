import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() selectedInstrument: { name: string; value: number } | null = null;

  currentPeriod = signal<'1M' | '3M' | '6M' | '1A'>('1M');

  periods = ['1M','3M','6M','1A'] as const;

  chartData = computed(() => {
    const instrument = this.selectedInstrument;
    if (!instrument) return { labels: [], datasets: [] };
    const points = this.generateData(instrument.value, this.currentPeriod());
    return {
      labels: points.map((_, i) => i + 1),
      datasets: [
        {
          label: instrument['name'],
          data: points,
          fill: true, // activa el relleno bajo la línea
          backgroundColor: 'rgba(66, 165, 245, 0.2)', // color sólido semitransparente
          borderColor: '#42A5F5', // color de la línea
          tension: 0.3 // suaviza la curva
        }
      ]
    };
  });

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true }
    },
    scales: {
      x: {
        grid: {
          display: false 
        }
      },
      y: {
        grid: {
          display: true,        // mostrar líneas horizontales
          color: '#444',        // color de las líneas
          borderColor: '#888'   // color del borde del eje
        },
        ticks: {
          color: '#eee'         // color de los números del eje Y
        }
      }
    }
  };

  setPeriod(period: '1M' | '3M' | '6M' | '1A') {
    this.currentPeriod.set(period);
  }

  private generateData(baseValue: number, period: string): number[] {
    let pointsCount = { '1M':20, '3M':60, '6M':120, '1A':250 }[period] || 20;
    const data: number[] = [];
    let value = baseValue;
    for (let i = 0; i < pointsCount; i++) {
      value += (Math.random()-0.5)*baseValue*0.02;
      data.push(parseFloat(value.toFixed(2)));
    }
    return data;
  }
}

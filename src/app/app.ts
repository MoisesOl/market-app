import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TabComponent } from './components/tab/tab.component';
import { SummaryComponent } from './components/summary/summary.component';
import { InstrumentListComponent } from './components/instrument-list/instrument-list.component';
import { ChartComponent } from './components/chart/chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    HeaderComponent,
    ChartComponent,
    TabComponent,
    SummaryComponent,
    InstrumentListComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  selectedInstrument = {
    name: 'Instrumento Ejemplo',
    country: 'Chile',
    value: 123.45,
    changePercentage: -0.78,
    changePoints: -51.01
  };

  instruments = [
    { name: 'Instrumento 1', value: 100, change: 0.5, volume: 500 },
    { name: 'Instrumento 2', value: 200, change: -1.2, volume: 300 },
    { name: 'Instrumento 3', value: 150, change: 0.8, volume: 800 }
  ];
}

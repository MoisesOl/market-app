import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() selectedInstrument: {
    name: string;
    country?: string;
    value: number;
    changePercentage: number;
    changePoints: number;
  } | null = null;
}



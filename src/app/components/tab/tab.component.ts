import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs">
      <button *ngFor="let tab of tabs; let i = index" (click)="selectTab(i)">
        {{ tab }}
      </button>
    </div>
    <div *ngFor="let content of filteredContent">
      {{ content }}
    </div>
  `
})
export class TabComponent {
  @Input() tabs: string[] = ['Tab 1', 'Tab 2'];
  @Input() filteredContent: any[] = ['Contenido 1', 'Contenido 2'];
  
  selectTab(index: number) {
    console.log('Tab seleccionado:', index);
  }
}

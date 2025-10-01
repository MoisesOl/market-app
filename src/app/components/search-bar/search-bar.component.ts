import { Component, EventEmitter, Output, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  /** Texto de búsqueda */
  searchTerm = signal('');

  /** Emitir cuando cambia el texto para que la tabla filtre */
  @Output() searchChange = new EventEmitter<string>();

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.searchChange.emit(term);
  }
}

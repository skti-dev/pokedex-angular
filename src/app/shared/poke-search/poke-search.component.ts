import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent {
  @Output() public emitSearch: EventEmitter<string> = new EventEmitter()

  public search(value: string) {
    this.emitSearch.emit(value)
  }
}

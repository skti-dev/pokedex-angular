import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-header',
  templateUrl: './poke-header.component.html',
  styleUrls: ['./poke-header.component.scss']
})
export class PokeHeaderComponent {
  @Input() public hasHomeButton?: boolean = false
}

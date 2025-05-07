import { Component, Input } from '@angular/core';
import { Customer } from '../customer';

@Component({
  selector: 'app-search-result',
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  @Input() 
  customer!: Customer;
}

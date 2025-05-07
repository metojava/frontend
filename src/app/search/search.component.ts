import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule, 
    ReactiveFormsModule, FormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchForm!: FormGroup;

  customerService: CustomerService = inject(CustomerService);

  ngOnInit() {
    this.searchForm = new FormGroup({
      dateOfBirth: new FormControl('', [Validators.required]),
      ssn: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(4),
        Validators.pattern(/^\d{4}$/)
      ]),
    });
  }

  search() {

    if (this.searchForm.valid) {
      console.log('Form submitted:', this.searchForm.value);
      const ssn = this.searchForm.controls['ssn'].value;
      const dateOfBirth = this.searchForm.controls['dateOfBirth'].value;
      console.log(ssn);
      console.log(dateOfBirth);
      this.customerService.searchForCustomers(ssn, dateOfBirth);
      
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
    
  }
}

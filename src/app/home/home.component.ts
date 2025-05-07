import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SsnLastFourPipe } from '../ssn-last-four.pipe';
import { SearchComponent } from '../search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from '../search-result/search-result.component';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatTableModule,
    SsnLastFourPipe,
    SearchComponent,
    FormsModule, ReactiveFormsModule,
    SearchResultComponent,
    RouterOutlet, RouterModule,
    RouterLink, RouterLinkActive,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  state: any;
  subscription: Subscription;
  customersList: Customer[] = [];
  customerService: CustomerService = inject(CustomerService);

  constructor() {

    this.subscription = this.customerService.state$.subscribe(state => {
      this.state = state;
      this.customersList = this.state.data;
      this.dataSource = this.customersList;
    });
    this.customerService.getAllCustomers();
    // this.customerService.getAllCustomers().then((customersList: Customer[]) => {
    //   this.customersList = customersList;
    //   this.dataSource = this.customersList;
    // });
  }

  ngOnInit() {

    this.subscription = this.customerService.state$.subscribe(state => {
      this.state = state;
      this.customersList = this.state.data;
      this.dataSource = this.customersList;
    });
    this.customerService.getAllCustomers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  displayedColumns: string[] = ['fullName', 'ssn', 'dateOfBirth', 'actions'];
  //dataSource = this.CUSTOMER_DATA;
  dataSource = this.customersList;

  onDeleteClick(id: any){
    alert(id);
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        // Handle success, e.g., remove the item from the UI
        console.log('Customer deleted successfully');
      },
      error: (error) => {
        // Handle error, e.g., display an error message
        console.error('Error deleting Customer', error);
      }
    });
  }

}

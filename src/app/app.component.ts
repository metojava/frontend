import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Customer } from './customer';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  CommonModule, MatMenuModule,MatButtonModule,
             RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'frontend';
  
  CUSTOMER_DATA: Customer[] = [
    {fullName: 'Holmes', ssn: "123-456-1234", dateOfBirth: '09/08/1980'},
    {fullName: 'Heine', ssn: "234-234-2345", dateOfBirth: '02/27/2000'},
    {fullName: 'Lucas', ssn: "345-345-3456", dateOfBirth: '11/06/1990'},
    {fullName: 'Boris', ssn: "456-456-4567", dateOfBirth: '12/05/1980'},
    {fullName: 'Bonga', ssn: "567-567-5678", dateOfBirth: '06/04/170'},
    {fullName: 'Carlos', ssn: "678-678-6789", dateOfBirth: '03/11/1960'},

  ];
  
}

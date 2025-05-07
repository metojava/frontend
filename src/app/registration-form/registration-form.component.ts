import { Component, OnInit , inject, ChangeDetectorRef} from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormControl, Validators, FormsModule, AbstractControl, ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  imports: [
    ReactiveFormsModule, FormsModule, CommonModule
  ]
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  customerService: CustomerService = inject(CustomerService);
  
  constructor(private router: Router, private chdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      dateOfBirth: new FormControl('', [Validators.required]),
      ssn: new FormControl('', [Validators.required,
       Validators.pattern(/^\d{3}-\d{2}-\d{4}$/), this.ssnValidator
      ]),
    });

    this.registrationForm.statusChanges.subscribe((stat)=>{
      if(this.registrationForm.valid){
        this.chdRef.detectChanges();
      }else{
        this.chdRef.detectChanges();
      }
    });
  }

  ssnValidator(control: AbstractControl): ValidationErrors | null {
    const ssnValue = control.value;
    if (ssnValue) {
      const parts = ssnValue.split('-');
      if (parts.length === 3) {
        const [part1, part2, part3] = parts;
        if (part1 === '000' || part1 === '666' || (parseInt(part1) >= 900 && parseInt(part1) <= 999)) {
          return { ssnInvalid: true };
        }
        if (part2 === '00') {
          return { ssnInvalid: true };
        }
        if (part3 === '0000') {
          return { ssnInvalid: true };
        }
      } else {
          return { ssnInvalid: true };
      }
    }
    return null;
  }

  onSubmit() {
    console.log("submitting");
    if (this.registrationForm.valid) {
      console.log('SSN is valid:', this.registrationForm.value.ssn);
    }
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);

      const fullName = this.registrationForm.controls['fullName'].value;
      const ssn = this.registrationForm.controls['ssn'].value;
      const dateOfBirth = this.registrationForm.controls['dateOfBirth'].value;

      this.customerService.registerCustomer(fullName, ssn, dateOfBirth);
      setTimeout(() => {
        this.router.navigate(['/home']).then(()=>{
          //window.location.reload();
          this.customerService.getAllCustomers();
        });
      }, 1000);
      

    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}

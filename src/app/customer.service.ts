import { Injectable, inject } from '@angular/core';
import { Customer } from './customer';
import { BehaviorSubject } from 'rxjs';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

interface DataState {
  data: any[];
  isLoading: boolean;
}

const initialState: DataState = {
  data: [],
  isLoading: false,
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'http://localhost:8080/customers';

  private http = inject(HttpClient);
  data: any;

  private state = new BehaviorSubject<DataState>(initialState);
  readonly state$ = this.state.asObservable();

  constructor() { }

  get currentState(): DataState {
    return this.state.value;
  }

  setState(newState: Partial<DataState>) {
    this.state.next({ ...this.currentState, ...newState })
  }

  async getAllCustomers() {
    this.setState({ isLoading: true });

    //const data = await fetch(this.url + "/Customers");
    const data = this.http.get(this.url + "/Customers").subscribe((response: any) => {
      this.data = response;
      this.state.next(this.data);
      console.log("state changed");
      this.setState({ data: this.data, isLoading: false });
    });
    this.setState({ isLoading: false });
    // await this.setState({ data: data.json(), isLoading: false });
    // return await data.json() ?? [];
  }

  async searchForCustomers(ssn: any, dateOfBirth: any) {
    this.setState({ isLoading: true });

    let params = new HttpParams()
      .set('ssn', ssn)
      .set('dateOfBirth', dateOfBirth);

    const data = this.http.get(this.url + "/findCustomers", {params}).subscribe((response: any) => {
      this.data = response;
      this.state.next(this.data);
      this.setState({ data: this.data, isLoading: false });
    });
   
    //const data = await fetch(this.url + "/findCustomers");
    // await this.setState({ data: data.json(), isLoading: false });
    // return await data.json() ?? [];
  }

  async registerCustomer(fullName: any, ssn: any, dateOfBirth: any){
    this.setState({ isLoading: true });

    let params = new HttpParams()
      .set('fullName', fullName)
      .set('ssn', ssn)
      .set('dateOfBirth', dateOfBirth);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      const formData = {'fullName': fullName,'ssn': ssn, 'dateOfBirth': dateOfBirth};

      const data = this.http.post(this.url + "/Customers", formData, httpOptions).subscribe((response: any) => {
        //this.data = response;
        //this.state.next(this.data);
        console.log(response);
        this.setState({  isLoading: false });
      });

  }

  deleteCustomer(id: any){
    return this.http.delete(`${this.url}/Customers/${id}`);
  }

}

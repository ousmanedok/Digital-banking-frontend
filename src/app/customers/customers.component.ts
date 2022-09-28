import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../services/customer.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private  customerService : CustomerService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  /*  this.customerService.getCustomers().subscribe({
      next: (data) =>{
        this.customers = data;
        console.log(this.customers);
      },
      error: (error) =>{
        this.errorMessage = error;
      }
    }) */
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    /* this.customers = this.customerService.getCustomers().pipe(
      catchError( error => {
        this.errorMessage = error.message;
        return throwError(error);
      })
    ); */

    this.handleSearchCustomers();
  }

  handleSearchCustomers(){
    let keyword = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(keyword).pipe(
      catchError( error => {
        this.errorMessage = error.message;
        return throwError(error);
      })
    );

  }

  handleDeleteCustomer(customer: Customer){
    let conf = confirm("Are you sure to delete this customer ?");
    if(!conf) return;
    this.customerService.deleteCustomer(customer.id).subscribe({
      next: (response) =>{
        this.customers = this.customers.pipe(
          map(data =>{
            let index = data.indexOf(customer);
            data.slice(index, 1);
            return data;
          })
        )
          
        console.log("This customer has been deleted successfuly");
      },
      error: error =>{
        console.log("An error occured while deleting");
      }
    })
  }


}

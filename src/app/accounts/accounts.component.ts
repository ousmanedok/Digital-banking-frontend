import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountsService } from './../services/accounts.service';
import { Observable } from 'rxjs';
import { accountDetails } from './../model/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accountFormGroup!: FormGroup;
  operationFormGroup!: FormGroup;
  currentPage: number=0;
  pageSize: number=5;
  account$!: Observable<accountDetails>

  constructor(private fb: FormBuilder, private acountService: AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control("")
    })

    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(""),
      amount: this.fb.control(0),
      accountDestination: this.fb.control(""),
      description: this.fb.control("")

    })

  }

  handleSearchAccount(){
    let accoundId : string = this.accountFormGroup.value.accountId;
    this.account$ = this.acountService.getAccount(accoundId,this.currentPage,this.pageSize)

  }

  gotoPage(page: number){
    this.currentPage = page;
    this.handleSearchAccount();

  }

  handleAccountOperation(){
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount = this.operationFormGroup.value.amount;
    let accountDestination = this.operationFormGroup.value.accountDestination;
    let description = this.operationFormGroup.value.description;

    if (operationType=="debit") {
      this.acountService.debit(accountId, amount, description).subscribe({
        next: (data) =>{
          alert(" Success operation debit");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        }, error: (error) =>{
          console.log(error);
        }
      });
      
    }else if (operationType=="credit") {
      this.acountService.credit(accountId, amount, description).subscribe({
        next: (data) =>{
          alert(" Success operation credit");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        }, error: (error) =>{
          console.log(error);
        }
      });
      
    }else if (operationType=="transfer") {
      this.acountService.transfer(accountId, accountDestination, amount, description).subscribe({
        next: (data) =>{
          alert("Success operation tranfer");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        }, error: (error) =>{
          console.log(error);
        }
      });
    }

  }  

}

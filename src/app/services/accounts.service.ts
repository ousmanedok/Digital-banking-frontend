import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { accountDetails } from './../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private httpClient: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number): Observable<accountDetails>{
    return this.httpClient.get<accountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(accountId: string, amount: number, description: string){
    let data = {accountId: accountId, amount: amount, description: description};

    return this.httpClient.post(environment.backendHost+"/accounts/debit", data);
  }

  public credit(accountId: string, amount: number, description: string){
    let data = {accountId: accountId, amount: amount, description: description};

    return this.httpClient.post(environment.backendHost+"/accounts/credit", data);
  }
  public transfer(accountSource: string, accountDestination: string, amount: number, description: string){
    let data = {accountSource, accountDestination, amount, description};

    return this.httpClient.post(environment.backendHost+"/accounts/transfer", data);
  }
}

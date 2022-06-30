import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpclient: HttpClient) {}

  AccountNumberExists(accountNumber: string): Observable<boolean> {
    return this.httpclient.get<boolean>(
      environment.apiUrlBase + 'account/AccountNumberExists/' + accountNumber
    );
  }
}

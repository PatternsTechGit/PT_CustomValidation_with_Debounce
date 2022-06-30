import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn, Validator, ValidatorFn } from '@angular/forms';
import { map, Observable, of, switchMap, timer } from 'rxjs';
import { AccountService } from '../services/account.service';

@Directive({
  // this is the selector that will be used in Template on the felid where its required.
    selector: '[accountNumValidator]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS, 
        useExisting: AccountNumValidatorDirective, 
        multi: true
    }]
})
export class AccountNumValidatorDirective implements AsyncValidator {
  // Injecting accountService since we will hit an api to check existence of an account number
    constructor(private accountService: AccountService) {  }
    // implementing AsyncValidator requires us to define a function called validate that either returns a promise or observable
    // This Promise or Observable is will return true if validation pass or ValidationErrors if validation fails.
    //control will have reference of control on which we applied the validator. 
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      // passing the service reference and control to a function.
      return existingAccountNumberValidator(this.accountService)(control);
    }
  } 
  export function existingAccountNumberValidator(accountService: AccountService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      let debounceTime = 1000; //milliseconds
      // rxjs timer Creates an observable that will wait for a specified time period, or exact date, before emitting the value
      return timer(debounceTime).pipe(
        // switch maps triggers value emotion when another observable emits a value. In this case switchMap will be triggered when timer will emit a value. 
        switchMap(() => accountService.AccountNumberExists(control.value)),
        map((response: boolean) => {
          // if api returns true which means account number existed in the database then a key value pair of error name (key) and value (true) will be returned
          // if api returned false we return null. 
          return (response == true ) ? { "accountNumberExists": true } : null;
        })
      );
    };
  } 
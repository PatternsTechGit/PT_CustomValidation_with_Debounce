import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TransactionService } from './services/transaction.service';
import { FormsModule } from '@angular/forms';
import { AccountService } from './services/account.service';
import { AccountNumValidatorDirective } from './validators/account-number.validator';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AccountNumValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TransactionService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }

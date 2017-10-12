import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from 'app/core/core.module';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginService } from 'app/login/login.service';
import { NgSpinKitModule } from 'app/shared/spinner/spinners';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ListGuard } from './list.guard';
import { TodoListService } from './todo-list/todo-list.service';

const appRoutes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'list',
  component: TodoListComponent,
  canActivate: [ListGuard],
}, {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgSpinKitModule.forRoot()
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    LoginService, ListGuard, TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
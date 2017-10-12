import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService, StorageType } from 'app/shared/storage/storage.service';
import { LoginService } from './login.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { AppUtilService } from 'app/shared/app-util/app-util.service';
import { Notification, NOTIFICATION_TYPE, NotificationService } from 'app/shared/notification-util/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public formErrors: any;
  constructor(private fb: FormBuilder, private loginService: LoginService,
    private storageService: StorageService, private router: Router,
    private notificationService: NotificationService, private authService: AuthService,
    private appUtilService: AppUtilService) { }

  ngOnInit() {
    this.storageService.removeAll(StorageType.LOCALSTORAGE);
    this.storageService.removeAll(StorageType.SESSIONSTORAGE);
    this.storageService.removeAll(StorageType.COOKIESTORAGE);
    this.buildForm();
  }
  buildForm() {
    this.resetFormErrors();
    this.loginForm = this.fb.group({
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  resetFormErrors() {
    this.formErrors = {
      'userName': '',
      'password': ''
    };
  }

  validationMessages = {
    'userName': {
      'required': 'Username is required.'
    },
    'password': {
      'required': 'Password is required.'
    }
  };

  onSubmit() {
    if (this.loginForm.invalid) {
      this.formErrors = this.appUtilService.validateForm(this.loginForm, this.validationMessages, this.formErrors);
      this.loginForm.valueChanges
        .subscribe(data => { this.formErrors = this.appUtilService.validateForm(this.loginForm, this.validationMessages, this.formErrors); });
      return;
    } else {
      this.loginService.login(this.loginForm.value).subscribe(resp => {
        this.authService.setToken(resp['token']);
        this.router.navigate(['list']);
      }, err => {
        this.notificationService.notify(new Notification(err.message, NOTIFICATION_TYPE.ERROR));
      })
    }
  }
}

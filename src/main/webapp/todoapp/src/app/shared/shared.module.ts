import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { StorageService, StorageType } from './storage/storage.service';
import { ConfirmService } from './confirm/confirm.service';
import { NotificationService } from './notification-util/notification.service';
import { AuthService } from './auth/auth.service';
import { AppHttpInterceptor } from './auth/auth-http.service';
import { APP_HTTP_INTERCEPTOR } from 'app/shared/auth/auth-http.service';
import { HttpClientModule } from '@angular/common/http';
import { GenericService } from './generic/generic.service';
import { AppUtilService } from 'app/shared/app-util/app-util.service';

@NgModule({
  imports: [
    HttpClientModule],
  declarations: [],
  exports: [],
  providers: [APP_HTTP_INTERCEPTOR]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [StorageService, ConfirmService, NotificationService, AuthService, GenericService, AppUtilService]
    }
  }
  constructor( @Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error(
        'SharedModule is already loaded. Import it in the AppModule only');
    }
  }
}
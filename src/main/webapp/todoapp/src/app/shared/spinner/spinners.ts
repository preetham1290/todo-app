import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner.component'
import { FadingCircleComponent } from './fading-circle.component';
import { SpinnerService } from './spinner.service';
import { WaveComponent } from './wave.component';

export const NG_SPIN_KIT_COMPONENTS = [
  SpinnerComponent,
  FadingCircleComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpinnerComponent,
    FadingCircleComponent,
    WaveComponent
  ],
  exports: [
    SpinnerComponent,
    FadingCircleComponent,
    WaveComponent
  ]
})
export class NgSpinKitModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgSpinKitModule,
      providers: [SpinnerService]
    }
  }
  constructor( @Optional() @SkipSelf() parentModule: NgSpinKitModule) {
    if (parentModule) {
      throw new Error(
        'NgSpinKitModule is already loaded. Import it in the AppModule only');
    }
  }
}

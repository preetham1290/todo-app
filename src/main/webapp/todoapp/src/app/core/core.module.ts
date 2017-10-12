import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from 'app/shared/confirm/confirm.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [ConfirmComponent],
  exports: [ConfirmComponent, CommonModule, FormsModule,
    ReactiveFormsModule]
})
export class CoreModule { }
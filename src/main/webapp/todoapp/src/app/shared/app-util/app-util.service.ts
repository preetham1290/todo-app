import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Injectable()
export class AppUtilService {

  constructor() { }

  buildDataObjectForDataTable(object) {
    let dtObject = {};
    for (var key in object) {
      if (Array.isArray(object[key])) {
        dtObject[key] = object[key].toString();
      } else if (object[key] !== null && !(object[key] === '')) {
        dtObject[key] = object[key];
      }
    }
    return dtObject;
  }

  validateForm(form: FormGroup, validationMessages: any, formErrors: any) {
    if (!form) { return; }
    for (const field in formErrors) {
      if (form.get(field) instanceof FormGroup) {
        console.log(field);
        // this.validateForm(new FormGroup(), validationMessages[field], formErrors[field]);
      } else {
        formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
    return formErrors;
  }

}

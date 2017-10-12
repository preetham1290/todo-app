import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SpinnerService {
  private spinnerSource = new Subject<Boolean>();
  spinnerToggled$ = this.spinnerSource.asObservable();
  constructor() { }

  startSpinner() {
    this.spinnerSource.next(true);
  }
  stopSpinner() {
    this.spinnerSource.next(false);
  }
}

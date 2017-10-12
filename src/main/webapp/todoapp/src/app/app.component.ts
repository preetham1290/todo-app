import { Component } from '@angular/core';
import { environment } from 'environments/environment';
import { SpinnerService } from 'app/shared/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  options = {
    position: ['top', 'right'],
    pauseOnHover: false,
    timeOut: 5000,
    showProgressBar: false
  }

  count: number = 0;
  isSpinnerRunning = false;
  public constructor(private spinnerService: SpinnerService) {
    this.spinnerService.spinnerToggled$.subscribe((res) => {
      if (res) {
        this.count++;
        if (this.count) {
          setTimeout(() => {
            this.isSpinnerRunning = true;
          }, 0);
        }
      } else {
        this.count--;
        if (!this.count) {
          setTimeout(() => {
            this.isSpinnerRunning = false;
          }, 0);
        }
      }
    });
  }

}

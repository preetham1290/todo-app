import { Component, OnInit, Injectable } from '@angular/core';
import { ConfirmService } from './confirm.service';
declare var $: any;
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
@Injectable()
export class ConfirmComponent implements OnInit {
  public title: string;
  public message: string;
  public okText: string;
  public cancelText: string;

  private _defaults = {
    title: 'Confirm',
    message: 'Confirm the operation?',
    cancelText: 'Cancel',
    okText: 'OK'
  };
  private _confirmElement: any;
  private _cancelButton: any;
  private _okButton: any;

  constructor(confirmService: ConfirmService) {
    // assign a function to the property activate of ConfirmService.
    // After this, calling activate on ConfirmService will cause the function activate
    // from ConfirmComponent to be executed.
    confirmService.activate = this.activate.bind(this);
  }

  private setLabels(message = this._defaults.message, title = this._defaults.title) {
    this.title = title;
    this.message = message;
    this.okText = this._defaults.okText;
    this.cancelText = this._defaults.cancelText;
  }

  activate(message = this._defaults.message, title = this._defaults.title) {
    this.setLabels(message, title);
    let promise = new Promise<boolean>(resolve => {
      this.show(resolve);
    });
    return promise;
  }

  private show(resolve: (boolean) => any) {
    document.onkeyup = null;

    let negativeOnClick = (e: any) => resolve(false);
    let positiveOnClick = (e: any) => resolve(true);

    if (!this._confirmElement || !this._cancelButton || !this._okButton) {
      return;
    }

    this._cancelButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!negativeOnClick(e)) {
        this.hideDialog();
      }
    });

    this._okButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!positiveOnClick(e)) {
        this.hideDialog();
      }
    });

    this._confirmElement.onclick = () => {
      this.hideDialog();
      return negativeOnClick(null);
    };

    document.onkeyup = (e: any) => {
      // if (e.which === KEY_ESC) {
      //   this.hideDialog();
      //   return negativeOnClick(null);
      // }
    };
    $('#confirmationModal').modal('show');
  }

  private hideDialog() {
    document.onkeyup = null;
    $('#confirmationModal').modal('hide');
  }

  ngOnInit(): any {
    this._confirmElement = document.getElementById('confirmationModal');
    this._cancelButton = document.getElementById('cancelButton');
    this._okButton = document.getElementById('okButton');
  }
}
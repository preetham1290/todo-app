import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthService } from 'app/shared/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUtilService } from 'app/shared/app-util/app-util.service';
import { ConfirmService } from 'app/shared/confirm/confirm.service';
import { TodoListService } from './todo-list.service';
import { Notification, NOTIFICATION_TYPE, NotificationService } from 'app/shared/notification-util/notification.service';

declare var $: any;
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public createForm: FormGroup;
  public formErrors: any;

  statusList: Array<string> = ['ALL', 'PENDING', 'COMPLETED']
  status: string = this.statusList[0];
  constructor(private fb: FormBuilder, private authService: AuthService,
    private appUtilService: AppUtilService, private todoListService: TodoListService,
    private confirmService: ConfirmService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.drawDataTable(this.status);
  }

  drawDataTable(status: string) {
    let _this = this;
    let url = environment.baseUri + 'todo';
    let columns = [
      { 'title': 'Topic', 'data': 'topic', 'name': 'topic' },
      { 'title': 'Description', 'data': 'description', 'name': 'description' },
      { 'title': 'Status', 'data': 'status', 'name': 'status' },
      { 'title': 'Action', 'data': null, 'name': null, 'defaultContent': '<i class="fa fa-fw fa-edit"></i> &nbsp; &nbsp;<i class="fa fa-fw fa-trash"></i>' }
    ];
    let tableHeaders: string;
    columns.forEach(element => {
      tableHeaders += '<th>' + element.title + '</th>';
    });
    $('#example').find('thead').remove();
    $('#example').append('<thead><tr>' + tableHeaders + '</tr></thead>');
    $('#example').DataTable({
      'serverSide': false,
      'responsive': true,
      'destroy': true,
      'ajax': {
        'url': url.concat(status !== _this.statusList[0] ? '?status=' + status : ''),
        'dataSrc': '',
        'headers': { 'Authorization': 'Bearer ' + this.authService.getToken() }
      },
      'columns': columns,
      'createdRow': (row, data, index) => {
        $(row).find(':last-child > i.fa-edit').off('click').on('click', () => {
          _this.buildUpdateForm(data);
        });
        $(row).find(':last-child > i.fa-trash').off('click').on('click', () => {
          _this.deleteTask(data['id']);
        });
      }
    });
  }

  buildCreateForm() {
    let obj = {};
    obj['id'] = null;
    obj['topic'] = '';
    obj['description'] = '';
    obj['status'] = null;
    this.buildForm(obj);
  }

  buildUpdateForm(data: any) {
    this.buildForm(data);
  }

  buildForm(obj: any) {
    this.resetFormErrors();
    this.createForm = this.fb.group({
      'id': [obj['id']],
      'topic': [obj['topic'], Validators.required],
      'description': [obj['description'], Validators.required],
      'status': [obj['status']]
    });
    $('#create-modal').modal('show');
  }

  resetFormErrors() {
    this.formErrors = {
      'topic': '',
      'description': ''
    };
  }

  validationMessages = {
    'topic': {
      'required': 'Title is required.'
    },
    'description': {
      'required': 'Description is required.'
    }
  };

  onSubmit() {
    if (this.createForm.invalid) {
      this.formErrors = this.appUtilService.validateForm(this.createForm, this.validationMessages, this.formErrors);
      this.createForm.valueChanges
        .subscribe(data => { this.formErrors = this.appUtilService.validateForm(this.createForm, this.validationMessages, this.formErrors); });
      return;
    } else {
      let obj = this.createForm.getRawValue();
      if (obj['id'] === null) {
        this.todoListService.create(this.createForm.value).subscribe(resp => {
          this.notificationService.notify(new Notification('Task created successfully', NOTIFICATION_TYPE.SUCCESS));
          this.closeModal();
          this.drawDataTable(this.status);
        }, err => {
          this.notificationService.notify(new Notification(err.message, NOTIFICATION_TYPE.ERROR));
        });
      } else {
        this.todoListService.update(this.createForm.value).subscribe(resp => {
          this.notificationService.notify(new Notification('Task updated successfully', NOTIFICATION_TYPE.SUCCESS));
          this.closeModal();
          this.drawDataTable(this.status);
        }, err => {
          this.notificationService.notify(new Notification(err.message, NOTIFICATION_TYPE.ERROR));
        });
      }
    }
  }

  closeModal() {
    this.createForm = null;
    $('#create-modal').modal('hide');
  }

  deleteTask(id: string) {
    this.confirmService.activate('Are you sure, you want to delete?')
      .then(result => {
        if (result) {
          this.todoListService.delete(id).subscribe(resp => {
            this.notificationService.notify(new Notification('Task deleted successfully', NOTIFICATION_TYPE.SUCCESS));
            this.drawDataTable(this.status);
          }, err => {
            this.notificationService.notify(new Notification(err.message, NOTIFICATION_TYPE.ERROR));
            this.drawDataTable(this.status);
          });
        }
      }).catch(error => {
        console.log(error);
      });
  }

}

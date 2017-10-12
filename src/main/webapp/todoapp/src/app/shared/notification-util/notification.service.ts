import { Injectable } from '@angular/core';
import { Notification, NOTIFICATION_TYPE } from './notification';
import { NotificationsService } from 'angular2-notifications';

export { Notification, NOTIFICATION_TYPE } from './notification';

@Injectable()
export class NotificationService {

  constructor(private notificationsService: NotificationsService) { }

  private getHtml(type: string, message: string, title?: string): string {
    if (!title) {
      return '<div class="notification-wrapper"><div class="custom-alert-feenalysis"><div class="alert ' + type + '"><span>' + message + '</span></div></div></div>';
    }
    return '<div class="notification-wrapper"><div class="custom-alert-feenalysis"><div class="alert ' + type + '"><p>' + title + '</p><span>' + message + '</span></div></div></div>';
  }

  notify(notification: Notification) {
    switch (notification.type) {
      case NOTIFICATION_TYPE.SUCCESS:
        this.notificationsService.html(this.getHtml('success', notification.message, notification.title), '');
        break;
      case NOTIFICATION_TYPE.ERROR:
        this.notificationsService.html(this.getHtml('error', notification.message, notification.title), '');
        break;
      case NOTIFICATION_TYPE.INFO:
        this.notificationsService.html(this.getHtml('information', notification.message, notification.title), '');
        break;
      case NOTIFICATION_TYPE.WARNING:
        this.notificationsService.html(this.getHtml('warning', notification.message, notification.title), '');
        break;
      default:
        break;
    }
  }

}

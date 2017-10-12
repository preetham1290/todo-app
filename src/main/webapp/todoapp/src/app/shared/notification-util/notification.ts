
export enum NOTIFICATION_TYPE {
    SUCCESS,
    ERROR,
    INFO,
    WARNING
}

export class Notification {
    title: string;
    message: string;
    type: NOTIFICATION_TYPE;

    constructor(message: string, type: NOTIFICATION_TYPE, title?: string, ) {
        this.title = title;
        this.message = message;
        this.type = type;
    }
}
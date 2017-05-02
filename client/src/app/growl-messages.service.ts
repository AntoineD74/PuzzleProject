import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GrowlMessagesService {

  pushMessageEvent: EventEmitter<any>;

  constructor() {
    this.pushMessageEvent = new EventEmitter();
  }

  pushMessage(msg){
    this.pushMessageEvent.emit(msg);
  }

}

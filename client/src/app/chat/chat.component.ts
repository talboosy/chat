import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() messages: any[] = [];

  @Output() messageSent = new EventEmitter<string>();
  message: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.messageSent.emit(this.message)
    this.message = '';
  }
}

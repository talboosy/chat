import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-chat-app';
  messages: any[] = [];
  message: string = '';
  socket = io('http://localhost:3000');

  public userName: any;
  public img: any;

  ngOnInit() {
    // this.userName = localStorage.getItem('userName');
    // if(!this.userName) {
    //   this.userName = this.generateRandomId(4);
    //   localStorage.setItem('userName', this.userName);
    // }
    this.socket.on('chat message', (msg: string) => {
      console.log(msg);
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.message) {
      console.log(this.message);
      this.socket.emit('chat message', {msg: this.message, user: this.userName});
      this.message = '';
    }
  }

  generateRandomId = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  onChangedUser(user: any) {
    if(user && user.username) {
      this.userName = user.username;
      this.img = user.img;
      localStorage.setItem('userName', this.userName)
    }
    console.log(`on client ${JSON.stringify(user)}`)
  }

  messageReceived(message: string) {
    this.message = message;
    if (this.message) {
      console.log(this.message);
      this.socket.emit('chat message', {msg: this.message, user: this.userName, img: this.img});
      this.message = '';
    }
  }
}

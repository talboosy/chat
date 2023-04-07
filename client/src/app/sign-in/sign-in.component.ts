import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  username: string = '';
  error: string | null = null;
  @Output() userSignedIn: any = new EventEmitter<any>();

  constructor(private http: HttpClient) {}
  ngOnInit() {
    console.log('auth')
  }

  onSubmit() {
    this.http.post<{ id: number }>('http://localhost:3000/api/signin', { username: this.username }, {  headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })})
      .subscribe({
        next: response => {
          // do something with the user ID (e.g. store it in local storage)
          this.userSignedIn.emit(response);
          console.log('User ID:', response.id);
        },
        error: error => {
          // display the error message to the user
          this.error = error.error.message;
        }
      });
  }
}

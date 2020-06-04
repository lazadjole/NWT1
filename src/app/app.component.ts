import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularApp';

  ngOnInit()
  {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyD4wWSmwddTurQenuLCjtmlVhoQtuAzZZo",
        authDomain: "nwtproject1.firebaseapp.com",
      }
    )
  }

}

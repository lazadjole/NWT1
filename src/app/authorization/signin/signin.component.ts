import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  faUserCircle=faUserCircle

  constructor(private autehService:AuthService) { }
  isError=false;
  errorMesage=""
  ngOnInit(): void {
    this.autehService.SigniInError.subscribe(
      (message:string)=>{
        this.isError=true;
        this.errorMesage=message;
      }
    )
   
  }

  
  onSubmit(form:NgForm)
  {
    this.autehService.singInUser(form.value.email,form.value.password);

  }

  onLogin()
  {
    this.autehService.googleSignup();
  }

}

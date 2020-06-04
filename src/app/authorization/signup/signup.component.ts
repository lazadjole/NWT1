import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  faUserCircle=faUserCircle
  isError:boolean=false;
  errorMesage:string="";

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.CreateUserError.subscribe(
      (message:string)=>{
        this.isError=true;
        this.errorMesage=message;
      }
    )
  }

  onSubmit(form:NgForm)
  {
    this.authService.singupUser(form.value.email,form.value.password);
  }

}

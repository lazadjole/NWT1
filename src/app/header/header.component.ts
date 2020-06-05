import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { AuthService } from '../authorization/auth.service';
import { Router } from '@angular/router';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck{
  faUserCheck=faUserCheck;
  faUser=faUser;
  faUserSlash=faUserSlash;
  isAuth:boolean;
   navbarOpen = false;
   toggleNavbar() {
                this.navbarOpen = !this.navbarOpen;
              }
  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    
   }
   
   ngDoCheck()
   {
    this.isAuth=this.authService.isAuthenticated();
   }
   onLogout()
   {
     this.authService.logout();
    this.router.navigate(['recipes']);
   }

}

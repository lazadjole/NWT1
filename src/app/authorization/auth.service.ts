import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService
{   

    CreateUserError=new Subject<string>();
    SigniInError=new Subject<string>();
    constructor(private router:Router)
    {}
    token:string;
    singupUser(email:string,password:string)
    {
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then
        (
            response=>
            {
                firebase.auth().currentUser.getIdToken()
                .then(
                    (tk:string)=>{this.token=tk;
                        this.router.navigate(['/']);
                    }
                )
                
            }
        )
        .catch(
            
            error=>{this.CreateUserError.next(error['message']);
}
        )
    }

    singInUser(email:string,password:string)
    {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then
        (
            response=>
            {
                firebase.auth().currentUser.getIdToken()
                .then(
                    (tk:string)=>{this.token=tk;
                        this.router.navigate(['/']);
                    }
                )
                
            }
        ).catch(
            error=>this.SigniInError.next(error['message'])
        );
    }

    logout()
    {
        firebase.auth().signOut();
        this.token=null;
    }

    getToken()
    {
        firebase.auth().currentUser.getIdToken()
        .then(
            (tk:string)=>this.token=tk
        );
        return this.token;
    }

    isAuthenticated()
    {
        return this.token!=null;
    }

    googleSignup()
    {
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider);
      
    }

}
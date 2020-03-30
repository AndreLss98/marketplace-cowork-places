import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup, FormControl } from '@angular/forms'

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { LoginResponse } from '../../interface/interface';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl('')
  })

  private loginResponse: LoginResponse = {
    status: false,
    data: null
  };
  
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
    ) { 
    }
    
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( response => {
      this.loginResponse.status = true;
      this.loginResponse.data = response;
      this.close();
    }, err => {
      console.log("Login canceled google", err);
    });
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( response => {
      this.loginResponse.status = true;
      this.loginResponse.data = response;
      this.close();
    }, err => {
      console.log("Login canceled facebook", err);
    });
  } 
 
  signOut(): void {
    this.authService.signOut();
  }

  onSubmit(){
    console.log("Entrar")
  }

  close(data: LoginResponse = this.loginResponse){
    this.dialogRef.close(data)
  }
  
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      
    }, err => {
      console.log("Algo errado", err)
    });
    
    this.dialogRef.backdropClick().subscribe(response => {
      this.close(this.loginResponse)
    })

  }

}

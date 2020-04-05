import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl } from '@angular/forms'

import { LoginService } from 'src/app/service/login.service';
import { ModalService } from 'src/app/service/modal.service';
import { SignupComponent } from '../signup/signup.component';

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
  
  public authUrl:string = 'http://placeet.com.br:9011/oauth2/authorize?client_id=445ebce3-618a-42b5-b746-95ea441766e6&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fhome';
  
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    public login: LoginService,
    private modal: ModalService
    ) {}

  onSubmit(){
    console.log("Entrar")
  }

  openCadastrar(){
    this.modal.openModal(SignupComponent, true)
  }

  close(){
    this.dialogRef.close()
  }
  
  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(response => {
      this.close()
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

import { LoginService } from 'src/app/shared/service/login.service';
import { ModalService } from 'src/app/shared/service/modal.service';
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
  

  constructor(
    public login: LoginService,
    private modal: ModalService
    ) {}

  onSubmit(){
    console.log("Entrar");
    this.login.signInWithEmail({
      email: this.loginForm.value.user,
      senha: this.loginForm.value.password
    });
  }

  openCadastrar(){
    this.modal.openModal(SignupComponent, true)
  }

  close(){
    this.modal.closeAllModals();
  }
  
  ngOnInit(): void {

  }

}

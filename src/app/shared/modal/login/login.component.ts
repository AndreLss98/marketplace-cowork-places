import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { LoginService } from 'src/app/shared/service/login.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  public loginError: boolean = false;
  public errorMessage: string = '';

  public showLoading = false;
  
  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  

  constructor(
    public login: LoginService,
    private modal: ModalService
    ) {}

  onSubmit(){
    this.showLoading = true

    if(this.loginForm.valid){
      let sucess = this.login.signInWithEmail(this.loginForm.value.user, this.loginForm.value.password);
      console.log('peguei', sucess)
      if(!sucess){
        this.loginError = true;
        this.errorMessage = "Senha errada, ou email não cadastrado!";
        this.showLoading = false;
      }else{
        this.loginError = false;
        setTimeout(() => {
          this.modal.closeAllModals();
        }, 250);
      }
    }else{
      this.loginError = true;
      this.errorMessage = "Preencha os campos corretamente!";
      this.showLoading = false;
    }
  }

  inputFocus(field: string){
    this.loginError = false;
  }

  openCadastrar(){
    this.modal.openModal(SignupComponent, true, {minHeight: '500px'})
  }

  close(){
    this.modal.closeAllModals();
  }
  
  ngOnInit(): void {

  }

}

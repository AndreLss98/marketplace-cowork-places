import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { LoginService } from 'src/app/shared/service/login.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { SignupComponent } from '../signup/signup.component';
import { RecuperarSenhaComponent } from '../recuperar-senha/recuperar-senha.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  public loginError: boolean = false;
  public errorMessage: string = '';
  private startLogin: boolean = false;

  public showLoading = false;
  
  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  

  constructor(
    public login: LoginService,
    private modal: ModalService
    ) {}

  loginGoogle(){
    this.login.signInWithGoogle();
  }

  onSubmit(){

    if(this.startLogin){
      return;
    }
    this.startLogin = true;
    this.showLoading = true

    if(this.loginForm.valid){
      this.login.signInWithEmail(this.loginForm.value.user, this.loginForm.value.password)
        .subscribe(response=>{
          this.login.login(response);
          this.modal.closeAllModals();
        }, err => {
          if (err.status === 405) {
            this.login.signInWithGoogle();
          }else if(err.name && err.name == 'TimeoutError'){
            this.loginError = true;
            this.errorMessage = "Verifique a conexão! Tente novamente.";
            this.showLoading = false;
            this.startLogin = false;
          }else{
            this.loginError = true;
            this.errorMessage = "Senha errada, ou email não cadastrado.";
            this.showLoading = false;
            this.startLogin = false;
          }
        });
    }else{
      this.loginError = true;
      this.errorMessage = "Alguns dados informados estão incorretos.";
      this.showLoading = false;
      this.startLogin = false;
    }
  }

  inputFocus(field: string){
    this.loginError = false;
  }

  openCadastrar() {
    this.modal.openModal(SignupComponent, true, {minHeight: '500px'})
  }

  openRecuperarSenha() {
    this.modal.openModal(RecuperarSenhaComponent, true, {minHeight: '500px'})
  }

  close() {
    this.modal.closeAllModals();
  }
  
  ngOnInit(): void {

  }

}

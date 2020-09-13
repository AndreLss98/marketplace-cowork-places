import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { LoginService } from 'src/app/shared/service/login.service';
import { RecuperarSenhaComponent } from '../recuperar-senha/recuperar-senha.component';
import { MatDialog } from '@angular/material/dialog';

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
    user: new FormControl('', [Validators.required, Validators.required]),
    password: new FormControl('', Validators.required)
  })


  constructor(
    public login: LoginService,
    public dialog: MatDialog
  ) { }

  loginGoogle() {
    this.login.signInWithGoogle();
  }

  onSubmit() {

    if (this.startLogin) {
      return;
    }
    this.startLogin = true;
    this.showLoading = true

    if (this.loginForm.valid) {
      this.login.signInWithEmail(this.loginForm.value.user, this.loginForm.value.password)
        .subscribe(response => {
          this.login.login(response);
          this.dialog.closeAll();
        }, err => {
          if (err.status === 405) {
            this.login.signInWithGoogle();
          } else if (err.name && err.name == 'TimeoutError') {
            this.loginError = true;
            this.errorMessage = "Verifique a conexão! Tente novamente.";
            this.showLoading = false;
            this.startLogin = false;
          } else {
            this.loginError = true;
            this.errorMessage = "Senha errada, ou email não cadastrado.";
            this.showLoading = false;
            this.startLogin = false;
          }
        });
    } else {
      this.loginError = true;
      this.errorMessage = "Alguns dados informados estão incorretos.";
      this.showLoading = false;
      this.startLogin = false;
    }
  }

  inputFocus(field: string) {
    this.loginError = false;
  }

  openRecuperarSenha() {
    this.dialog.closeAll()
    this.dialog.open(RecuperarSenhaComponent)
  }

  close() {
    this.dialog.closeAll();
  }

  ngOnInit(): void {

  }

  getErrorMessageEmail() {
    if (this.loginForm.controls['user'].hasError('required')) {
      return 'Você deve inserir o email';
    }

    return this.loginForm.controls['user'].hasError('email') ? 'Não é um email válido!' : '';
  }

  getErrorMessagePassword() {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'Você deve inserir a senha';
    }
  }


}


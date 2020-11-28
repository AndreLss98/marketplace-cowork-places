import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.scss']
})
export class SafetyComponent implements OnInit {

  public alterarSenha: FormGroup;

  public canSendEmail: boolean = true;

  constructor(
    protected form: FormBuilder,
    protected snackBar: MatSnackBar,
    public userService: UserService,
    private loginService: LoginService
  ) {
    this.alterarSenha = this.form.group({
      senha_antiga: ["", [Validators.required]],
      senha_nova: ["", [Validators.minLength(6), Validators.maxLength(16), Validators.required]],
      confirmar_senha: ["", [Validators.minLength(6), Validators.maxLength(16), Validators.required]]
    }, { validators: this.validateConfirmPassword });
  }

  ngOnInit(): void {

  }

  public validateConfirmPassword(group: FormGroup) {
    if (group.controls.senha_nova.value === group.controls.confirmar_senha.value) {
      group.controls.confirmar_senha.setErrors(null)
    } else {
      group.controls.confirmar_senha.setErrors({ notsame: true });
    }
  }

  public alterPassword() {
    const { senha_antiga, senha_nova } = this.alterarSenha.value;

    this.userService.updatePassword({ senha_antiga, senha_nova }).subscribe(response => {
      this.alterarSenha.reset();
    }, (error) => {
      //console.log(error);
      this.snackBar.open("Não foi possivel alterar sua senha!", "Ok", { duration: 3000 });
    });
  }

  public resendEmail() {
    this.canSendEmail = false;
    
    this.userService.resendEmail().subscribe(response => {
      this.snackBar.open("Email enviado com sucesso, confira sua caixa de email!", "Ok", { duration: 3000 });
    }, (error) => {
      this.snackBar.open("Ocorreu um erro ao enviar o email! Tente novamente mais tarde.", "Ok", { duration: 3000 });
    }, () => {
      setTimeout(() => {
        this.canSendEmail = true;
      }, 5000);
    });
  }

}

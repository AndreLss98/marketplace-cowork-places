import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.scss']
})
export class SafetyComponent implements OnInit {

  public alterarSenha: FormGroup;
  senha_antiga = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  confirmar_senha = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]);

  constructor(
    public userService: UserService,
    private form: FormBuilder,
  ) {
    this.alterarSenha = this.form.group({
      senha_antiga: this.senha_antiga,
      senha: this.senha,
      confirmar_senha: this.confirmar_senha
    }, { validators: this.verificaSenhas });
  }

  ngOnInit(): void {
  }

  public verificaSenhas(group: FormGroup) {
    let pass = group.controls.senha.value;
    let confirmPass = group.controls.confirmar_senha.value;
    if (pass.length < 6) return { lengthMin: true }
    if (pass.length > 16) return { lengthMax: true }
    return pass === confirmPass ? null : { notSame: true }
  }

}

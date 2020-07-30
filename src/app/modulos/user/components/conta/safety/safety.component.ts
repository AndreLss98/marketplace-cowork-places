import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/service/user.service';

@Component({
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.scss']
})
export class SafetyComponent implements OnInit {

  public alterarSenha: FormGroup;

  constructor(
    public userService: UserService,
    private form: FormBuilder,
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
    console.log(this.alterarSenha)
  }

}

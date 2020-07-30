import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
  ) {
    this.form = formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.form.value);
    this.userService.recoverPassword(this.form.value).subscribe(response => {
      this.snackBar.open('Email enviado', 'Ok', { duration: 3000 });
      this.modalService.closeAllModals();
    }, (error) => {
      console.log(error);
    })
    
  }

}

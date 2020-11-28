import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.form = formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void { }

  onSubmit() {
    this.userService.recoverPassword(this.form.value).subscribe(response => {
      this.snackBar.open('Email enviado', 'Ok', { duration: 3000, verticalPosition: "top" });
      this.matDialog.closeAll();
    }, (error) => {
      console.log(error);
      this.snackBar.open('Email enviado', 'Ok', { duration: 3000, verticalPosition: "top" });
    }, () => {
      this.matDialog.closeAll();
    });
  }

}

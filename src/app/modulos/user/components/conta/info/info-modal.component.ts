import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { BancosService } from 'src/app/shared/service/bancos.service';
import { DocumentosService } from 'src/app/shared/service/documentos.service';
import { ContaBancariaService } from 'src/app/shared/service/conta-bancaria.service';

import { InfoComponent } from './info.component';

@Component({
  selector: 'app-info-modal',
  templateUrl: './modal-template/info-modal.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoModalComponent extends InfoComponent {

  constructor(
    http: HttpClient,
    formBuilder: FormBuilder,
    userService: UserService,
    loginService: LoginService,
    bancoService: BancosService,
    public snackBar: MatSnackBar,
    documentoService: DocumentosService,
    contaBancariaService: ContaBancariaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(http,snackBar, loginService, formBuilder, userService, bancoService, documentoService, contaBancariaService);
  }

  ngAfterContentInit() {
    this.snackBar.open(this.data.message, 'Ok', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}

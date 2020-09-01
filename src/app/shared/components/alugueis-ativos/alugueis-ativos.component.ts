import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';

import { UserService } from '../../service/user.service';
import { AluguelService } from 'src/app/shared/service/aluguel.service';
import { MatDialog } from '@angular/material/dialog';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';

@Component({
  selector: 'app-alugueis-ativos',
  templateUrl: './alugueis-ativos.component.html',
  styleUrls: ['./alugueis-ativos.component.scss']
})
export class AlugueisAtivosComponent implements OnInit {
  
  @Input('aluguel') aluguel: any;
  readonly ALUGUEL_STATUS = ALUGUEL_STATUS;

  constructor(
    public userService: UserService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    public aluguelService: AluguelService,
  ) {

  }

  ngOnInit(): void {
    
  }

  public cancelContract() {
    this.dialog.open(CancelDialogComponent, {
      data: { id: this.aluguel.id },
      hasBackdrop: false
    });
  }
}

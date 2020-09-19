import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';
import { formatMoneyValue } from 'src/app/shared/constants/functions';

import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';

import { UserService } from '../../service/user.service';
import { AluguelService } from 'src/app/shared/service/aluguel.service';
import { BasicModalComponent } from '../../modal/basic-modal/basic-modal.component';

@Component({
  selector: 'contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
  
  readonly formatMoneyValue = formatMoneyValue;

  @Input('aluguel') aluguel: any;
  @Output('changeContracts') changeContracts = new EventEmitter();
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
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      data: { id: this.aluguel.id, canceled_by_locador: this.aluguel.locador? false: true },
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(() => {
      this.changeContracts.emit('contracts-change');
    })
  }

  public acceptContract() {
    this.aluguelService.acceptContract(this.aluguel.id).subscribe(response => {
      this.changeContracts.emit('contracts-change');
    }, (error) => {
      console.log(error);
    });
  }

  public makeCheckin() {
    if (new Date().setHours(0, 0, 0) < new Date(this.aluguel.dias_reservados.data_entrada).setHours(0, 0, 0)) {
      this.dialog.open(BasicModalComponent, {
        data: { title: "Aviso!", message: "O checkin só será liberado no dia da entrada." }
      });
    } else {
      this.aluguelService.checkin(this.aluguel.id).subscribe(response => {
        this.changeContracts.emit('contracts-change');
      }, (error) => {
        console.log(error);
      });
    }
  }
}

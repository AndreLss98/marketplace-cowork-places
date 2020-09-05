import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';

import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';

import { UserService } from '../../service/user.service';
import { AluguelService } from 'src/app/shared/service/aluguel.service';

@Component({
  selector: 'contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
  
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
}

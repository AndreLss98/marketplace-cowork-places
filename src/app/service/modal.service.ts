import { Injectable, Component } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modal: MatDialog,
  ) { }

  private dialog;

  openModal(content){
    this.dialog = this.modal.open(content)
  }

  closeAllModals(){
    this.modal.closeAll();
  }


}

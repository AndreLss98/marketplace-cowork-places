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
  
  /**
   * @param  {} content Component
   * @param  {boolean=false} closeAll
   */
  openModal(content, closeAll:boolean = false){
    if(closeAll) this.modal.closeAll();
    this.dialog = this.modal.open(content)
  }

  closeAllModals(){
    this.modal.closeAll();
  }


}

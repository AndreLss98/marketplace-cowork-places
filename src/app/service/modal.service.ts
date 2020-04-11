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
   * @param  {} content
   * @param  {boolean=false} closeAll
   * @param  {MatDialogConfig={}} config
   */
  openModal(content, closeAll:boolean = false, config:MatDialogConfig = {}){
    console.log("peguei", config)
    if(closeAll) this.modal.closeAll();
    this.dialog = this.modal.open(content, config)
  }

  closeAllModals(){
    this.modal.closeAll();
  }


}

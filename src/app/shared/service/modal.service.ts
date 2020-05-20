import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modal: MatDialog,
  ) { }

  private dialog:MatDialogRef<unknown, any>;
  
  /**
   * @param  {} content
   * @param  {boolean=false} closeAll
   * @param  {MatDialogConfig={}} config
   */
  openModal(content, closeAll:boolean = false, config:MatDialogConfig = {}){

    if(closeAll){
      this.modal.closeAll();
      this.dialog = undefined;
    } 
    
    if (this.dialog) return;

    this.dialog = this.modal.open(content, config)

    this.dialog.afterClosed().subscribe( () => {
      this.dialog = undefined;
    })
  }

  closeAllModals(){
    this.modal.closeAll();
  }


}

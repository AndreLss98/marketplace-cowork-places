import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  openModal(content, closeAll:boolean = false, config:MatDialogConfig = undefined){

    if(closeAll){
      this.modal.closeAll();
      this.dialog = undefined;
    } 

    if(window.innerWidth < 500){
      if(config = {}){
        config = {
          minWidth: '90vw',
        }
      }
    }else{
      if(config = {}){
        config = {
          minWidth: '500px',
        }
      }
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

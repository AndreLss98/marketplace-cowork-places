import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  public title: string;
  public message: string;
  public nameCloseBtn: string = 'Fechar';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmModalComponent>
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  confirm() {
    this.data.confirm = true;
    this.dialogRef.close();
  }
}

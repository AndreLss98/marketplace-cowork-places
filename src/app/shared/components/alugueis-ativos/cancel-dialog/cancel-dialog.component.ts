import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AluguelService } from 'src/app/shared/service/aluguel.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.scss']
})
export class CancelDialogComponent implements OnInit {

  public isLoading = false;
  public cancelForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private aluguelService: AluguelService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<CancelDialogComponent>,
  ) {
    this.cancelForm = formBuilder.group({
      comentario: ["", [Validators.maxLength(250)]]
    })
  }

  ngOnInit(): void {

  }

  cancelAction() {
    this.dialogRef.close();
  }

  cancelContract() {
    this.isLoading = true;
    this.aluguelService.cancelContract(this.data.id, this.cancelForm.value).subscribe(response => {
      this.dialogRef.close();
    }, (error) => {
      this.isLoading = false;
    });
  }
}

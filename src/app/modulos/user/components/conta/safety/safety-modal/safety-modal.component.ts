import { FormBuilder } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SafetyComponent } from '../safety.component';

import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-safety-modal',
  templateUrl: './safety-modal.component.html',
  styleUrls: ['./../safety.component.scss']
})
export class SafetyModalComponent extends SafetyComponent {

  constructor(form: FormBuilder, snackBar: MatSnackBar, userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) {
    super(form, snackBar, userService);
  }

  ngAfterContentInit() {
    this.snackBar.open(this.data.message, 'Ok', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }
}

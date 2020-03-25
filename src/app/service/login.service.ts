import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _logged_status: boolean = true;

  constructor() { }

  get logged_status(): boolean {
    return this._logged_status;
  }

  set logged_status(status: boolean) {
    this._logged_status = status;
  }
}

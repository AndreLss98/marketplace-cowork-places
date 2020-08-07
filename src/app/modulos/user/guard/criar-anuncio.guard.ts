import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { UserService } from 'src/app/shared/service/user.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { MobileService } from 'src/app/shared/service/mobile.service';
import { InfoComponent } from '../components/conta/info/info.component';
import { SafetyComponent } from '../components/conta/safety/safety.component';

@Injectable({
  providedIn: 'root'
})
export class CriarAnuncioGuard implements CanActivate {

  constructor(
    private route: Router,
    private snack: MatSnackBar,
    private userService: UserService,
    private modalService: ModalService,
    private mobileService: MobileService,
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.mobileService.isMobile()){
      this.generateSnack("Ainda não é possível adicionar um espaço pelo celular.");
      return false;
    }

    if(!this.userService.user_data.cpf) {
      if (!this.userService.user_data.conta_bancaria) {
        this.generateSnack("Complete o cadastro dos seus dados pessoais e informe seus dados bancários.");
      } else {
        this.generateSnack("Complete o cadastro dos seus dados pessoais (Data de Nascimento, CPF e Número de telefone.)");
      }
      this.modalService.openModal(InfoComponent, false);
      return false;
    }

    if(!this.userService.user_data.conta_bancaria) {
      this.generateSnack("Para criar um anúncio é necessário ter uma conta bancária cadastrada.")
      this.modalService.openModal(InfoComponent, false);
      return false;
    }

    if(!this.userService.user_data.email_validado) {
      this.generateSnack("Para criar um anúncio confirme o seu email");
      this.modalService.openModal(SafetyComponent);
      return false;
    }

    /* if(!this.userService.user_data.cadastro_validado) {
      this.generateSnack("Cadastro em análise.");
      this.route.navigate(['/user/conta/info'])
      return false;
    } */

    return true;
  }

  private generateSnack(message: string) {
    this.snack.open(message, "Ok", {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  
}

import { MobileService } from './../../../shared/service/mobile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/service/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriarAnuncioGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private mobileService: MobileService,
    private route: Router
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
      return false;
    }

    if(!this.userService.user_data.conta_bancaria) {
      this.generateSnack("Para criar um anúncio é necessário ter uma conta bancária cadastrada.")
      this.route.navigate(['/user/conta/info'])
      return false;
    }

    if(!this.userService.user_data.email_validado) {
      this.generateSnack("Para criar um anúncio confirme o seu email");
      this.route.navigate(['/user/conta/safety'])
      return false;
    }

    if(!this.userService.user_data.cadastro_validado) {
      this.generateSnack("Cadastro em análise.");
      this.route.navigate(['/user/conta/info'])
      return false;
    }

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

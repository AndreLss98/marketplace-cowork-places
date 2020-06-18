import { UserService } from './../../service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { User } from './../../interface/interface';
import { ModalService } from 'src/app/shared/service/modal.service';
import { SignupService } from './../../service/signup.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms'

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ErrorStateMatcher } from '@angular/material/core';
import { LoginComponent } from '../login/login.component';
import { MatStepper } from '@angular/material/stepper';
import { Passos_signup as Passos, emailPattern } from '../../constants/constants';
import * as moment from 'moment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class SignupComponent implements OnInit {

  @ViewChild('signupStepper') stepper: MatStepper;
  public loader:boolean = false;
  public editavel:boolean = true;
  matcher = new MyErrorStateMatcher();

  public primeiroPasso: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern(emailPattern)]);

  public segundoPasso: FormGroup;
  nome = new FormControl('', [Validators.required, Validators.pattern('')]);
  sobrenome = new FormControl('', Validators.required);
  data_nascimento = new FormControl('', Validators.required);


  public terceiroPasso: FormGroup;
  tel1 = new FormControl('', Validators.required);
  tel2 = new FormControl('');

  public quartoPasso: FormGroup;
  senha = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  confirmar_senha = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]);

  constructor(
    private signup: SignupService,
    private form: FormBuilder,
    private modal: ModalService,
    private login: LoginService,
    private user: UserService
  ){
    
    // Inicia o formulario.
    this.primeiroPasso = this.form.group({
      email: this.email
    });

    this.segundoPasso = this.form.group({
      nome: this.nome,
      sobrenome: this.sobrenome,
      data_nascimento: this.data_nascimento
    });

    this.terceiroPasso = this.form.group({
      tel1: this.tel1,
      tel2: this.tel2
    });

    this.quartoPasso = this.form.group({
      senha: this.senha,
      confirmar_senha: this.confirmar_senha
    }, {validators: this.verificaSenhas});

   }

  verificaSenhas(group: FormGroup){
    let pass = group.controls.senha.value;
    let confirmPass = group.controls.confirmar_senha.value;
    if ( pass.length < 6) return {lengthMin: true}
    if ( pass.length > 16) return {lengthMax: true}
    return pass === confirmPass ? null : { notSame: true }
  }
  ngOnInit(): void {
  }

  nextStep(stepper: MatStepper){
    switch (stepper.selectedIndex) {
      case Passos.Primeiro:

        let email = this.primeiroPasso.value.email;
        console.log(this.primeiroPasso.valid)
      
        this.user.verifyUserEmail(email)
          .subscribe( response => {
            console.log(response)
            this.primeiroPasso.setErrors({existe: true});
            console.log(this.primeiroPasso.valid)
          }, err => {
            if(err.status == 404){
              this.primeiroPasso.setErrors(null)
              nextStep();
            }
          })
        break;
      case Passos.Segundo:

      let nascimento = this.segundoPasso.controls.data_nascimento.value;
      let age = moment().diff(nascimento, 'years')
      
      if(age < 18){
        this.segundoPasso.setErrors({age: true})
      }else{
        nextStep();
      }

      break;
      case Passos.Quarto:
        // Valida Senha
        console.log(this.quartoPasso.errors, this.quartoPasso.valid)
        if(this.quartoPasso.valid){
          this.editavel = false;
          this.loader = true;
          this.signup.cadastrar(this.criarUsuario()).subscribe( response => {
            this.login.login(response);
            nextStep();
          }, error => {
            console.log("Cadastro invalido",error)
            this.editavel = true;
            this.loader = false;
          })
        }
        break;
      default:
        nextStep();
        break;
    }

    function nextStep(){
      setTimeout(() => {
        stepper.next();
      }, 1);
    }
  }

  criarUsuario(): User{
    let user: User = {
      email: this.primeiroPasso.value.email,
      nome: this.segundoPasso.value.nome,
      sobrenome: this.segundoPasso.value.sobrenome,
      data_nascimento: this.segundoPasso.value.data_nascimento,
      numero_1: this.terceiroPasso.value.tel1,
      numero_2: this.terceiroPasso.value.tel2 ? 'null': this.terceiroPasso.value.tel2,
      senha: this.quartoPasso.value.senha,
      img_perfil: 'perfil.png'
    }
    return user;
  }


  formatarFone(campo: string){

    let v = this.terceiroPasso.value[campo];
    
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    this.terceiroPasso.controls[campo].setValue(v);
  }

  entrar(){
    this.modal.openModal(LoginComponent, true)
  }
}

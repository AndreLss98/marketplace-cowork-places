import { ModalService } from 'src/app/shared/service/modal.service';
import { SignupService } from './../../service/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { LoginComponent } from '../login/login.component';

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

  public primeiroPasso: FormGroup;
  email = new FormControl('', Validators.required);

  public segundoPasso: FormGroup;
  nome = new FormControl('', [Validators.required, Validators.pattern('')]);
  sobrenome = new FormControl('', Validators.required);
  data_nascimento = new FormControl('', Validators.required);


  public terceiroPasso: FormGroup;
  tel1 = new FormControl('', Validators.required);
  tel2 = new FormControl('');

  public quartoPasso: FormGroup;
  senha = new FormControl('', Validators.required)
  confirmar_senha = new FormControl('', Validators.required);

  constructor(
    private signup: SignupService,
    private form: FormBuilder,
    private modal: ModalService
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
    });

   }

  ngOnInit(): void {
  }

  onSubmit(){
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

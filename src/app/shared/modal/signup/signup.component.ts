import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  NgForm,
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_FORMATS,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  ErrorStateMatcher,
} from '@angular/material/core';

import * as moment from 'moment';

import { User } from 'src/app/shared/interface/interface';
import { Passos_signup as Passos, emailPattern } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { SignupService } from 'src/app/shared/service/signup.service';

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
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})

export class SignupComponent implements OnInit {

  @ViewChild('signupStepper') stepper: MatStepper;
  public input_nascimento;

  public loader: boolean = false;
  public editavel: boolean = true;
  matcher = new MyErrorStateMatcher();

  public primeiroPasso: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern(emailPattern), Validators.maxLength(100)]);

  public segundoPasso: FormGroup;
  nome = new FormControl('', [Validators.required, Validators.pattern(''), Validators.minLength(2), Validators.maxLength(50)]);
  cpf = new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}')]);
  sobrenome = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  data_nascimento = new FormControl('', Validators.required);


  public terceiroPasso: FormGroup;
  tel1 = new FormControl('', Validators.required);
  tel2 = new FormControl('');

  public quartoPasso: FormGroup;
  senha = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  confirmar_senha = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]);

  public confirmar: FormGroup;
  termo_servico = new FormControl('', [Validators.requiredTrue]);
  // termo_privacidae = new FormControl('', [Validators.requiredTrue]);
  recaptcha = new FormControl('', [Validators.required]);

  constructor(
    private form: FormBuilder,
    private user: UserService,
    private snack: MatSnackBar,
    private login: LoginService,
    private matDialog: MatDialog,
    private signup: SignupService,
  ) {

    // Inicia o formulario.
    this.primeiroPasso = this.form.group({
      email: this.email
    });

    this.segundoPasso = this.form.group({
      nome: this.nome,
      sobrenome: this.sobrenome,
      cpf: this.cpf,
      data_nascimento: this.data_nascimento
    });

    this.terceiroPasso = this.form.group({
      tel1: this.tel1,
      tel2: this.tel2
    });

    this.quartoPasso = this.form.group({
      senha: this.senha,
      confirmar_senha: this.confirmar_senha
    }, { validators: this.verificaSenhas });

    this.confirmar = this.form.group({
      // termo_privacidae: this.termo_privacidae,
      termo_servico: this.termo_servico,
      recaptcha: this.recaptcha
    })
  }

  ngOnInit(): void {
  }

  public verificaSenhas(group: FormGroup) {
    let pass = group.controls.senha.value;
    let confirmPass = group.controls.confirmar_senha.value;
    if (pass.length < 6) return { lengthMin: true }
    if (pass.length > 16) return { lengthMax: true }
    return pass === confirmPass ? null : { notSame: true }
  }

  public checkAge() {
    let nascimento = this.segundoPasso.controls.data_nascimento.value;
    let age = moment().diff(nascimento, 'years')

    if (age < 18) {
      this.segundoPasso.setErrors({ age: true })
    }
  }

  public nextStep(stepper: MatStepper) {

    switch (stepper.selectedIndex) {
      case Passos.Primeiro:

        let email = this.primeiroPasso.value.email;
        this.user.verifyUserEmail(email).subscribe(response => {
          this.primeiroPasso.setErrors({ existe: true });
        }, error => {
          if (error.status == 404) {
            this.primeiroPasso.setErrors(null)
            nextStep();
          }
        })
        break;

      case Passos.Segundo:
        let nascimento = this.segundoPasso.controls.data_nascimento.value;
        let age = moment().diff(nascimento, 'years')

        if (age < 18) {
          this.segundoPasso.setErrors({ age: true })
        } else {
          nextStep();
        }

        break;
      case Passos.Quarto:
        // Valida Senha
        if (this.quartoPasso.valid) {
          nextStep();
        }
        break;

      case 4:
        if (this.confirmar.valid) {
          this.editavel = false;
          this.loader = true;
          this.signup.cadastrar(this.criarUsuario()).subscribe(response => {
            this.login.login(response);
            this.matDialog.closeAll();
          }, error => {
            this.editavel = true;
            this.loader = false;
            if(error.error.item) {
              this.snack.open( "Esse "+ error.error.item + " j?? foi cadastrado!", 'OK', { duration: 2000 });
            }else{
              this.snack.open("Ocorreu um erro!", 'OK', { duration: 2000 });
            }
          });
        } else {
          this.snack.open('Para concluir o cadastro, aceite os termos e marque o reCAPTCHA', 'OK', { duration: 5000 });
        }
        break;

      default:
        nextStep();
        break;
    }

    function nextStep() {
      setTimeout(() => {
        stepper.next();
      }, 1);
    }
  }

  public criarUsuario(): User {
    let user: User = {
      email: this.primeiroPasso.value.email,
      nome: this.segundoPasso.value.nome,
      sobrenome: this.segundoPasso.value.sobrenome,
      data_nascimento: this.segundoPasso.value.data_nascimento,
      cpf: this.segundoPasso.value.cpf,
      numero_1: this.terceiroPasso.value.tel1,
      numero_2: this.terceiroPasso.value.tel2 ? 'null' : this.terceiroPasso.value.tel2,
      senha: this.quartoPasso.value.senha
    }
    return user;
  }


  public formatarFone(campo: string) {
    let v = this.terceiroPasso.value[campo];
    v = v.replace(/\D/g, "");             //Remove tudo o que n??o ?? d??gito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca par??nteses em volta dos dois primeiros d??gitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca h??fen entre o quarto e o quinto d??gitos
    this.terceiroPasso.controls[campo].setValue(v);
  }

  public formatarCPF(cpf: string) {
    let formatted = cpf;
    formatted = formatted.replace(/\D/g, "")
    .replace(/([0-9]{3})([0-9]{1})/, "$1.$2")
    .replace(/([0-9]{3}\.[0-9]{3})([0-9]{1})/, "$1.$2")
    .replace(/([0-9]{3}\.[0-9]{3}\.[0-9]{3})([0-9]{1})/, "$1-$2")
    .replace(/([0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2})(.)/, "$1");
    this.segundoPasso.controls['cpf'].setValue(formatted);
  }
}

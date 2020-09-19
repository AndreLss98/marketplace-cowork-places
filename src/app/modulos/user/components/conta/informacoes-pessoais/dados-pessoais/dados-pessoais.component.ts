import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { environment } from 'src/environments/environment';

import { UserService } from 'src/app/shared/service/user.service';
import { formatDate, formatServerDate, formatTelefone, dateToMomentObject } from 'src/app/shared/constants/functions';

const CUSTOM_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    }
  ]
})
export class DadosPessoaisComponent implements OnInit {

  readonly formatTelefone = formatTelefone;

  public dadosPessoaisValido = true;
  public editDadosPessoais = false;
  public dataNascimento = '';
  public selectedFile: File = null;
  public imgUrl;
  public editInfoForm: FormGroup;
  public canEditCPF = false;

  constructor(
    private http: HttpClient,
    public snack: MatSnackBar,
    public formBuilder: FormBuilder,
    public userService: UserService,
  ) {
    this.editInfoForm = formBuilder.group({
      id: [null, [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}')]],
      numero_1: ['', [Validators.required]],
      numero_2: ['', []],
      data_nascimento: [null, [Validators.required]],
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: [{value: '', disabled: true}, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.userService.user_data) this.validateUserDatas();
  }

  private validateUserDatas() {
    this.imgUrl = this.userService.user_data.img_perfil;

    if (
      !this.userService.user_data.cpf ||
      !this.userService.user_data.email_validado ||
      !this.userService.user_data.data_nascimento ||
      !this.userService.user_data.numero_1) this.dadosPessoaisValido = false;

    this.resetInfoForm();
  }

  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let reader = new FileReader();
    reader.onload = (read) => {
      this.imgUrl = read.target.result;
      this.updateNewImage();
    };

    reader.readAsDataURL(this.selectedFile);
  }

  public updateNewImage() {
    if (this.selectedFile) {
      let form = new FormData();
      form.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post(`${environment.apiUrl}/usuarios/img-perfil`, form, {
        reportProgress: true,
        observe: 'events'
      }).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          //console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
        } else if (event.type === HttpEventType.Response) {
          this.imgUrl = `${environment.apiUrl}/imgs/${event.body.image_name}`;
          this.selectedFile = null;
        }
      }, (error) => {
        console.log("Error: ", error);
      });
    }
  }

  public formatField(field: string, form: FormGroup, formatFunction) {
    form.controls[field].setValue(formatFunction(form.controls[field].value));
  }

  public actionInfoForm() {
    this.snack.open('Salvando ...', 'OK', { verticalPosition: 'top' });

    let info = this.editInfoForm.value;
    info.data_nascimento = formatServerDate(info.data_nascimento.subtract(1, 'day').format());
    
    this.userService.atualizarDadosPessoais(info).subscribe(response => {
      this.userService.user_data = {
        ...this.userService.user_data,
        ...info
      }
      this.resetInfoForm();
      this.snack.open('Salvo com sucesso!', 'OK', { duration: 2000, verticalPosition: 'top' });
    }, (error) => {
      this.snack.dismiss();
      this.snack.open('Ocorreu algum erro!', 'OK', { duration: 2000, verticalPosition: 'top' });
    });
  }

  private resetInfoForm() {
    this.editInfoForm.reset({
      id: this.userService.user_data.id,
      cpf: this.userService.user_data.cpf,
      nome: this.userService.user_data.nome,
      email: this.userService.user_data.email,
      sobrenome: this.userService.user_data.sobrenome,
      numero_1: this.userService.user_data.numero_1,
      numero_2: this.userService.user_data.numero_2? this.userService.user_data.numero_2 : null,
      data_nascimento: this.userService.user_data.data_nascimento? dateToMomentObject(this.userService.user_data.data_nascimento) : null
    });

    if (this.userService.user_data.cpf) {
      this.editInfoForm.controls['cpf'].disable()
    }

    this.editInfoForm.markAsPristine();
  }
}
